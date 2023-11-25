import { useRef } from "react";

// 인수로 throttle을 적용한 함수를 전달 받음
export function useThrottle(func) {
  const eventBlocker = useRef(null);
  return () => {
    if (eventBlocker.current) return;
    eventBlocker.current = setTimeout(() => {
      func();
      eventBlocker.current = null;
    }, 500);
  };
}
