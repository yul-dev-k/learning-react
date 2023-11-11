import { useSplitText } from "../../../hooks/useSplitText";
import Layout from "../../common/layout/Layout";
import "./Members.scss";
import { useState, useRef, useEffect } from "react";

export default function Members() {
  console.log("re-render");
  const initVal = useRef({
    userid: "",
    email: "",
    pwd1: "",
    pwd2: "",
    edu: "",
    gender: "",
    interest: [],
    comments: "",
  });
  const [Val, setVal] = useState(initVal.current);

  //value vs defultValue
  //만약 실시간으로 바뀌는 값을 무조건 value props로 연결하고 onChange이벤트 연결
  //바뀌지 않는 정적인 값을 연결시에는 defaultValue props로 연결하고 onChange 이벤트 연결 불필요

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...Val, [name]: value });
  };

  const handleCheck = (e) => {
    const { name } = e.target;
    let checkArr = [];
    const inputs = e.target.parentElement.querySelectorAll("input");

    inputs.forEach((input) => input.checked && checkArr.push(input.value));
    setVal({ ...Val, [name]: checkArr });
  };

  useEffect(() => {
    console.log(Val);
  }, [Val]);

  return (
    <Layout title={"Members"}>
      <div className="wrap">
        <div className="infoBox">
          <h2>Join Members</h2>
        </div>
        <div className="formBox">
          <form>
            <fieldset>
              <legend className="h">회원가입 폼</legend>
              <table>
                <tbody>
                  {/* userid, email (handleChange) */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="userid"
                        placeholder="User ID"
                        value={Val.userid}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={Val.email}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* pwd1, pwd2 (handleChange) */}
                  <tr>
                    <td>
                      <input
                        type="password"
                        name="pwd1"
                        placeholder="Password"
                        value={Val.pwd1}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="pwd2"
                        placeholder="Re-Password"
                        value={Val.pwd2}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* edu (handleChange) */}
                  <tr>
                    <td colSpan="2">
                      <select name="edu" onChange={handleChange}>
                        <option defaultValue="">Education</option>
                        <option defaultValue="elementary-school">
                          초등학교 졸업
                        </option>
                        <option defaultValue="middle-school">
                          중학교 졸업
                        </option>
                        <option defaultValue="high-school">
                          고등학교 졸업
                        </option>
                        <option defaultValue="college">대학교 졸업</option>
                      </select>
                    </td>
                  </tr>

                  {/* gender (handleChange) */}
                  <tr>
                    <td colSpan="2">
                      <input
                        type="radio"
                        defaultValue="female"
                        id="female"
                        name="gender"
                        onChange={handleChange}
                      />
                      <label htmlFor="female">Female</label>

                      <input
                        type="radio"
                        defaultValue="male"
                        id="male"
                        name="gender"
                        onChange={handleChange}
                      />
                      <label htmlFor="male">Male</label>
                    </td>
                  </tr>

                  {/* interests (handleCheck) */}
                  <tr>
                    <td colSpan="2">
                      <input
                        type="checkbox"
                        name="interest"
                        id="sports"
                        defaultValue="sports"
                        onChange={handleCheck}
                      />
                      <label htmlFor="sports">Sports</label>

                      <input
                        type="checkbox"
                        name="interest"
                        id="reading"
                        defaultValue="reading"
                        onChange={handleCheck}
                      />
                      <label htmlFor="reading">Reading</label>

                      <input
                        type="checkbox"
                        name="interest"
                        id="music"
                        defaultValue="music"
                        onChange={handleCheck}
                      />
                      <label htmlFor="music">Music</label>

                      <input
                        type="checkbox"
                        name="interest"
                        id="game"
                        defaultValue="game"
                        onChange={handleCheck}
                      />
                      <label htmlFor="game">Game</label>
                    </td>
                  </tr>

                  {/* comments (handleChange) */}
                  <tr>
                    <td colSpan="2">
                      <textarea
                        name="comments"
                        cols="30"
                        rows="5"
                        placeholder="Leave a comment"
                        value={Val.comments}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button>cancel</button>
                      <button>submit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  );
}
