import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthScreen from './auth/AuthScreen'; // 가정: 로그인 폼 컴포넌트의 경로
import NotFound from './pages/NotFound';
import ComplaintForm from './pages/Complaint/ComplaintForm';
import Nav from './layout/Nav';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authscreen" element={<AuthScreen />} />
        <Route path="/complaintform" element={<ComplaintForm />} />
        <Route path="*" element={<NotFound />}></Route>
        {/* 추가 라우트 */}
      </Routes>
    </Router>
  );
};

export default App;
