import React, { useState, useEffect, useRef } from 'react';
import '../style/Footer.scss'; // CSS 파일 임포트
import { Link } from '../../node_modules/react-router-dom/dist/index';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const footerRef = useRef(null); // 푸터 요소에 대한 참조 생성

  const checkOverlap = () => {
    // 푸터 요소와 겹치는 요소의 위치를 계산하는 로직
    const footerRect = footerRef.current.getBoundingClientRect();
    const overlapElement = document.getElementById('overlapElement'); // 겹치는 요소의 ID 예시
    const overlapElementRect = overlapElement.getBoundingClientRect();

    // 겹치는 조건 확인 (예: 푸터와 겹치는 요소가 화면 내에 있는지 확인)
    if (footerRect.top < overlapElementRect.bottom) {
      setIsVisible(false); // 겹칠 경우 푸터 숨김
    } else {
      setIsVisible(true); // 겹치지 않을 경우 푸터 표시
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkOverlap);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', checkOverlap);
    };
  }, []);

  return (
    <div className={`footer ${isVisible ? 'is-visible' : ''}`} ref={footerRef}>
      <div className="footer-content">
        <footer className="footer">
          <div className="footer-content">
            <p>© 2024 서일대학교 ICT 민원 프로젝트 한동찬, 홍정기</p>
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
              <li></li>
              {/* ... 링크 내용 */}
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
