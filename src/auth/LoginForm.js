import React, { useState } from 'react';
import styles from '../style/LoginForm.module.scss';
import axios from 'axios';
import { useModal } from '../contexts/ModalContext';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const api = 'http://localhost:8080/member/'; // API 엔드포인트 주소
  const { openModal } = useModal();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // 백엔드 API로 로그인 요청을 보내는 로직

    if (!id || !password) {
      openModal(
        <>
          <h3>로그인 오류</h3>
          <p>아이디와 비밀번호를 모두 입력해주세요.</p>
        </>,
      );
      return;
    }

    axios
      .post(api, { id: id, password: password })
      .then(() => {
        console.log('로그인 성공');
        openModal(
          <>
            <h3>로그인 성공</h3>
          </>,
        );
        navigate('/');
      })
      .catch((error) => {
        openModal(
          <>
            <h3>로그인 실패</h3>
            <p>잠시후 다시 시도해주세요.</p>
          </>,
        );
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.LoginForm}>
      <div className={styles.loginHeader}>
        ICT 지원실 민원 처리 <br />
        로그인
      </div>
      <div className={styles.formControl}>
        <label htmlFor="id">로그인</label>
        <input
          type="text"
          id="id"
          className={styles.formInput} // formInput으로 변경
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디 입력"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className={styles.formInput} // formInput으로 변경
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
