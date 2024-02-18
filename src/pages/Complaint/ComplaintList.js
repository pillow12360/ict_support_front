import React, { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../AuthContext';
import '../../style/ComplaintList.scss';
import { useModal } from '../../ModalContext';
import ComplaintDetail from './ComplaintDetail';

// 유저 id 값으로 접수한 민원 조회 컴포넌트

const ComplaintList = ({ userRole }) => {
  const { currentUser } = useContext(AuthContext); // 현재 유저 정보
  const currentUserId = currentUser.uid;
  const { openModal } = useModal();

  const [complaints, setComplaints] = useState([]);

  const handleClick = async (id) => {
    try {
      const docRef = doc(db, 'complaints', id); // 'complaints' 문자열 사용
      const docSnap = await getDoc(docRef); // getDoc 함수 사용
      if (docSnap.exists()) {
        const detailData = docSnap.data();
        openModal(<ComplaintDetail detailData={detailData} />);
      } else {
        console.log('해당 문서가 없습니다');
      }
    } catch (error) {
      console.error('문서를 불러오는 중 에러가 발생하였습니다.', error);
    }
  };

  const handleDelete = async (id) => {
    // 민원 삭제 처리 구현
  };

  const handleUpdate = async (id) => {
    // 민원 수정 처리 구현
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
      <h1>접수한 민원 조회</h1>
      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          className="complaint"
          onClick={() => {
            handleClick(complaint.id);
          }}
        >
          <p>민원 제목: {complaint.title}</p>
          <p>접수 일자 : {complaint.timestamp}</p>
          {userRole === 'admin' && (
            <div className="admin-actions">
              {/* 드롭다운 메뉴 또는 관리자 작업 버튼 구현 */}
              <button onClick={() => handleDelete(complaint.id)}>삭제</button>
              <button onClick={() => handleUpdate(complaint.id)}>수정</button>
              {/* 추가 관리자 작업 버튼 */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
