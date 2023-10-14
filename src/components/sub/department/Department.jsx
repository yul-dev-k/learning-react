import React, { useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Department.scss";
import { useFetch } from "../../../hooks/useFetch";

/* 리액트에서 외부 데이터 fetching 작업 흐름
  1. 컴포넌트 함수가 호출되고 외부데이터를 받을 state초기화
  2. 의존성 배열이 비어있는 useEffect hook 안쪽에서 fetch로 비동기 데이터 받고 state에 넘겨줌
  3. useEffect 안쪽에서 fetch 문을 써야 하는 이유는 fetch 자체가 web api를 통해서 클라이언트 기반으로 데이터를 전달받는 방식이기 때문에, 무조건 컴포넌트가 마운트 되어야지만 호출 가능
  4. useEffect에 의해서 데이터가 받아지고 state에 전달되면 자동으로 컴포넌트는 재렌더링됨
  5. 비동기 데이터를 활용해서 실제 JSX로 동적 DOM을 생성하는 시점은 2번째 렌더링 타임
*/

const path = process.env.PUBLIC_URL;

export default function Department() {
  const [Title, setTitle] = useState("");
  // parsing된 json 데이터를 배열에 담음.
  const [Department, setDepartment] = useState([]);
  const [History, setHistory] = useState([]);

  // 커스텀 훅을 다른 훅에서 사용할 수 없으므로 함수 자체를 리턴받아 fetchData라는 변수에 저장. 그리하여 다른 훅에서도 사용할 수 있게끔함.
  const fetchData = useFetch();

  useEffect(() => {
    fetchData(`${path}/DB/department.json`, setDepartment, setTitle); // useEffect를 두 번 써줘야하는 줄 알았는데 한 번만 써주고 hook 호출하면 되는 것이었음. 어처피 초기 마운트 이후에 hook을 호출하면 되니까 당연한거임.
    fetchData(`${path}/DB/history.json`, setHistory);
  }, []);

  return (
    <Layout title={"Department"}>
      <section id="historyBox">
        <h2>{Title.charAt(0).toUpperCase() + Title.slice(1)}</h2>
        {History.map((el, idx) => (
          // 프래그먼트에 key 값을 주기 위해선 React.Fragment라는 컴포넌트로 바꾸어주면됨.
          <React.Fragment key={idx}>
            <h3>{Object.keys(el)}</h3>
            <ul>
              {Object.values(el)[0].map((txt, idx) => (
                <li key={idx}>{txt}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </section>

      <section id="memberBox">
        <h2>{Title.charAt(0).toUpperCase() + Title.slice(1)}</h2>
        {Department.map((member, idx) => (
          <article key={idx}>
            <div className="pic">
              <img src={`${path}/img/${member.pic}`} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}
