import Layout from "../../common/layout/Layout";

export default function Department() {
  // 리액트 컴포넌트는 무조건 state에 담겨 있는 값만 변화점을 인지해서 컴포넌트를 재호출 하면서 화면 리렌더
  let num = 0;

  return (
    <Layout title={"Department"}>
      <button onClick={() => num - 1}>minus</button>
      <button onClick={() => num + 1}>plus</button>
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
