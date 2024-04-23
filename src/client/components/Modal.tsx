import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const modalsContainer = document.getElementById("modals");

export default function Modal({ children }: PropsWithChildren) {
  if (!modalsContainer) {
    return children;
  }

  return createPortal(children, modalsContainer);
}
