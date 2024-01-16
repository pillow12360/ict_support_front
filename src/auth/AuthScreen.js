import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import HomeButton from "../HomeButton";

const AuthScreen = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <HomeButton />
      <button
        className="btn btn-primary"
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
