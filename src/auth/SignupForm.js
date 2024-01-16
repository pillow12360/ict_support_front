import React, { useState } from 'react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); // 버튼 클릭시 기본 동작 막음

    const api = `api주소`;

    try {
      // API 요청을 보냅니다.
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, id, password }),
      });

      // 응답을 처리합니다.
      if (response.ok) {
        const data = await response.json();
        console.log('회원가입 성공:', data);
        // 성공 처리 로직
      } else {
        console.error('회원가입 실패');
        // 실패 처리 로직
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
      // 네트워크 에러 처리 로직
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button className="btn btn-success" type="submit">
        회원가입 완료
      </button>
    </form>
  );
};

export default SignupForm;
