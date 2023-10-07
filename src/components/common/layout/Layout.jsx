import "./Layout.scss";

export default function Layout({ children, title }) {
  // console.log(props);
  // 자식 컴포넌트에서 props.children
  // 해당 컴포넌트로 warpping되고 있는 자식 요소가 전달
  return (
    <section className="layout">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

/* 
	리액트 : 단방향 데이터 바인딩
	데이터가 무조건 부모에서 자식으로만 전달 가능

	부모에서 자식 컴포넌트로 데이터 전달하는 방법
	1. 자식 컴포넌트에 props 객체의 children property
	-- 부모 컴포넌트가 감싸고 있는 모든 요소들이 전달됨

	2. 부모 컴포넌트에서 커스텀 props라는 속성에 직접 값을 대입해서 전달
	-- 컴포넌트 호출 시 커스텀 속성으로 원하는 값 전달
*/
