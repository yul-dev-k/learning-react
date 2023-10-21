import Layout from "../../common/layout/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Youtube() {
  const [Vids, setVids] = useState([]);

  useEffect(() => {
    const api_key = "AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w";
    const pid = "PLYOPkdUKSFgWqafuDQN9di3uLJoTV3L3W";
    const num = 10;
    const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
    fetch(baseURL)
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
