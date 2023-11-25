import { Anime } from "../../../asset/anime";
import { useThrottle } from "../../../hooks/useThrottle";
import "./Btns.scss";
import { useRef, useEffect, useState } from "react";

/* 
  useCallback: 함수 자체를 메모이제이션해서 해당 함수를 재활용
  useMemo: 함수의 return 값 자체를 메모이제이션
  memo: 컴포넌트 자체를 메모잊이션


  고차 컴포넌트(hoc): High order Component
  인수로 컴포넌트를 전달 받아서 새로운 컴포넌를 반환

  hook의 조건
  1. 이름이 use로 시작
  2. custom hook은 무조건 함수나 리턴값을 반환
  3. 다른 훅이나 핸드러 함수 안쪽에서 호출이 불가. 컴포넌트 함수 안쪽에서만 호불 가능
*/

/* 
  throttle: 강제로 이벤트 핸들러 호출횟수를 압박해서 줄이는 기법
  - scroll, resize, mousmove, mousewheel : 단기간에 많은 핸드러를 호출하는 이벤트 (1초 60번 화면 주사율 60hz)
*/

export default function Btns() {
  // section의 전체 갯수가 담길 값을 참조객체에서 state로 변경
  // Num값 변경 시 컴포넌트가 재렌더링 되어야 버튼이 생기므로 state 처리
  const [Num, setNum] = useState(0);
  const secs = useRef(null);
  const btns = useRef(null);
  const eventBlocker = useRef(null);

  // 컴포넌트 마운티시 윈도우 스크롤 이벤트에 연결될 함수
  const activation = () => {
    // eventBlocker 참조 객체 값이 있으면 return으로 함수 종료
    if (eventBlocker.current) return;
    //activation함수를 setTimeout을 묶어놓은 다음에 setTimeout이 끝나야지만 eventBlocker값을 비움으로써
    //강제로 0.5초동안 함수 호출을 막아줌
    eventBlocker.current = setTimeout(() => {
      console.log("activation");
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
      eventBlocker.current = null;
    }, 500);
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
    secs.current = btns.current.parentElement.querySelectorAll(".myScroll");
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
