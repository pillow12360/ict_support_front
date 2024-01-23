import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const GoogleLogin = () => {
  const { currentUser, loginWithGoogle, logout } = useContext(AuthContext);

  return (
    <div>
      {currentUser ? (
        // 로그인 상태일 때 로그아웃 버튼 표시
        <button className="btn" onClick={logout}>
          로그아웃
        </button>
      ) : (
        // 로그아웃 상태일 때 로그인 버튼 표시
        <button className="btn" onClick={loginWithGoogle}>
          Google 로그인
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
