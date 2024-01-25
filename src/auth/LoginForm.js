import React, { useState } from 'react';
import styles from '../style/LoginForm.module.scss';
import axios from 'axios';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const api = 'http://localhost:8080/member/'; // API 엔드포인트 주소

  async function handleSubmit(e) {
    e.preventDefault();
    // 백엔드 API로 로그인 요청을 보내는 로직
    axios
      .post(api, { id: id, password: password })
      .then(() => {
        console.log('로그인 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.LoginForm}>
      <div className={styles.formControl}>
        <input
          type="text"
          className={styles.formControl}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디 입력"
        />
      </div>
      <div className={styles.formControl}>
        <input
          type="password"
          className={styles.formControl}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
      </div>
      <button className={styles.btnSuccess} type="submit">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
