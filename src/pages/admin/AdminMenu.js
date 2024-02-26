import React from 'react';
import '../../style/AdminMenu.scss';
import { useModal } from '../../ModalContext';

const AdminMenu = () => {
  const { openModal } = useModal();

  const handleEdit = () => {};
  const handleDelete = () => {
    openModal(
      <>
        <h2 className="title">경고</h2>
        <p>해당 민원을 삭제하시겠습니까?</p>
        <button className="button delete">삭제</button>
      </>,
    );
  };

  const handleProcess = () => {};

  return (
    <div className="admin-menu-container">
      관리자 전용 메뉴
      <br />
      <button className="button edit">수정</button>
      <button className="button delete" onClick={handleDelete}>
        삭제
      </button>
      <button className="button process">민원 처리</button>
    </div>
  );
};

export default AdminMenu;
