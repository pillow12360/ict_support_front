import React, { useState } from 'react';
import axios from '../../node_modules/axios/index';
import styles from '../style/SignupForm.module.scss';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [buliding, setBuliding] = useState('');
  const [testPass, setTestPass] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); // 버튼 클릭시 기본 동작 막음

    const api = `http://localhost:8080/members`; // URL 수정

    axios
      .post(api, { name: name, id: id, password: password, buliding: buliding })
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className={styles.formControl}>
        <input
          type="text" // id 대신 text 타입 사용
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요"
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
      <div className={styles.formControl}>
        <input
          type="text"
          value={buliding}
          onChange={(e) => setBuliding(e.target.value)}
          placeholder="건물"
        />
      </div>
      <button className={styles.btnSuccess} type="submit">
        회원가입 완료
      </button>
    </form>
  );
};

export default SignupForm;
