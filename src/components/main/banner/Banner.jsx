import React, { useEffect, useRef } from "react";
import { useGetCurrentScroll } from "../../../hooks/useGetCurrentScroll";
import "./Banner.scss";

export default function Banner() {
  const currentEl = useRef(null);
  const titleEl = useRef(null);
  const getScroll = useGetCurrentScroll();

  const handleScroll = () => {
    const modifiedScroll = getScroll(currentEl);
    titleEl.current.style.transform = `translatex(${modifiedScroll}px)`;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="banner myScroll" ref={currentEl}>
      <h1 ref={titleEl}>Bannder</h1>
    </section>
  );
}
