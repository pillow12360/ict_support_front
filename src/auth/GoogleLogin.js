import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [userData, setUserData] = useState(null); // 로그인 상태 관리를 위해 null로 초기화

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        setUserData(user);
        navigate('/');
      } else {
        // 사용자가 로그아웃한 경우
        setUserData(null);
        navigate('/authscreen');
      }
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        console.log('로그인한 사용자 : ', result.user.displayName);
      })
      .catch((error) => {
        console.error('로그인 에러', error.message);
        alert(error.message);
      });
  };

  return (
    <div>
      {userData ? (
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
