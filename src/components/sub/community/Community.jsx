import React, { useEffect, useRef, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const [Posts, setPost] = useState([]);
  const refInput = useRef(null);
  const refTextarea = useRef(null);

  const createPost = () => {
    // 기존의 Post 배열 값을 Deep Copy한 다음 새로운 객체 값을 추가 (불변성 유지)

    if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
      alert("제목 또는 본문을 입력하세요.");
      resetPost();
    }
    setPost([
      // 먼저 쓴 글이 밑으로 가게끔
      { title: refInput.current.value, content: refTextarea.current.value },
      ...Posts,
    ]);
    resetPost();
  };

  const resetPost = () => {
    refInput.current.value = "";
    refTextarea.current.value = "";
  };

  useEffect(() => {
    // 문자열로 바꿔줘야 하기 때문에 JOSN.stringfy 메서드를 사용함
    localStorage.setItem("posts", JSON.stringify(Posts));
    /* 그런데 이렇게 해두고 새로 고침하면 화면에서도 사라지고, localStorage에서도 사라짐.
    - 그 이유는 이 값이 마운트된 이후 담은 state 값을 로컬저장소에 넣어주는 것임으로
    - 브라우저를 새로 고침 해주면 이미 있던 state의 값이 사라지게 되는 것.
    - 즉, state가 초기화가 됨으로 로컬저장소의 값도 Posts 초기 값인 빈 배열로 초기화됨 
    -> 화면에도 보여지는 게 없어지고, 로컬저장소 값도 사라짐
    */
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
                <button>Delete</button>
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
