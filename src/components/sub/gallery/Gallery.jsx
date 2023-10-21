import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [Pics, setPics] = useState([]);
  console.log(Pics);

  const fetchFlicker = async () => {
    const baseURL =
      "https://www.flickr.com/services/rest/?format=json&nojsoncallback=1";
    const key = "2a1a0aebb34012a99c23e13b49175343";
    const method_interest = "flickr.interestingness.getList";
    const num = 40;
    const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
    const data = await fetch(url);
    const json = await data.json();
    setPics(json.photos.photo);
  };

  useEffect(() => {
    fetchFlicker();
  }, []);

  return (
    <Layout title={"Gallery"}>
      <div className="frame">
        {Pics.map((pic, idx) => (
          <article key={idx}>
            <div className="pic">
              <img
                src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
                alt={pic.title}
              />
            </div>
            <h2>{pic.title}</h2>
          </article>
        ))}
      </div>
    </Layout>
  );
}
