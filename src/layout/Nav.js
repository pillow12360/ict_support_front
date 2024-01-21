import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/">소개</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
