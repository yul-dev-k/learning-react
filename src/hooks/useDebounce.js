import { useRef, useState } from "react";

// 인수로 화면에 렌더링 발생시키는 특정 state값을 받아서
export const useDebounce = (value) => {
  // 내부적으로 새로운 state에 옮겨 담음
  const [DebouncedVal, setDebouncedVal] = useState(value);
  const eventBlocker = useRef(null);

  // 인수로 받은 state값이 변경될 때 마다 setTimeout의 호출을 계속 초기화
  clearTimeout(eventBlocker.current);

  // 아래의 setTimeout에 의해서 원래 state값이 0.5초 안에 계속 변경되는 중이면
  // 새로운 state로 옮겨 담지 않다가 변경되는 값이 멈춘 뒤 0.5초가 지나야만 새로운 state로 옮겨주고
  eventBlocker.current = setTimeout(() => {
    setDebouncedVal(value);
  }, 500);

  // debouncing이 적용된 새로운 state를 전달
  return DebouncedVal;
};
