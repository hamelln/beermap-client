"use client";

import React, { ReactNode } from "react";

interface Props {
  modalProps: {
    modalKey: string;
    modalRef: any;
    handleClose: any;
    handleClick: any;
    isOpen: boolean;
  };
  children: ReactNode;
}

const Modal = ({ modalProps, children }: Props) => {
  const { modalKey, modalRef, handleClose, handleClick, isOpen } = modalProps;

  return (
    <dialog
      data-testid={modalKey}
      ref={modalRef}
      onClick={handleClick}
      onClose={handleClose}
    >
      {isOpen ? children : <></>}
    </dialog>
  );
};

export default Modal;
