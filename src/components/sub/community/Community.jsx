import React, { useRef } from "react";
import { TfiWrite } from "react-icons/tfi";
import { MdCancel } from "react-icons/md";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const refInput = useRef(null);
  const refTextarea = useRef(null);
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
            <button>
              <MdCancel color={"#555"} fontSize="20" />
            </button>
            <button>
              <TfiWrite color={"#555"} fontSize="20" />
            </button>
          </nav>
        </div>
        <div className="showBox"></div>
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
*/
