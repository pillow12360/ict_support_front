import React from 'react';
import '../style/Footer.scss'; // CSS 파일 임포트
import { Link } from '../../node_modules/react-router-dom/dist/index';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 서일대학교 ICT 민원 프로젝트 한동찬</p>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            {/* ... 기타 링크들 */}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
