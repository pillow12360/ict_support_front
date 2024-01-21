import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import ComplaintTemplate from './Complaint/ComplaintTemplate';
import ComplaintList from './Complaint/ComplaintList';
import ComplaintForm from './Complaint/ComplaintForm';

const Home = () => {
  
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: '안녕',
      content: '테스트',
      building: '배양관',
    },
    {
      id: 2,
      title: '안녕2',
      content: '테스트3',
      building: '호천관',
    },
    {
      id: 3,
      title: '안녕3',
      content: '테스트2',
      building: '흥학관',
    },
    {
      id: 4,
      title: '하이',
      content: '테스트5',
      building: '서일관',
    },
  ]);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">ICT 지원실 민원 처리</h1>
      <p>이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.</p>
      <p>
        문제 해결을 위한 자주 묻는 질문, 사용자 가이드 등을 찾아볼 수 있습니다.
      </p>

      <Link to="/authscreen" className="btn btn-secondary mr-2">
        로그인/회원가입
      </Link>

      <Link to="/complaints" className="btn">
        민원 접수
      </Link>

      <Link to="/complaintList" className="btn">
        접수된 민원 조회
      </Link>
    </div>
  );
};
export default Home;
