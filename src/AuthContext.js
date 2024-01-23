// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(() => {
        navigate('/home'); // 로그인 성공 시 홈으로 이동
      })
      .catch((error) => {
        // 로그인 에러 처리
      });
  };

  const logout = () => {
    return signOut(auth)
      .then(() => {
        navigate('/'); // 로그아웃 성공 시 초기 루트로 이동
      })
      .catch((error) => {
        // 로그아웃 에러 처리
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        navigate('/home'); // 로그인 상태 확인 시 홈으로 이동
      } else {
        navigate('/'); // 로그아웃 상태 확인 시 초기 루트로 이동
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
