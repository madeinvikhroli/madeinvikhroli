"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
const CheckoutCard = dynamic(
  () => import("../app/ui/components/checkout/CheckoutCard"),
  { ssr: false }
);

type CheckoutCardProps = {
  setOpenCheckoutPopup: (value: boolean) => void;
  artifact: any;
};

const CheckoutPortal = ({
  setOpenCheckoutPopup,
  artifact,
}: CheckoutCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById("portal-root");
  return portalRoot
    ? createPortal(
        <CheckoutCard
          setOpenCheckoutPopup={setOpenCheckoutPopup}
          artifact={artifact}
        />,
        portalRoot
      )
    : null;
};

export default CheckoutPortal;
