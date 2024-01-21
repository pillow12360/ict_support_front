import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style/Nav.scss';

const Nav = () => {
  return (
    <nav>
      서일대학교 ICT 지원실 민원 처리
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/">민원 접수</Link>
        </li>
        <li>
          <Link to="/">문의 하기</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
