import { useEffect, useRef } from "react";

export default function useModal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
    document.body.style.opacity = "0.7";
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    document.body.style.opacity = "1";
    document.body.style.overflow = "auto";
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const isClickOutsideModal = (e: any) => {
    const rect = modalRef.current?.getBoundingClientRect();
    const touch = e.changedTouches[0];
    if (
      rect &&
      (touch.clientX < rect.left ||
        touch.clientX > rect.right ||
        touch.clientY < rect.top ||
        touch.clientY > rect.bottom)
    ) {
      modalRef.current?.close();
    }
  };

  useEffect(() => {
    document.body.addEventListener("touchend", isClickOutsideModal, {
      passive: true,
    });
    return () => {
      document.body.removeEventListener("touchend", isClickOutsideModal);
    };
  }, []);

  return { modalRef, openModal, closeModal, handleCloseModal };
}
