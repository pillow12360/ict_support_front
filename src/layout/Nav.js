import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style/Nav.scss';
import GoogleLogin from '../auth/GoogleLogin';

const Nav = () => {
  return (
    <nav>
      <Link to="/">서일대학교 ICT 지원실</Link>
      <ul>
        {/* <li>
          <Link to="/authscreen">로그인/회원가입</Link>
        </li> */}
        <li>
          <Link to="/complaintform">민원 접수 1</Link>
        </li>
        <li>
          <Link to="/complaintformfirebase">민원 접수 2</Link>
        </li>
        <li>
          <Link to="/complaintlist">접수된 민원 조회</Link>
        </li>
        <li>
          <GoogleLogin />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
