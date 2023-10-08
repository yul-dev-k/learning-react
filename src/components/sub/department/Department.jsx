import { useState, useRef } from "react";
import Layout from "../../common/layout/Layout";
import "./Department.scss";

export default function Department() {
  console.log("re-render");
  // 리액트에 state변경이 일어나면 컴포넌트는 재렌더링됨
  // 바뀐 state 값은 다음번 렌더링 사이클에서 변경된 값이 적용됨
  // 화면의 정보값을 갱신해야되는 중요한 변경 사항이 아닌 요소를 state로 변경하면 계속해서 컴포넌트가 재렌더링 됨으로 비효율적
  // 대표적인 사례가 단순한 모션 처리를 위한 state 적용
  const rotate = useRef(0);
  let [Num, setNum] = useState(0);
  // Num++, Num--가 바로 바뀌지 않는 이유
  const plus = () => {
    setNum(++Num);
    console.log(rotate);
  };
  const minus = () => {
    setNum(--Num);
    console.log(rotate);
  };

  return (
    <Layout title={"Department"}>
      <button onClick={minus}>left</button>
      <button onClick={plus}>right</button>

      <article style={{ transform: `rotate(${45 * Num}deg)` }}></article>
    </Layout>
  );
}

/* 
  useRef를 사용해야 하는 실 사례 
  1. 가상돔요소를 선택해서 제어해야 할 때
  2. 특정 값을 변경처리할 때 불필요하게 컴포넌트를 재호출하고 싶지 않을때 (특히 모션)

*/
