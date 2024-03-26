import React, { useEffect } from 'react';
import '../../style/AdminMenu.scss';
import { useModal } from '../../contexts/ModalContext';
import ComplaintFormFirebase from '../Complaint/ComplaintFormFirebase';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

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
        <button className="button delete" onClick={onClickDelete}>
          삭제
        </button>
      </>,
    );
  };

  const onClickDelete = async () => {
    const complaintRef = doc(db, 'complaints', detailData.id);
    try {
      await updateDoc(complaintRef, {
        isDeleted: true,
      });
      openModal(
        <>
          <p>민원 삭제</p>
          <p>민원 삭제가 완료 되었습니다.</p>
          <button
            className="button process"
            onClick={() => {
              closeModal();
              navigate('/complaintlist');
            }}
          >
            민원 목록으로 돌아가기
          </button>
        </>,
      );
    } catch (error) {
      openModal(
        <>
          <p>에러</p>
          <p>민원 삭제 중 에러가 발생하였습니다.</p>
          <p>에러 코드 : {error}</p>
        </>,
      );
    }
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
      {detailData.isDeleted === false && (
        <button className="button delete" onClick={handleDelete}>
          삭제
        </button>
      )}
      <button className="button process" onClick={handleProcess}>
        민원 처리
      </button>
    </div>
  );
};

export default AdminMenu;
