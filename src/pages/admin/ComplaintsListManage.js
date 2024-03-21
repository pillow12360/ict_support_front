// src/components/ComplaintsList.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, query, getDocs } from 'firebase/firestore';

const ComplaintsListManage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const q = query(collection(db, 'complaints'));
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
  }, []);

  return (
    <div>
      <h2>모든 민원</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            {complaint.title} - {complaint.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintsListManage;
