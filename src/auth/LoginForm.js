import React, { useState } from 'react';
import styles from '../style/LoginForm.modul.scss'; // SCSS 모듈 임포트
const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // 백엔드 API로 로그인 요청을 보내는 로직

    const api = '로그인 API 주소'; // 로그인 API 엔드포인트 주소

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('로그인 성공:', data);
        // 성공 처리 로직, 예를 들어 사용자를 대시보드로 리다이렉트
      } else {
        console.error('로그인 실패');
        // 실패 처리 로직, 예를 들어 에러 메시지 표시
      }
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
      // 네트워크 에러 처리 로직, 예를 들어 사용자에게 오류 알림
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${styles.loginForm}`}>
      <div className="mb-3">
        <input
          type="id"
          className={`form-control ${styles.formControl}`}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디 입력"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className={`form-control ${styles.formControl}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
      </div>
      <button className={`btn btn-success ${styles.btnSuccess}`} type="submit">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
