import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal() {
  const [Num, setNum] = useState(0);
  useEffect(() => {
    console.log("컴포넌트 마운트 시 한 번만 호출");
    document.body.style.overflow = "hidden";

    return () => {
      console.log("컴포넌트 언마운트 시 호출");
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    console.log("Num state변경될 때마다 실행");
  }, [Num]);

  const plus = () => setNum(Num + 1);
  const minus = () => setNum(Num - 1);

  return (
    <aside className="modal">
      <button onClick={plus}>plus</button>
      <button onClick={minus}>minus</button>
      <h1>{Num}</h1>
    </aside>
  );
}

/*
  useEffect
  - 특정 컴포넌트의 생명주기마다 특정 이벤트를 발생시켜야될 때
  - 컴포넌트의 생성 (Mount)
  -- useEffect의 의존성 배열을 비운 상태에서 함수 호출
  -- 실사례1 : 팝업생성 시 스크롤바 제거 (모달창 컴포넌트가 활성화될 때 스크롤바 강제로 비활성화 시키는것)
  -- 실사례2 : DOM이 아닌 window같이 BOM 객체에 이벤트 연결해야 될 때 (window 객체에 한 번만 연결해야할 때)
  -- 실사례3 : 무거운 서버사이드 데이터를 fetching 처리할 때 (컴포넌트 마운트 시 한 번만 가져오니까 굳~이 재렌더되지 않음)


  - 컴포넌트의 변경 (state Changed)
  -- useEffect의 의존성 배열에 특정 state를 등록한 상태에서 함수 호출
  -- 실사례1 : 특정 이벤트 발생시마다 서로 다른 서버데이터를 가져오면서 로딩바를 보여줘야될 때

  - 컴포넌트의 소멸 (UnMount)
  -- useEffect의 의존성 배열을 비운 상태에서 함수를 리턴
  -- 실사례1 : 팝업 제거 시 스크롤바 다시 생성
  -- 실사례2 : window 전역 객체의 이벤트를 제거해야될 때(removeEventListener 같은)

  리액트의 스크립트 파일은 2가지의 종류가 있다.
  - 컴포넌트
  -- 무조건 JSX 리턴
  
  - hook
  -- 자주쓰는 특정 값이나 함수를 리턴

  - custom hook
  -- 사용자 목적에 맞게 모든 컴포넌트가 재활용할 수 있는 기능 모음

  - hook의 필수 조건
  -- 함수 이름이 무조건 use키워드로 시작
  -- hook 안에서는 다른 hook을 내부에서 호출 불가
  -- 핸들러함수 안쪽에서도 hook 호출 불가
  -- 컴포넌트 함수 루트 경로에서만 호출 가능
  
  */
