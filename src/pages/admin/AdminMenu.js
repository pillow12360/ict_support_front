import React from 'react';
import '../../style/AdminMenu.scss';
const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      관리자 전용 메뉴
      <br />
      <button className="button edit">수정</button>
      <button className="button delete">삭제</button>
      <button className="button process">민원 처리</button>
    </div>
  );
};

export default AdminMenu;
