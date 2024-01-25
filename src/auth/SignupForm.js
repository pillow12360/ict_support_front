import React, { useState } from 'react';
import axios from '../../node_modules/axios/index';
import styles from '../style/SignupForm.module.scss';

const SignupForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testPass, setTestPass] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); // 버튼 클릭시 기본 동작 막음

    const api = `http://localhost:8080/api/members`; // URL 수정

    axios
      .post(api, {
        username: userName,
        email: email,
        password: password,
      })
      .then(() => {
        console.log('회원가입 성공'); // 메시지 수정
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.SignupForm}>
      <div className={styles.formControl}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className={styles.formControl}>
        <input
          type="text" // id 대신 text 타입 사용
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력하세요"
        />
      </div>
      <div className={styles.formControl}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </div>
      <div className={styles.formControl}>
        <input
          type="password"
          value={testPass}
          onChange={(e) => setTestPass(e.target.value)}
          placeholder="비밀번호 확인"
        />
      </div>
      <button className={styles.btnSuccess} type="submit">
        회원가입 완료
      </button>
    </form>
  );
};

export default SignupForm;
