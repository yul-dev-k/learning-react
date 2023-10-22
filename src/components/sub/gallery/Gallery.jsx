import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import Masonry from "react-masonry-component";
import { useState, useEffect } from "react";

/* 
  리액트 컴포넌트에 massorny ul 적용 방법
  1. npm i react-masonry-component
  2. 기존의 레이아웃을 float 형태로 배치 (사이간격을 주고 싶을 때는 padding 값 사용)
  3. 각 카드 컴포넌트를 import된 Massorny 컴포넌트로 wrapping
  4. Massorny 컴포넌트 옵션값 설정
*/

export default function Gallery() {
  const [Pics, setPics] = useState([]);
  const myID = "199380619@N02";

  const fetchFlicker = async (opt) => {
    const baseURL =
      "https://www.flickr.com/services/rest/?format=json&nojsoncallback=1";
    const key = process.env.REACT_APP_FLICKER_KEY;

    const method_interest = "flickr.interestingness.getList";
    const method_user = "flickr.people.getPhotos";
    const num = 40;
    let url = "";
    const url_interset = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
    const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
    opt.type === "user" && (url = url_user);
    opt.type === "interest" && (url = url_interset);
    const data = await fetch(url);
    const json = await data.json();
    setPics(json.photos.photo);
  };

  useEffect(() => {
    fetchFlicker({ type: "user", id: myID });
  }, []);

  return (
    <Layout title={"Gallery"}>
      <article className="controls">
        <nav className="btnSet">
          <button onClick={() => fetchFlicker({ type: "interest" })}>
            Interest Gallery
          </button>
          <button onClick={() => fetchFlicker({ type: "user", id: myID })}>
            My Gallery
          </button>
        </nav>
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
                  <span
                    onClick={
                      (e) =>
                        fetchFlicker({ type: "user", id: e.target.innerText })
                      // console.log(e.target.innerText)
                    }
                  >
                    {pic.owner}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Masonry>
      </div>
    </Layout>
  );
}
