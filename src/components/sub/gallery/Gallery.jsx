import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import Masonry from "react-masonry-component";
import { useState, useEffect, useRef } from "react";
import { LuSearch } from "react-icons/lu";
import Modal from "../../common/modal/Modal";

/* 
  리액트 컴포넌트에 massorny ul 적용 방법
  1. npm i react-masonry-component
  2. 기존의 레이아웃을 float 형태로 배치 (사이간격을 주고 싶을 때는 padding 값 사용)
  3. 각 카드 컴포넌트를 import된 Massorny 컴포넌트로 wrapping
  4. Massorny 컴포넌트 옵션값 설정
*/

export default function Gallery() {
  const myID = "199380619@N02";
  const [Pics, setPics] = useState([]);
  // IsUser의 초기 값을 내 아이디 문자값을 등록
  let [IsUser, setIsUser] = useState(myID);
  let [CurrentType, setCurrentType] = useState("mine");
  let [IsOpen, setIsOpen] = useState(true);
  const refElBtnSet = useRef(null); // 가상돔인 버튼 태그 셀럭터로 가져오기 위한 ref (DOM 요소 가져오는 Ref = refEl)
  const refElInput = useRef(null);

  const fetchFlicker = async (opt) => {
    console.log("fetching");
    const baseURL =
      "https://www.flickr.com/services/rest/?format=json&nojsoncallback=1";
    const key = process.env.REACT_APP_FLICKER_KEY;

    const method_interest = "flickr.interestingness.getList";
    const method_user = "flickr.people.getPhotos";
    const method_search = "flickr.photos.search";

    const num = 40;
    let url = "";

    const url_interset = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
    const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
    const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}`;

    opt.type === "user" && (url = url_user);
    opt.type === "interest" && (url = url_interset);
    opt.type === "search" && (url = url_search);

    const data = await fetch(url);
    const json = await data.json();
    if (json.photos.photo.length === 0) {
      const [btnInterest, btnMine] =
        refElBtnSet.current.querySelectorAll("button");
      CurrentType === "interest" && btnInterest.classList.add("on");
      CurrentType === "mine" && btnMine.classList.add("on");
      return alert("해당 검색어의 결과값이 없습니다.");
    }
    setPics(json.photos.photo);
  };

  const activateBtn = (e) => {
    const btns = refElBtnSet.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    if (e.target.nodeName === "BUTTON") e.target.classList.add("on");
  };

  const handleClickInterest = (e) => {
    //e는 SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button, …} 이다. 태그의 target을 전달하기 위해 e 이벤트를 전달해줌
    if (e.target.classList.contains("on")) return; // 클릭한 버튼에 on class가 있다면 지속적인 fetching 함수가 호출되지 않게함.
    setIsUser(""); // IsUser 값을 빈문자열 처리 (falsy)
    activateBtn(e);
    fetchFlicker({ type: "interest" });
    setCurrentType("interest");
  };

  const handleClickMine = (e) => {
    // 마이 갤러리 함수 호출시에는 IsUser의 문자값이 담겨있더라도 내 아이디 값이랑 똑같지 않으면 핸들러 호출함
    // 다른 사용자 갤러리르 갔다가 My Gallery 함수 호출시 이미 IsUser 값이 담겨있기 때문에 해당 함수가 호출되지 않는 문제 해결 위함
    if (e.target.classList.contains("on") || IsUser === myID) return;
    setIsUser(myID);
    activateBtn(e);
    fetchFlicker({ type: "user", id: myID });
    setCurrentType("mine");
  };

  const handleClickUser = (e) => {
    // IsUser 값이 있기만 하면 핸들러 함수 호출 중지
    if (IsUser) return;
    setIsUser(e.target.innerText);
    activateBtn(e);
    fetchFlicker({ type: "user", id: e.target.innerText });
    setCurrentType("user");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = refElInput.current.value;
    refElInput.current.value = "";
    if (!tags.trim()) return; // JS에서 trim은 양 옆에 공란 문자열을 없애주는 역할을 해서 스페이스바만 해서 들어온 input을 막아줌
    setIsUser("");
    activateBtn(e);
    fetchFlicker({ type: "search", keyword: tags });
    setCurrentType("search");
  };

  useEffect(() => {
    fetchFlicker({ type: "user", id: myID });
  }, []);

  return (
    <>
      <Layout title={"Gallery"}>
        <article className="controls">
          <nav className="btnSet" ref={refElBtnSet}>
            <button onClick={handleClickInterest}>Interest Gallery</button>
            <button className="on" onClick={handleClickMine}>
              My Gallery
            </button>
          </nav>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" ref={refElInput} />
            <button className="btnSearch">
              <LuSearch fontSize={20} color={"#bbb"} />
            </button>
          </form>
        </article>
        <div className="frame">
          <Masonry
            elementType={"div"}
            options={{ transitionDuration: "0.5" }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {Pics.map((pic, idx) => (
              <article key={idx}>
                <div className="inner">
                  <div className="pic">
                    <img
                      src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                      alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
                    />
                  </div>
                  <h2>{pic.title}</h2>

                  <div className="profile">
                    <img
                      src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
                      alt={pic.owner}
                      onError={(e) => {
                        e.target.setAttribute(
                          "src",
                          "https://www.flickr.com/images/buddyicon.gif"
                        ); // profile 이미지가 없어서 엑박이 뜰 때 대체 이미지를 넣는 방법
                      }}
                    />
                    <span onClick={handleClickUser}>{pic.owner}</span>
                  </div>
                </div>
              </article>
            ))}
          </Masonry>
        </div>
      </Layout>
      {/* 모달 호출 시 출력 유무를 결정하는 state 값과 state 변경함수를 모달의 props로 전달 - 이유: 모달이 열고 닫는 거를 부모가 아닌 자식 컴포넌트에서 결정하게 하기 위함 */}
      <Modal IsOpen={IsOpen} setIsOpen={setIsOpen}></Modal>
    </>
  );
}
