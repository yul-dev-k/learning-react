import Layout from "../../common/layout/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Youtube.scss";

export default function Youtube() {
  const [Vids, setVids] = useState([]);

  const fetchYoute = async () => {
    const api_key = process.env.REACT_APP_YOUTUBE_KEY;
    const pid = process.env.REACT_APP_PLAYLIST;
    const num = 10;
    const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

    const data = await fetch(baseURL);
    const json = await data.json();
    setVids(json.items);
  };

  useEffect(() => {
    fetchYoute();
  }, []);

  return (
    <Layout title={"Youtube"}>
      {Vids.map((data, idx) => {
        const title = data.snippet.title;
        const desc = data.snippet.description;
        const [date, time] = data.snippet.publishedAt.split("T");
        return (
          <article key={idx}>
            <h2>{title}</h2>
            <div className="txt">
              <p>{desc.length > 250 ? desc.substr(0, 250) + "..." : desc}</p>
              <div className="info">
                <span>{date.split("-").join(".")}</span>
                <em>{time.split("Z")[0]}</em>
              </div>
            </div>
            <div className="pic">
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
