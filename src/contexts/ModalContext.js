import React, { useState, useContext, createContext } from 'react';
import Modal from '../hooks/Modal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function openModal(content) {
    setModalContent(content);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalContent(null);
  }

  const value = { isModalOpen, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isModalOpen && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
