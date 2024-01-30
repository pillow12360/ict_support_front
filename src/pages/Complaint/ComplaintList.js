import React, { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../AuthContext';
import '../../style/ComplaintList.scss';

// 유저 id 값으로 접수한 민원 조회 컴포넌트

const ComplaintList = () => {
  const { currentUser } = useContext(AuthContext); // 현재 유저 정보
  const currentUserId = currentUser.uid;

  const [complaints, setComplaints] = useState([]);
  const [detailComplaint, setDetailComplaints] = useState({});

  const handleClick = (id) => {
    try {
    } catch {}
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const q = query(
          collection(db, 'complaints'),
          where('userId', '==', currentUserId),
        );
        const querySnapshot = await getDocs(q);
        const complaintsData = querySnapshot.docs.map((doc) => {
          // Timestamp를 Date 객체로 변환
          const timestamp = doc.data().timestamp;
          const date = timestamp ? timestamp.toDate() : new Date();
          // 원하는 날짜 형식으로 변환 (예: '2024-01-30')
          const formattedDate = date.toLocaleDateString('ko-KR');
          return {
            id: doc.id,
            ...doc.data(),
            // 변환된 날짜를 사용
            timestamp: formattedDate,
          };
        });
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      }
    };
    fetchComplaints();
  }, [currentUserId]);

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
          {/* 추가 민원 정보 */}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
