import React from 'react';
import Dashboard from './Dashboard';
import ComplaintsListManage from './ComplaintsListManage';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
const ComplaintManage = () => {
  return (
    <div>
      <Dashboard />
      <Link to="/complaintlist">민원 관리 페이지</Link>
    </div>
  );
};
export default ComplaintManage;
