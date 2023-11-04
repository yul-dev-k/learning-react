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
  console.log(Posts);
  const refInput = useRef(null);
  const refTextarea = useRef(null);

  const createPost = () => {
    if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
      alert("제목 또는 본문을 입력하세요.");
      resetPost();
    }

    const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

    setPosts([
      {
        title: refInput.current.value,
        content: refTextarea.current.value,
        date: new Date(korTime),
      },
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
          {Posts.map((post, idx) => {
            const stringDate = JSON.stringify(post.date);
            const textedDate = stringDate
              .split("T")[0]
              .split('"')[1]
              .split("-")
              .join(".");

            return (
              <article key={idx}>
                <div className="txt">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <span>{textedDate}</span>
                </div>
                <nav>
                  <button>Edit</button>
                  <button onClick={() => deletePost(idx)}>Delete</button>
                </nav>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

/*
  글 수정 로직 단계
  1. 각 포스트에서 수정 버튼 클릭시 해당 객체에 enableUpdate=true 라는 프로퍼티 추가 후 state ㅈ장
  2. 반복 돌며 렌더링 시 반복도는 객체의 enableUpdate 값이 true면 제목, 폼 요소 출력하도록 분기 처리
  3. 수정 모드일 때는 수정 취소, 수정 완료 버튼 생성
  4. 수정 취소 버튼 클릭 시 출력 모드로 변경 (enableUpdate=false)
  5. 수정 완료 버튼 클릭 시 수정 모드에 있는 value값을 가져와서 state에 저장한 뒤 다시 출력 모드로 변경 처리
*/
