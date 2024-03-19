import React, { useEffect } from 'react';
import '../../style/AdminMenu.scss';
import { useModal } from '../../contexts/ModalContext';
import ComplaintFormFirebase from '../Complaint/ComplaintFormFirebase';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const AdminMenu = ({ detailData }) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    console.log(`AdminMenu detail : `, detailData);
  }, []);

  const handleEdit = () => {
    closeModal(); // 먼저 모달을 닫습니다.
    navigate('/complaintformfirebase', { state: { detailData } }); // 그 다음 페이지 이동
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
      {/* <Link 
        to={{
          pathname: '/complaintformfirebase',
          state: { detailData },
        }}
        className="button edit"
      >
        수정
      </Link> */}
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
