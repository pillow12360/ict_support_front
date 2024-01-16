import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import ComplaintTemplate from './Complaint/ComplaintTemplate';
import ComplaintList from './Complaint/ComplaintList';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">ICT 지원실 민원처리</h1>
      <p>이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.</p>
      <p>
        문제 해결을 위한 자주 묻는 질문, 사용자 가이드 등을 찾아볼 수 있습니다.
      </p>

      <Link to="/authscreen" className="btn btn-secondary mr-2">
        로그인/회원가입
      </Link>
      <div>
        <Link to="/complaints" className="btn btn-light">
          민원 접수
        </Link>

        <button
          className="btn btn-info mr-2"
          onClick={() => setShowModal(true)}
        >
          민원 조회
        </button>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ComplaintTemplate>
            <ComplaintList />
          </ComplaintTemplate>
        </Modal>
      </div>
    </div>
  );
};
export default Home;
