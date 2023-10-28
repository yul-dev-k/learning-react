import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <aside className="modal">
      <div className="con">
        <span>Close</span>
      </div>
    </aside>
  );
}
