import React, { useEffect, useRef } from "react";
import "./Banner.scss";

export default function Banner() {
  const currentEl = useRef(null);
  const titleEl = useRef(null);

  const handleScroll = () => {
    const scroll = window.scrollY;
    const modifiedScroll = scroll - currentEl.current?.offsetTop;
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
