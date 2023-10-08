import { useEffect, useRef } from "react";
import "./Layout.scss";
import { useSplitText } from "../../../hooks/useSplitText";

export default function Layout({ children, title }) {
  let newClass = title.toLowerCase().split(" ").join("_");
  const refFrame = useRef(null);
  const refTitle = useRef(null);
  // hook안에 hook을 호출할 수 없으니 return값인 함수를 변수로 받아서
  const splitText = useSplitText();

  useEffect(() => {
    // 다른 hook에서 custom hook을 사용할 수 있게한 것
    splitText(refTitle, 0.3, 2);
    setTimeout(() => {
      refFrame.current.classList.add("on");
    }, 300);
  }, []);
  return (
    <section ref={refFrame} className={`layout ${newClass}`}>
      <h1 ref={refTitle}>{title}</h1>
      <div className="bar"></div>
      {children}
    </section>
  );
}
