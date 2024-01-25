import React, { useState, useEffect, useContext } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HomeButton from '../layout/HomeButton';
const AuthScreen = () => {
  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) {
  //     // 로그인 상태이면
  //     navigate('/');
  //   }
  // }, [currentUser]);

  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <HomeButton />
      <button onClick={() => setShowSignup(!showSignup)}>
        {showSignup ? '로그인 창' : '회원가입 창'}
      </button>
      {showSignup ? <SignupForm /> : <LoginForm />}
    </>
  );
};

export default AuthScreen;
