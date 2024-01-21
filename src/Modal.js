import React from 'react';
import styles from './Modal.module.scss';
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
