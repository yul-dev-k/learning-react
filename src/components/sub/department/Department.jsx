import { useState } from "react";
import Layout from "../../common/layout/Layout";

export default function Department() {
  /* 바닐라 JS는 static DOM을 강제로 변화를 주기 때문에 느린게 맞았음.
  그러나 리액트는 가상돔을 이용해서 메모리단에서 계산함하고 변경점이 있어야만 렌더하기 때문에 매 순간 렌더되더라도 느린 것이 아님.
   */
  console.log("re-render");
  // useState는 2개의 값이 담겨있는 배열을 반환
  // 첫 번째 값은 인수에 전달된 값을 초기값으로 활용한 state값,
  // 두 번째 값은 해당 state를 변경할 수 있는 state 변경 전용 함수, 무조건 state는 전용 함수로만 변경 가능
  const [num, setNum] = useState(0);

  return (
    <Layout title={"Department"}>
      <button onClick={() => setNum(num - 1)}>minus</button>
      <button onClick={() => setNum(num + 1)}>plus</button>
      <h2>{num}</h2>
    </Layout>
  );
}

/* 
  리액트 대표적인 hook 3대장
  useSate
  - 화면 렌더링을 담당하는 중요 데이터를 관리하는 그릇
  - 화면의 모든 변경사항은 state에 담아서 관리 및 렌더 해줘야함
  - state 값이 변경되면 리액트는 무조건 컴포넌트를 재호출 해서 화면을 다시 렌더링 (re-rendering)

  useEffect
- 컴포넌트의 생명 주기 관리 (life cycle)
- 컴포넌트의 생성 (Mount)
- 컴포넌트의 변경 (State Change)
- 컴포넌트의 소멸 (UnMount)
- 컴포넌트의 생성, 변경, 소멸 시 특정 이벤트 호출해야할될 때 주로 사용

  useRef
  - 컴포넌트가 재호출 되더라도 사라지면 안되는 값을 담는 그릇
  - 메모리 상에만 존재하는 최신 가상돔을 선택해야될 때 담는 용도
*/
