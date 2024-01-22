import React from 'react';
import '../style/Footer.scss'; // CSS 파일 임포트
import { Link } from '../../node_modules/react-router-dom/dist/index';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 ICT 프로젝트</p>
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
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
