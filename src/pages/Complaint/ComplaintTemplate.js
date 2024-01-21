import React from 'react';
import '../style/ComplaintTemplate.scss';

const ComplaintTemplate = ({ children }) => {
  return (
    <div className="ComplaintTemplate">
      <div className="app-title">민원 접수 내역</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default ComplaintTemplate;
