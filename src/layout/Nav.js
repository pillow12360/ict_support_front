import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style/Nav.scss';
import GoogleLogin from '../auth/GoogleLogin';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const { userRole, currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="title">
        <Link to="/">서일대학교 ICT 지원실</Link>
      </div>
      <ul>
        <li>
          {userRole === 'admin' ? (
            <>
              <Link to="/admin">관리자 페이지</Link>
            </>
          ) : null}
        </li>
        <li>
          <Link to="directmessage">DM</Link>
        </li>
        {/* <li>
          <Link to="/complaintform">민원 접수 1</Link>
        </li> */}
        <li>
          <Link to="/complaintformfirebase">민원 접수 하기</Link>
        </li>
        <li>
          <Link to="/complaintlist">접수된 민원 조회</Link>
        </li>
        {currentUser === null ? (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        ) : null}
        <li>
          <GoogleLogin />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
