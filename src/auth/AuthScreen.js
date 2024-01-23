import React, { useState, useEffect, useContext } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HomeButton from '../layout/HomeButton';
import styles from '../style/AuthScreen.module.scss';
import GoogleLogin from './GoogleLogin';
import { AuthContext } from '../AuthContext';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const AuthScreen = () => {
  const { currentUser, loginWithGoogle, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // 로그인 상태이면
      navigate('/');
    }
  }, [currentUser]);

  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className={styles.authScreen}>
      <HomeButton />
      <GoogleLogin />
      <button
        className={`btn btn-primary ${styles.toggleButton}`}
        onClick={() => setShowSignup(!showSignup)}
      >
        {showSignup ? '로그인 창' : '회원가입 창'}
      </button>
      {showSignup ? <SignupForm /> : <LoginForm />}
    </div>
  );
};

export default AuthScreen;
