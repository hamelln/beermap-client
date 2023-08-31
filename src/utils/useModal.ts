"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useModal(modalKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
    modalRef.current?.showModal();
    document.body.style.opacity = "0.7";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    router.replace(pathname);
    document.body.style.opacity = "1";
    document.body.style.overflow = "auto";
    modalRef.current?.close();
    setIsOpen(false);
  };

  const handleModalClick = (e: any) => {
    if (e?.target?.nodeName === "DIALOG") {
      closeModal();
    }
  };

  useEffect(() => {
    setIsOpen(searchParams.has(modalKey));
  }, [searchParams]);

  useEffect(() => {
    (isOpen ? openModal : closeModal)();
  }, [isOpen]);

  return {
    modalKey,
    modalRef,
    closeModal,
    handleModalClick,
    isOpen,
  };
}
