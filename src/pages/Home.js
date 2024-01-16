import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS import
import ComplaintTemplate from "./ComplaintTemplate";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="mb-3">ICT 지원실 민원처리</h1>
      <p>이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.</p>
      <p>
        문제 해결을 위한 자주 묻는 질문, 문서 자료, 사용자 가이드 등을 찾아볼 수
        있습니다.
      </p>

      <div className="mb-3">
        <button
          className="btn btn-primary mr-2"
          onClick={() => setShowModal(true)}
        >
          소개
        </button>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <p>안녕하세요</p>
        </Modal>
      </div>
      <div>
        <Link to="/authscreen" className="btn btn-secondary mr-2">
          로그인/회원가입
        </Link>
        <Link to="/complaints" className="btn btn-secondary">
          민원 접수
        </Link>
      </div>
      <ComplaintTemplate>안녕</ComplaintTemplate>
    </div>
  );
};
export default Home;
