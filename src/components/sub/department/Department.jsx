import { useRef } from "react";
import Layout from "../../common/layout/Layout";
import "./Department.scss";

export default function Department() {
  console.log("re-render");
  const rotate = useRef(0);

  // 리액트에서 document.querySelector로 돔 요소를 선택하면 안되는 이유
  const box = useRef(null); // 처음엔 null -> 이후엔 {current: article} 담김.

  const plus = () => {
    ++rotate.current;
    box.current.style.transform = `rotate(${45 * rotate.current}deg)`; // 초기 렌더 이후 re-render 콘솔이 뜨지 않음.
  };
  const minus = () => {
    --rotate.current;
    box.current.style.transform = `rotate(${45 * rotate.current}deg)`; // 초기 렌더 이후 re-render 콘솔이 뜨지 않음.
  };

  return (
    <Layout title={"Department"}>
      <button onClick={minus}>left</button>
      <button onClick={plus}>right</button>

      <article ref={box}></article>
    </Layout>
  );
}
