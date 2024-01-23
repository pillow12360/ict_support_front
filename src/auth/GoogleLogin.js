import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        console.log('로그인한 사용자 : ', user.displayName);
      })
      .catch((error) => {
        console.error('로그인 에러', error.message);
      });
  };

  return (
    <div>
      <button onClick={handleAuth}>Google 로그인</button>
    </div>
  );
};

export default GoogleLogin;
