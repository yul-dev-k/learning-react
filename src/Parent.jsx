import React, { useState } from "react";
import Child from "./Child";

export default function Parent() {
  console.log("parent");
  const [Count, setCount] = useState(0);
  return (
    <div>
      <div>
        <h1>{Count}</h1>
        <button onClick={() => setCount(Count - 1)}>minus</button>
        <button onClick={() => setCount(Count + 1)}>plus</button>
      </div>
      {/* 
      부모 컴포넌트 재호출 시 재호출될 필요 없는 자식 컴포넌트까지 무조건 강제 재호출됨
      해결방법: 자식 컴포넌트를 static한 상태로 강제 메모리 등록
      */}
      <Child />
    </div>
  );
}

/* 
  React에서의 메모이제이션
  리액트 컴포넌트 안에서 컴포넌트가 재렌더링될 때 마다 불필요하게 호출되는 함수, 리턴값, 컴포넌트 잧를 메모리에 강제 등록해서 재렌더링시 메모리에 등록된 값을 재활용하기 위한 성능향상 방법

  React에서 메모이제이션 처리시 주의점
  - 성능 향상을 위해서 메모리 점유율을 늘리는 등가교환 방식
  - 메모이제이션 처리된 값들을 garbage collector에서 제외됨

  Garbage Collector
  - 자바스크립트에서 안쓰는 메모리를 정기적으로 제거해주는 메모리 관리자

  - memo : 특정 컴포넌트 자체를 메모이제이션
  - useCallback : 컴포넌트 안쪽의 특정 핸들러 함수를 메모이제이션
  - useMemo : 특정 함수가 반환하는 값 자체를 메모이제이션

  But, 아무런 로직 없이 JSX만 생성되는 컴포넌트는 기회 비용이 적기 때문에 메모이제이션이 더 불필요한 메모리 소비를 야기시키니 주의
*/
