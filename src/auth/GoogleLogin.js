import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {});
  };

  return (
    <div>
      <button onClick={handleAuth}>구글 로그인</button>
    </div>
  );
};

export default GoogleLogin;
