import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/Home.module.scss'; // SCSS 모듈 임포트
import GoogleLogin from '../auth/GoogleLogin';

const First = () => {
  return (
    <div className={styles.container}>
      <h1>ICT 지원실 민원 처리</h1>
      <p>이곳에서는 다양한 ICT 관련 민원을 접수하고 처리합니다.</p>
      <p>
        문제 해결을 위한 자주 묻는 질문, 사용자 가이드 등을 찾아볼 수 있습니다.
      </p>

      <div className={styles.buttonGroup}>
        로그인 후 서비스 이용 가능 <GoogleLogin />
      </div>
    </div>
  );
};

export default First;
