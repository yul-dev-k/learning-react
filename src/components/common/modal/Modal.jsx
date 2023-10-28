import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal({ IsOpen, setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = IsOpen ? "hidden" : "auto";
  }, [IsOpen]);

  return (
    <>
      {IsOpen && (
        <aside className="modal">
          <div className="con">
            <span onClick={() => setIsOpen(false)}>Close</span>
          </div>
        </aside>
      )}
    </>
  );
}
