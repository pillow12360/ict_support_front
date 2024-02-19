import React, { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../AuthContext';
import '../../style/ComplaintList.scss';
import { useModal } from '../../ModalContext';
import ComplaintDetail from './ComplaintDetail';

// 유저 id 값으로 접수한 민원 조회 컴포넌트

const ComplaintList = () => {
  const { currentUser, userRole } = useContext(AuthContext); // 현재 유저 정보
  const currentUserId = currentUser.uid;
  const { openModal } = useModal();
  const [complaints, setComplaints] = useState([]);

  const statusStyles = {
    // 상태별로 스타일을 정의
    accepting: 'complaint accepting',
    received: 'complaint received',
    in_progress: 'complaint in_progress',
    completed: 'complaint completed',
    unresolvable: 'complaint unresolvable',
  };

  const handleClick = async (id) => {
    try {
      const docRef = doc(db, 'complaints', id); // 'complaints' 문자열 사용
      const docSnap = await getDoc(docRef); // getDoc 함수 사용
      if (docSnap.exists()) {
        const detailData = docSnap.data();
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

  useEffect(() => {
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
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      }
    };
    fetchComplaints();
  }, [currentUserId, userRole]); // userRole을 의존성 배열에 추가

  return (
    <div className="complaint-list-container">
      {userRole === 'admin' ? (
        <h1>접수된 민원 조회 및 관리 페이지</h1>
      ) : (
        <h1>내가 접수한 민원 목록</h1>
      )}
      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          className={statusStyles[complaint.status] || 'complaint'}
          onClick={() => {
            handleClick(complaint.id);
          }}
        >
          <p>접수자 : {complaint.userName}</p>
          <p>민원 제목: {complaint.title}</p>
          <p>접수 일자 : {complaint.timestamp}</p>
          {/* 상태별 아이콘 또는 텍스트를 추가할 수 있습니다. */}
          <p>
            처리 상태 :{' '}
            {(() => {
              switch (complaint.status) {
                case 'accepting':
                  return '처리 중';
                case 'received':
                  return '접수 완료';
                case 'not_accepted':
                  return '접수 불가';
                case 'in_progerss':
                  return '처리 중';
                case 'completed':
                  return '처리 완료';
                case 'unresolvable':
                  return '처리 불가';
                default:
                  return '알 수 없음';
              }
            })()}
            <span className={`status-icon ${complaint.status}`}>
              {/* 상태 아이콘 또는 텍스트 */}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
