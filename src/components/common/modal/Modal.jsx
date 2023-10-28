import { useEffect, useState } from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";

/*
  motion: 모션을 걸고 싶은 JSX 요소 앞쪽에 motion.을 추가하면 initial, animate, exit라는 속성으로 모션 설정 가능케하는 컴포넌트
  AnimatePresence:모션을 적용할 컴포넌트의 wrapping 컴포넌트 - 자식 요소의 모션이 끝날 때 까지 언마운트 되는 시점을 holding 처리
  적용가능한 모션 속성 : opacity, scale, rotate, x, y
*/

export default function Modal({ IsOpen, setIsOpen, children }) {
  useEffect(() => {
    document.body.style.overflow = IsOpen ? "hidden" : "auto";
  }, [IsOpen]);

  return (
    <AnimatePresence>
      {IsOpen && (
        <motion.aside
          className="modal"
          initial={{ opacity: 0, x: "100%", scale: 0.5 }} // JSX가 마운트 되기 전 상태의 스타일
          animate={{ opacity: 1, x: 0, scale: 1 }} // JSX가 마운트 된 후의 스타일
          exit={{ opacity: 0, x: "-100%", scale: 1.5 }} // JSX가 앞으로 언마운트될 때의 스타일
          transition={{ duration: 1 }} // 스타일 변경될 때의 전환 시간
        >
          <motion.div
            className="con"
            initial={{ opacity: 0, rotate: 50 }}
            animate={{ opacity: 1, transition: { delay: 1 }, rotate: 0 }}
            exit={{ opacity: 0, rotate: 0 }}
          >
            {children}
            <motion.span
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 2 } }}
              exit={{ opacity: 0, x: 200 }}
            >
              Close
            </motion.span>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
