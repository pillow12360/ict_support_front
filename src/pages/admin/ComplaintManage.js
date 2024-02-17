import React from 'react';
import Dashboard from './Dashboard';
import ComplaintsListManage from './ComplaintsListManage';

const ComplaintManage = () => {
  return (
    <div>
      <h1>관리자 페이지 입니다.</h1>
      <Dashboard />
      <ComplaintsListManage />
    </div>
  );
};
export default ComplaintManage;
