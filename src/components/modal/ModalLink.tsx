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
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <Link href={`${DOMAIN}/${pathname}?${modalKey}=true`}>{children}</Link>
  );
};

export default ModalLink;
