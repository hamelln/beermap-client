"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  modalKey: string;
  children: ReactNode;
}

const ModalLink = ({ modalKey, children }: Props) => {
  const pathname = usePathname();
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return (
    <Link
      href={`${DOMAIN}/${pathname}?${modalKey}=true`}
      data-cy="other-office-hours-modal"
    >
      {children}
    </Link>
  );
};

export default ModalLink;
