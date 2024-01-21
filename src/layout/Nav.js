import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style/Nav.scss';

const Nav = () => {
  return (
    <nav>
      <Link to="/">서일대학교 ICT 지원실</Link>
      <ul>
        <li>
          <Link to="/authscreen">로그인/회원가입</Link>
        </li>
        <li>
          <Link to="/complaintform">민원 접수</Link>
        </li>
        <li>
          <Link to="/complaintlist">접수된 민원 조회</Link>
        </li>
        <li>
          <Link to="/">문의 하기</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
