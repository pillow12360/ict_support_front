import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'; // Firestore 가져오기 추가
import { useModal } from './ModalContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 사용자 권한 상태 추가
  const [isKakaoBrowser, setIsKakaoBrowser] = useState(false);

  const auth = getAuth();
  const firestore = getFirestore(); // Firestore 인스턴스 추가
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    setIsKakaoBrowser(/KAKAOTALK/i.test(navigator.userAgent));
  }, []);

  const fetchUserRole = async (user) => {
    // user 객체와 user.uid 값의 존재 여부를 확인
    if (!user || !user.uid) {
      console.error('Invalid user object or UID.');
      return; // user 객체 또는 user.uid 값이 없으면 함수 실행 중지
    }

    const userRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // 문서가 존재하면 권한 정보를 업데이트
      setUserRole(docSnap.data().role);
    } else {
      // 문서가 존재하지 않으면 기본 권한으로 새로운 사용자 문서를 생성
      const defaultRole = 'user'; // 기본 권한 설정
      await setDoc(userRef, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: defaultRole,
      });
      setUserRole(defaultRole); // 상태 업데이트
    }
  };

  const loginWithGoogle = () => {
    if (isKakaoBrowser) {
      openModal(
        <>
          <h2>로그인 에러</h2>
          <p>
            카카오톡 브라우저에서는 구글 로그인을 지원하지 않습니다. 외부
            브라우저를 사용해주세요. 크롬 접속 방법 : 오른쪽 하단 메뉴 -> 다른
            브라우저 열기
          </p>
        </>,
      );
      return;
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user); // 로그인 성공 후 user 객체 확인
        if (result.user && result.user.uid) {
          fetchUserRole(result.user);
        } else {
          console.error('User UID is undefined.');
        }
      })
      .catch((error) => {
        // 로그인 에러 처리
      });
  };

  const logout = () => {
    return signOut(auth)
      .then(() => {
        navigate('/');
        setUserRole(null); // 로그아웃 시 권한 정보 초기화
      })
      .catch((error) => {
        // 로그아웃 에러 처리
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserRole(user.uid); // 사용자 상태 변경 시 권한 정보 가져오기
        if (location.pathname === '/') {
          navigate('/home');
        }
      } else {
        navigate('/');
        setUserRole(null); // 사용자 로그아웃 시 권한 정보 초기화
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, location.pathname]);

  return (
    <AuthContext.Provider
      value={{ currentUser, userRole, isKakaoBrowser, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
