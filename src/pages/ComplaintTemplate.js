import React from "react";

const ComplaintTemplate = ({ children }) => {
  return (
    <div className="ComplaintTemplate">
      <h1 className="app-title">민원 접수 내역</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default ComplaintTemplate;
