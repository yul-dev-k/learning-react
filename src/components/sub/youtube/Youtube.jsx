import { useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import { useFetch } from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Youtube() {
  const [Vids, setVids] = useState([]);
  const fetchData = useFetch();
  console.log(Vids);

  useEffect(() => {
    const api_key = "AIzaSyAOEJx8xulXWN-r1P2H4abEsM18Vc8r1EI";
    const pid = "PL0ggp_5dyucDupa2ANtMUuDuURatz4Y70";
    const num = 10;
    const baseUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
    // fetchData(baseUrl, setVids);
    fetch(baseUrl)
      .then((data) => data.json())
      .then((json) => setVids(json.items));
  }, []);
  return (
    <Layout title={"Youtube"}>
      {Vids.map((data, idx) => {
        return (
          <article key={idx}>
            <h2>{data.snippet.title}</h2>
            <p>{data.snippet.description}</p>
            <div className="pic">
              {/* 섬네일 링크 클릭 시 url로 detail/고유 유튜브데이터 id */}
              <Link to={`/detail/${data.id}`}>
                <img
                  src={data.snippet.thumbnails.standard.url}
                  alt={data.snippet.title}
                />
              </Link>
            </div>
          </article>
        );
      })}
    </Layout>
  );
}
