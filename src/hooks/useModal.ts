"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function useModal(modalKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasModalKey = () => searchParams.has(modalKey);

  const openModal = () => {
    modalRef.current?.showModal();
    handleOpen();
  };

  const handleOpen = () => {
    document.body.style.opacity = "0.7";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleClose = () => {
    hasModalKey() && router.back();
    document.body.style.opacity = "1";
    document.body.style.overflow = "auto";
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.nodeName === "DIALOG") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    (isOpen ? openModal : closeModal)();
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(hasModalKey());
  }, [searchParams.keys]);

  useEffect(() => {
    if (hasModalKey()) {
      router.replace(pathname);
      router.back();
    }
  }, []);

  return {
    modalKey,
    modalRef,
    isOpen,
    closeModal,
    handleClose,
    handleClick,
  };
}
