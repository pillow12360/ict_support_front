import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useModal } from './ModalContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // 카카오 브라우저 감지 상태 추가
  const [isKakaoBrowser, setIsKakaoBrowser] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    // 브라우저 유저 에이전트로 카카오톡 브라우저 감지
    setIsKakaoBrowser(/KAKAOTALK/i.test(navigator.userAgent));
  }, []);

  const loginWithGoogle = () => {
    if (isKakaoBrowser) {
      // 카카오 브라우저인 경우 안내 메시지 표시
      // 예: 상태 업데이트나 컴포넌트에 메시지를 표시하는 로직
      openModal(
        <>
          <h2>로그인 에러</h2>
          <p>
            카카오톡 브라우저에서는 구글 로그인을 지원하지 않습니다. 외부
            브라우저를 사용해주세요. 크롬 접속 방법 : 오른쪽 하단 메뉴 -> 다른
            브라우저 열기
          </p>
          ,
        </>,
      );
      return;
    }

    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).catch((error) => {
      // 로그인 에러 처리
    });
  };

  const logout = () => {
    return signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // 로그아웃 에러 처리
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && location.pathname === '/') {
        navigate('/home');
      } else if (!user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, location.pathname]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isKakaoBrowser, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
