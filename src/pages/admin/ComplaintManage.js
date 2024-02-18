import React from 'react';
import Dashboard from './Dashboard';
import ComplaintsListManage from './ComplaintsListManage';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
const ComplaintManage = () => {
  return (
    <div>
      <Dashboard />
      <ComplaintsListManage />
      <Link to="/complaintlist"></Link>
    </div>
  );
};
export default ComplaintManage;
