import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const AuthScreen = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowSignup(!showSignup);
        }}
      >
        {showSignup ? "로그인 창" : "회원가입 창"}
      </button>
      {showSignup ? <SignupForm /> : <LoginForm />}
    </div>
  );
};

export default AuthScreen;
