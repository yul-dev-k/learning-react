import { useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Department.scss";
import Modal from "../../common/modal/Modal";

export default function Department() {
  const [Open, setOpen] = useState(false);
  return (
    <Layout title={"Department"}>
      <button onClick={() => setOpen(!Open)}>{Open ? "close" : "open"}</button>
      {Open && <Modal />}
    </Layout>
  );
}

/* 
  return믄 바깥에는 모든 스크립트 구문을 활용 가능
  단, JSX 구문 안쪽에서는 {}를 통해서 할 수 있는 연산 3가지
  1. 변수치환
  2. map으로 반복 처리
  3. 삼항연산자 혹은 &&를 통한 분기 처리
*/
