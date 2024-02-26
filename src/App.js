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
import './index.css';
import { AuthProvider } from './AuthContext';
import ComplaintFormFirebase from './pages/Complaint/ComplaintFormFirebase';
import { ModalProvider } from './ModalContext';
import ComplaintList from './pages/Complaint/ComplaintList';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import ComplaintManage from './pages/admin/ComplaintManage';
import AdminMenu from './pages/admin/AdminMenu';

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <div className="background">
            <Nav />
            <div className="content-wrap">
              <Routes>
                <Route path="/" element={<First />} />
                <Route path="/home" element={<Home />} />
                <Route path="/authscreen" element={<AuthScreen />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/complaintform" element={<ComplaintForm />} />
                <Route path="/complaintlist" element={<ComplaintList />} />
                <Route
                  path="/complaintformfirebase"
                  element={<ComplaintFormFirebase />}
                />
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/admin" element={<ComplaintManage />} />
                {/* 추가 라우트 */}
              </Routes>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </ModalProvider>
    </Router>
  );
};

export default App;
