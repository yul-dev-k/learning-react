import "./News.scss";
import { useState, useRef, useEffect } from "react";

function News() {
  const dummyData = useRef([
    {
      title: "title5",
      content: "content5",
      date: '"2023-11-05T12:35:39.686Z"',
    },
    {
      title: "title4",
      content: "content4",
      date: '"2023-11-04T12:35:39.686Z"',
    },
    {
      title: "title3",
      content: "content3",
      date: '"2023-11-03T12:35:39.686Z"',
    },
    {
      title: "title2",
      content: "content2",
      date: '"2023-11-02T12:35:39.686Z"',
    },
    {
      title: "title1",
      content: "content1",
      date: '"2023-11-01T12:35:39.686Z"',
    },
  ]);
  const getLocalData = () => {
    const data = localStorage.getItem("posts");
    if (data) return JSON.parse(data);
    else return dummyData.current;
  };

  const [News] = useState(getLocalData());

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(News));
  }, [News]);

  return (
    <section className="news">
      {News.map((post, idx) => {
        if (idx >= 5) return null;
        return <h2 key={idx}>{post.title}</h2>;
      })}
    </section>
  );
}

export default News;
