import React, { useEffect } from 'react';
import '../../style/AdminMenu.scss';
import { useModal } from '../../ModalContext';
import ComplaintFormFirebase from '../Complaint/ComplaintFormFirebase';

const AdminMenu = ({ detailData }) => {
  const { openModal } = useModal();

  useEffect(() => {
    console.log(`detail : `, detailData);
  }, []);

  const handleEdit = () => {
    openModal(<ComplaintFormFirebase detailData={detailData} />);
  };

  const handleDelete = () => {
    openModal(
      <>
        <h2 className="title">경고</h2>
        <p>해당 민원을 삭제하시겠습니까?</p>
        <button className="button delete">삭제</button>
      </>,
    );
  };

  const handleProcess = () => {
    openModal();
  };

  return (
    <div className="admin-menu-container">
      관리자 전용 메뉴
      <br />
      <button className="button edit" onClick={handleEdit}>
        수정
      </button>
      <button className="button delete" onClick={handleDelete}>
        삭제
      </button>
      <button className="button process" onClick={handleProcess}>
        민원 처리
      </button>
    </div>
  );
};

export default AdminMenu;
