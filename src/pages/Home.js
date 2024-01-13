import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>ICT 지원실 민원처리</h1>
      <p>이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.</p>
      <p>
        문제 해결을 위한 자주 묻는 질문, 문서 자료, 사용자 가이드 등을 찾아볼 수
        있습니다.
      </p>

      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Home;
