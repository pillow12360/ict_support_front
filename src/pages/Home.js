import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/Home.module.scss'; // SCSS 모듈 임포트
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser, userRole } = useContext(AuthContext);

  if (!currentUser) {
    return <div>Loding</div>;
  }
  return (
    <div className={styles.container}>
      <h1>ICT 지원실 민원 처리</h1>
      <p>
        이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다. <br />
        문제 해결을 위한 자주 묻는 질문, 사용자 가이드 등을 찾아볼 수 있습니다.
      </p>
      {userRole === 'admin' ? (
        <>
          <h1>관리자 {currentUser.displayName}님 안녕하세요</h1>
          <Link to="/admin" className={styles.btn}>
            관리자 페이지
          </Link>
        </>
      ) : null}
      <div className={styles.user}>
        <h2>환영합니다 {currentUser.displayName}님!</h2>
        <p>
          현재 권한 :{' '}
          {(() => {
            switch (userRole) {
              case 'user':
                return '학생';
              case 'admin':
                return '관리자';
              default:
                return '알 수 없음';
            }
          })()}
        </p>
        <p>무엇을 도와드릴까요? 원하는 기능을 선택하여주세요</p>
        <div className={styles.buttonGroup}>
          <Link to="/complaintformfirebase" className={styles.btn}>
            민원 접수 하기
          </Link>
          <Link to="/complaintlist" className={styles.btn}>
            민원 조회
          </Link>
          <Link to="/directmessage" className={styles.btn}>
            채팅방
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
