import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./auth/LoginForm"; // 가정: 로그인 폼 컴포넌트의 경로

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {/* 추가 라우트 */}
      </Routes>
    </Router>
  );
};

export default App;
