import { Anime } from "../../../asset/anime";
import "./Btns.scss";
import { useRef, useEffect, useState } from "react";

export default function Btns() {
  // section의 전체 갯수가 담길 값을 참조객체에서 state로 변경
  // Num값 변경 시 컴포넌트가 재렌더링 되어야 버튼이 생기므로 state 처리
  const [Num, setNum] = useState(0);
  const secs = useRef(null);
  const btns = useRef(null);

  // 컴포넌트 마운티시 윈도우 스크롤 이벤트에 연결될 함수
  const activation = () => {
    const scroll = window.scrollY;

    secs.current.forEach((el, idx) => {
      if (scroll >= el.offsetTop - window.innerHeight / 2) {
        Array.from(btns.current.children).forEach((btn) =>
          btn.classList.remove("on")
        );
        // btns의 li 요소가 동적으로 생성되기 전에 호출 시 오류를 피하기 위해서 optional chaining 처리
        btns.current.children[idx]?.classList.add("on");

        secs.current.forEach((sec) => sec.classList.remove("on"));
        secs.current[idx]?.classList.add("on");
      }
    });
  };

  const handleClick = (idx) => {
    new Anime(
      window,
      { scroll: secs.current[idx].offsetTop },
      { duration: 500 }
    );
  };

  // 컴포넌트 마운트시
  useEffect(() => {
    // 빈 참조 객체에 버튼과 section 요소를 담아줌
    secs.current = document.querySelectorAll(".myScroll");
    setNum(secs.current.length);

    // window scroll 이벤트에 activation함수 연결
    window.addEventListener("scroll", activation);

    return () => window.removeEventListener("scroll", activation);
  }, []);

  // Nym state 변경시 activation 호출
  useEffect(() => {
    // 마운트시 section의 첫 번째 요소에 on을 붙여주기 위함
    activation();
    // Num값이 바뀌는 순간은 마운트가 된 이후 section이 동적으로 생기는 딱 그 한 순간이므로, useEffect의 의존성 배열에 들어감.
    // 위 useEffect에서 쓰지 않은 이유는, 위 useEffect는 딱 처음만, 마운트되고 딱 처음만 실행되어야 하므로 useEffect를 따로 빼준것
  }, [Num]);

  return (
    <ul className="btns" ref={btns}>
      {Array(Num)
        .fill()
        .map((_, idx) => {
          return (
            <li
              key={idx}
              className={idx === 0 ? "on" : ""}
              onClick={() => handleClick(idx)}
            ></li>
          );
        })}
    </ul>
  );
}
