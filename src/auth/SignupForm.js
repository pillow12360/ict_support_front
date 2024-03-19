import React, { useState } from 'react';
import axios from '../../node_modules/axios/index';
import styles from '../style/SignupForm.module.scss';
import { useModal } from '../contexts/ModalContext';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const SignupForm = () => {
  const { openModal, closeModal } = useModal(); // 모달 커스텀 훅 사용
  const navigate = useNavigate(); // 홈으로 리다이렉션을 위한 네비게이트

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [testPass, setTestPass] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault(); // 버튼 클릭시 기본 동작 막음

    if (userData.password !== testPass) {
      console.error('비밀번호가 일치하지 않습니다.');
      openModal(
        <>
          <h3>회원가입 오류</h3>
          <p>비밀번호가 일치하지 않습니다. 다시 확인해주세요</p>
        </>,
      );
      return;
    }

    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !testPass
    ) {
      openModal(
        <>
          <h3>회원가입 오류</h3>
          <p>모든 필드를 입력해 주세요.</p>
        </>,
      );
      return;
    }

    const api = `http://localhost:8080/api/members`; // URL 수정

    axios
      .post(api, userData)
      .then(() => {
        console.log('회원가입 성공'); // 메시지 수정
        openModal(
          <>
            <h3>회원가입 완료</h3>
            <p>회원가입이 왼료 되었습니다.</p>
            <p>감사합니다. 3초 후 자동으로 홈으로 이동합니다.</p>
          </>,
        );
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        openModal(
          <>
            <h3>오류 발생</h3>
            <p>오류가 발생하여 회원가입에 실패하였습니다.</p>
          </>,
        );
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.SignupForm}>
      <div className={styles.signupHeader}>
        ICT 민원 처리 <br />
        회원 가입
      </div>
      <div className={styles.formControl}>
        <label htmlFor="userName">이름</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          value={userData.email}
          onChange={handleChange}
          placeholder="이메일 입력하세요"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="비밀번호 입력"
        />
      </div>
      {/* 비밀번호 확인 입력 필드는 userData에 없으므로, 해당 라벨은 추가하지 않음 */}
      <div className={styles.formControl}>
        <input
          type="password"
          value={testPass}
          onChange={(e) => {
            setTestPass(e.target.value);
          }}
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
