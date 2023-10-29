import React, { useEffect, useRef, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const getLocalData = () => {
    const data = localStorage.getItem("posts");
    if (data) return JSON.parse(data);
    else return [];
  };
  const [Posts, setPosts] = useState(getLocalData());
  const refInput = useRef(null);
  const refTextarea = useRef(null);

  const createPost = () => {
    // 기존의 Post 배열 값을 Deep Copy한 다음 새로운 객체 값을 추가 (불변성 유지)

    if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
      alert("제목 또는 본문을 입력하세요.");
      resetPost();
    }
    setPosts([
      // 먼저 쓴 글이 밑으로 가게끔
      { title: refInput.current.value, content: refTextarea.current.value },
      ...Posts,
    ]);
    resetPost();
  };

  const deletePost = (delIdx) => {
    console.log(delIdx);
    // === 였을 때는 내가 선택한 것 외에 모두가 사라짐. (필터의 특성)
    // 그래서 !==으로 바꿔주면 선택한 것만 사라짐.
    // Posts.filter로 전달되는 삭제 순번과 현재 반복되는 값의 순번이 같지가 않는것만 배열로 반환 (삭제 순번 값만 제외하고 반환하기 떄문에. 결과적으로 삭제와 동일한 기능)
    // 삭제 순번 글만 제외한 나머지 배열 값을 다시 setPosts로 기존 Posts 값을 변경하면 컴퍼넌트가 재렌더링 되면서 해당 글만 제외된 나머지 글만 출력
    // 해당 구문에서는 filter 자체가 불변성을 유지하면서 새로운 배열을 리턴하기 때문에 굳이 전개 연산자로 기존 state 값을 Deep Copy할 필요가 없음.
    setPosts(Posts.filter((_, idx) => delIdx !== idx));
  };
  const resetPost = () => {
    refInput.current.value = "";
    refTextarea.current.value = "";
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(Posts));
  }, [Posts]);

  return (
    <Layout title={"Community"}>
      <div className="wrap">
        <div className="inputBox">
          <input type="text" ref={refInput} placeholder="title" />
          <textarea
            cols="30"
            rows="3"
            placeholder="leave messages"
            ref={refTextarea}
          ></textarea>

          <nav>
            <button onClick={resetPost}>
              <MdCancel color={"#555"} fontSize="20" />
            </button>
            <button onClick={createPost}>
              <TfiWrite color={"#555"} fontSize="20" />
            </button>
          </nav>
        </div>
        <div className="showBox">
          {Posts.map((post, idx) => (
            <article key={idx}>
              <div className="txt">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <nav>
                <button>Edit</button>
                <button onClick={() => deletePost(idx)}>Delete</button>
              </nav>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

/*
  CRUD 
  Create: 글작성 "POST"
  Read: 글 불러오기 "GET"
  Update: 글 수정 "PUT"
  Delete: 글 삭제 "DELETE"

  RESTful API
  - DB의 데이터를 구조적으로 변경하기 위한 개발 방법론  

  로컬저장소 (LocalStorage)
  - 모든 브라우져가 내장하고 있는 경량의 저장 공간
  - 문자값만 저장 가능 (5MB)
  - 객체값을 문자화 시켜서 저장
  - 로컬 저장소의 값을 불러올 때는 반대로 문자형태를 JSON 형태로 객체로 parsing해서 가져옴

  local storage 사용 방법
  localStorage.setItem('키', 문자화된 데이터) : 로컬 저장소에 데이터 저장
  localStorage.getItem('키') : 해당 데이터는 문자값으로 리턴되기 때문에 객체 형태로 parsing 처리 필요

  Posts state가 바뀔 때 마다 담겨야하니, useEffect에 Posts state 의존성을 사용
*/
