import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../style/Nav.scss';
import GoogleLogin from '../auth/GoogleLogin';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const { userRole, currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 드롭다운 메뉴 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 메인 화면 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <div className="title">
          <Link to="/">서일대학교 ICT 지원실</Link>
        </div>
        <button onClick={toggleDropdown} className="dropdown-button">
          Menu
        </button>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content show" ref={dropdownRef}>
          <ul>
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
            <li>
              <button
                className="dropdown-button"
                onClick={() => setIsDropdownOpen(false)}
              >
                닫기
              </button>
              ;
            </li>
            {/* 다른 메뉴 항목들 */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
