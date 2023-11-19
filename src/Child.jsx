import React, { memo } from "react";

function Child() {
  console.log("child");
  return (
    <div>
      <h2>Child</h2>
    </div>
  );
}

// HOC (High Order Component) : 고차 컴포넌트
// 인수로 컴포넌트를 전달받아서 새로운 컴포넌트를 리턴하는 컴포넌트
export default memo(Child);
