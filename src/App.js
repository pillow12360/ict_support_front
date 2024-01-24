import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import First from './pages/First';
import AuthScreen from './auth/AuthScreen'; // 가정: 로그인 폼 컴포넌트의 경로
import NotFound from './pages/NotFound';
import ComplaintForm from './pages/Complaint/ComplaintForm';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import './App.css';
import { AuthProvider } from './AuthContext';
import ComplaintFormFirebase from './pages/Complaint/ComplaintFormFirebase';
import { ModalProvider } from './ModalContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <div className="background">
            <Nav />
            <Routes>
              <Route path="/" element={<First />} />
              <Route path="/home" element={<Home />} />
              <Route path="/authscreen" element={<AuthScreen />} />
              <Route
                path="/complaintform"
                element={<ComplaintFormFirebase />}
              />
              <Route path="*" element={<NotFound />}></Route>
              {/* 추가 라우트 */}
            </Routes>
            <Footer />
          </div>
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
