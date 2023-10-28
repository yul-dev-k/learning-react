import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal({ IsOpen, setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {IsOpen && (
        <aside className="modal">
          <div className="con">
            <span>Close</span>
          </div>
        </aside>
      )}
    </>
  );
}
