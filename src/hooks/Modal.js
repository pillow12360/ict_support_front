import React from 'react';
import { useModal } from '../contexts/ModalContext';
import styles from '../style/Modal.module.scss';

function Modal({ children }) {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;
