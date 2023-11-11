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
  const [Allowed, setAllowed] = useState(true);
  console.log(Posts);
  const refInput = useRef(null);
  const refTextarea = useRef(null);
  const refEditInput = useRef(null);
  const refEditTextarea = useRef(null);

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
    if (!window.confirm("정말 해당 게시글을 삭제하겠습니까?")) return;
    // === 였을 때는 내가 선택한 것 외에 모두가 사라짐. (필터의 특성)
    // 그래서 !==으로 바꿔주면 선택한 것만 사라짐.
    // Posts.filter로 전달되는 삭제 순번과 현재 반복되는 값의 순번이 같지가 않는것만 배열로 반환 (삭제 순번 값만 제외하고 반환하기 떄문에. 결과적으로 삭제와 동일한 기능)
    // 삭제 순번 글만 제외한 나머지 배열 값을 다시 setPosts로 기존 Posts 값을 변경하면 컴퍼넌트가 재렌더링 되면서 해당 글만 제외된 나머지 글만 출력
    // 해당 구문에서는 filter 자체가 불변성을 유지하면서 새로운 배열을 리턴하기 때문에 굳이 전개 연산자로 기존 state 값을 Deep Copy할 필요가 없음.
    setPosts(Posts.filter((_, idx) => delIdx !== idx));
  };

  const enableUpdate = (editIdx) => {
    // Allowed값이 true일 때에만 수정 모드 진입 가능하게 처리
    if (!Allowed) return;
    // 일단 수정 모드 진입하면 Allowed값을 false로 변경해서 추가적으로 수정 모드 진입 불가 처리
    setAllowed(false);
    setPosts(
      // 기존의 Posts 배열을 반복을 돌면서 파라미터로 전달된 editIdx 순번에 해당되는 post 객체만 enableUpdate=true 값을 추가한 객체의 배열값을
      // 다시 기존 Posts에 변경
      Posts.map((post, idx) => {
        if (editIdx === idx) post.enableUpdate = true;
        return post;
      })
    );
  };

  const disableUpdate = (cancelIdx) => {
    // 수정 취소 시 다시 Allowed값 true 변경해서 수정모드 가능하게 변경
    setAllowed(true);
    setPosts(
      Posts.map((post, idx) => {
        if (cancelIdx === idx) post.enableUpdate = false;
        return post;
      })
    );
  };

  const updatePost = (updidx) => {
    if (
      !refEditInput.current.value.trim() ||
      !refEditTextarea.current.value.trim()
    )
      return alert("수정할 글의 제목과 본문을 입력하세요.");
    // 수정 완료 시 다시 Allowed값 true 변경해서 수정모드 가능하게 변경
    setAllowed(true);
    setPosts(
      Posts.map((post, idx) => {
        // 전달된 수정번호와 현재 반복도는 post 순번이 같으면
        if (updidx === idx) {
          // 수정모드의 폼요소값을 담아주고 enableUpdate 값을 false로 변경
          post.title = refEditInput.current.value;
          post.content = refEditTextarea.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    );
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

            if (post.enableUpdate) {
              // 수정 모드
              return (
                <article key={idx}>
                  <div className="txt">
                    <input
                      type="text"
                      defaultValue={post.title}
                      ref={refEditInput}
                    />
                    <textarea
                      defaultValue={post.content}
                      ref={refEditTextarea}
                    ></textarea>

                    <span>{textedDate}</span>
                  </div>
                  <nav>
                    <button onClick={() => disableUpdate(idx)}>Cancel</button>
                    <button onClick={() => updatePost(idx)}>Update</button>
                  </nav>
                </article>
              );
            } else {
              // 출력 모드
              return (
                <article key={idx}>
                  <div className="txt">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <span>{textedDate}</span>
                  </div>
                  <nav>
                    <button onClick={() => enableUpdate(idx)}>Edit</button>
                    <button onClick={() => deletePost(idx)}>Delete</button>
                  </nav>
                </article>
              );
            }
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
