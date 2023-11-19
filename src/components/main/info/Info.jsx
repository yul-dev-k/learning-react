import React, { useEffect, useRef } from "react";
import { useGetCurrentScroll } from "../../../hooks/useGetCurrentScroll";
import "./Info.scss";

export default function Info() {
  const currentEl = useRef(null);
  const boxEl = useRef(null);
  const getScroll = useGetCurrentScroll();

  const handleScroll = () => {
    const modifiedScroll = getScroll(currentEl);
    boxEl.current.style.transform = `rotate(${modifiedScroll}deg)`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="info myScroll" ref={currentEl}>
      <div className="box" ref={boxEl}></div>
    </section>
  );
}
