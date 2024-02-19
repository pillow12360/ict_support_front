import React from 'react';
import Dashboard from './Dashboard';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import '../../style/ComplaintManage.scss';
const ComplaintManage = () => {
  return (
    <div className="container">
      <Dashboard />
      <Link to="/complaintlist">민원 관리 페이지</Link>
    </div>
  );
};
export default ComplaintManage;
