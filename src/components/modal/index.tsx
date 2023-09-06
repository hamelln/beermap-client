"use client";

import React, { ReactNode } from "react";

interface Props {
  modalProps: {
    modalKey: string;
    modalRef: any;
    closeModal: any;
    handleModalClick: any;
    isOpen: boolean;
  };
  children: ReactNode;
}

const Modal = ({ modalProps, children }: Props) => {
  const { modalKey, modalRef, closeModal, handleModalClick, isOpen } =
    modalProps;

  return (
    <dialog
      data-testid={modalKey}
      ref={modalRef}
      onClick={handleModalClick}
      onClose={closeModal}
    >
      {isOpen ? children : <></>}
    </dialog>
  );
};

export default Modal;
