import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HomeButton from '../layout/HomeButton';
import styles from '../style/AuthScreen.module.scss';
import GoogleLogin from './GoogleLogin';

const AuthScreen = () => {
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
