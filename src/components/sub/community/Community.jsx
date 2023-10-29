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
    </Layout>
  );
}
