import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../style/Nav.scss';
import GoogleLogin from '../auth/GoogleLogin';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const { userRole, currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <div className="title">
        <Link to="/">서일대학교 ICT 지원실</Link>
      </div>
      <button onClick={toggleDropdown}>Menu</button>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {userRole === 'admin' && (
            <li>
              <Link to="/admin">관리자 페이지</Link>
            </li>
          )}
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
          ) : (
            <li>
              <Link to="directmessage">DM</Link>
            </li>
          )}
          <li>
            <GoogleLogin />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
