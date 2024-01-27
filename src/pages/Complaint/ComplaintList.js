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

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const q = query(
          collection(db, 'complaints'),
          where('userId', '==', currentUserId),
        );
        const querySnapshot = await getDocs(q);
        const complaintsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
        <div key={complaint.id} className="complaint">
          <p>민원 제목: {complaint.title}</p>
          {/* 추가 민원 정보 */}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
