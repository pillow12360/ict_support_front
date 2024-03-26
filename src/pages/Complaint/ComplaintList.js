import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';
import '../../style/ComplaintList.scss';
import { useModal } from '../../contexts/ModalContext';
import ComplaintDetail from './ComplaintDetail';

// 유저 id 값으로 접수한 민원 조회 컴포넌트

const ComplaintList = () => {
  const { currentUser, userRole } = useContext(AuthContext); // 현재 유저 정보
  const { openModal } = useModal();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const currentUserId = currentUser.uid;

    const fetchComplaints = async () => {
      try {
        let q;
        if (userRole === 'admin') {
          // 관리자인 경우 모든 민원을 가져옴
          q = query(collection(db, 'complaints'));
        } else {
          // 일반 사용자인 경우 해당 사용자의 민원만 가져옴
          q = query(
            collection(db, 'complaints'),
            where('userId', '==', currentUserId),
            where('isDeleted', '==', false),
          );
        }
        const querySnapshot = await getDocs(q);
        const complaintsData = querySnapshot.docs.map((doc) => {
          const timestamp = doc.data().timestamp;
          const date = timestamp ? timestamp.toDate() : new Date();
          const formattedDate = date.toLocaleDateString('ko-KR');
          return {
            id: doc.id,
            ...doc.data(),
            timestamp: formattedDate,
          };
        });
        console.log(complaintsData);
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      }
    };
    fetchComplaints();
  }, [currentUser, userRole]); // userRole을 의존성 배열에 추가

  if (!currentUser) {
    return <div>Loding</div>;
  }

  const statusStyles = {
    // 상태별로 스타일을 정의
    accepting: 'complaint accepting',
    received: 'complaint received',
    in_progress: 'complaint in_progress',
    completed: 'complaint completed',
    unresolvable: 'complaint unresolvable',
    deleted: 'complaint deleted',
  };

  const handleClick = async (id) => {
    try {
      const docRef = doc(db, 'complaints', id); // 'complaints' 컬렉션에서 id를 사용하여 문서 참조 생성
      const docSnap = await getDoc(docRef); // 문서 참조를 사용하여 문서 스냅샷 가져오기

      if (docSnap.exists()) {
        // 문서 데이터가 존재하면
        const detailData = docSnap.data(); // 문서 데이터를 가져옴
        detailData.id = id; // 문서 데이터 객체에 문서의 ID (uid)를 추가

        // 수정된 detailData와 userRole을 사용하여 모달 열기
        openModal(
          <ComplaintDetail detailData={detailData} userRole={userRole} />,
        );
      } else {
        console.log('해당 문서가 없습니다');
      }
    } catch (error) {
      console.error('문서를 불러오는 중 에러가 발생하였습니다.', error);
    }
  };

  return (
    <div className="complaint-list-container">
      {userRole === 'admin' ? (
        <h1>접수된 민원 조회 및 관리 페이지</h1>
      ) : (
        <h1>내가 접수한 민원 목록</h1>
      )}
      {complaints.length === 0 && (
        <div>접수된 민원이 현재 존재하지 않습니다.</div>
      )}
      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          className={`${statusStyles[complaint.status] || 'complaint'} ${
            complaint.isDeleted ? 'deleted' : ''
          }`}
          onClick={() => {
            handleClick(complaint.id);
          }}
        >
          <p>접수자 : {complaint.userName}</p>
          <p>민원 제목: {complaint.title}</p>
          <p>접수 일자 : {complaint.timestamp}</p>
          <p>
            처리 상태 :{' '}
            {complaint.isDeleted ? (
              <span className="status-deleted">삭제됨</span>
            ) : (
              // 기존 switch 문을 이용한 처리 상태 로직 유지
              (() => {
                switch (complaint.status) {
                  case 'accepting':
                    return '처리 중';
                  case 'received':
                    return '접수 완료';
                  case 'in_progress':
                    return '처리 중';
                  case 'completed':
                    return '처리 완료';
                  case 'unresolvable':
                    return '처리 불가';
                  default:
                    return '알 수 없음';
                }
              })()
            )}
          </p>
          {/* 관리자일 경우 삭제된 민원에 대해 "삭제됨" 표시 추가 */}
          {userRole === 'admin' && complaint.isDeleted && (
            <p className="status-deleted">삭제됨</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
