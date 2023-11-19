import React from "react";

export default function Test() {
  return <div></div>;
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
*/
