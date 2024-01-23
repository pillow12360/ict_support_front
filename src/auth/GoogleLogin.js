import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

const GoogleLogin = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // 로그인 상태 관리를 위해 null로 초기화

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(result.user);
        console.log('로그인한 사용자 : ', result.user.displayName);
      })
      .catch((error) => {
        console.error('로그인 에러', error.message);
        alert(error.message);
      });
  };

  return (
    <div>
      {currentUser ? (
        <button className="btn" onClick={handleLogOut}>
          Google 로그아웃
        </button>
      ) : (
        <button className="btn" onClick={handleAuth}>
          Google 로그인
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
