import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

const Home = () => {
  return (
    <div>
      <h1 className="mb-3">ICT 지원실 민원 처리</h1>
      <p className="lead">
        이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.
      </p>
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
