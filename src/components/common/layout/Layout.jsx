import { useEffect, useRef } from "react";
import "./Layout.scss";

export default function Layout({ children, title }) {
  let newClass = title.toLowerCase().split(" ").join("_");
  const refTitle = useRef(null);

  useEffect(() => {
    // 가상돔을 제어해야하면 무조건 useEffect쓴다고 생각하면 됨.
    let text = refTitle.current.innerText;
    let tags = "";
    let count = 0;
    for (let letter of text) {
      count++;
      tags += `<span style='display:inline-block; transition-delay:${
        0.1 * count
      }s'>${letter}</span>`;
    }
    refTitle.current.innerHTML = tags;
  }, []);
  return (
    <section className={`layout ${newClass}`}>
      <h1 ref={refTitle}>{title}</h1>
      {children}
    </section>
  );
}
