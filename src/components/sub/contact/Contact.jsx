import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const { kakao } = window;
  const mapFrame = useRef(null);
  const viewFrame = useRef(null);
  const mapInstance = useRef(null);
  // 공식 문서에 const form = useRef(); 이렇게 ref에 비어있는데 null을 넣어준이유
  // 빈값이 변수에 할당 되있으면 메모리를 많이 잡아먹기 때문
  // 가비지컬렉터가 언제 실행될지 모르니 메모리 누수를 줄이기 위해서
  const form = useRef(null);
  const [Index, setIndex] = useState(0);
  const [Traffic, setTraffic] = useState(false);
  const [View, setView] = useState(true);

  const info = useRef([
    {
      title: "삼성역 코엑스",
      latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "넥슨 본사",
      latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "서울 시청",
      latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ]);

  const marker = new kakao.maps.Marker({
    position: info.current[Index].latlng,
    image: new kakao.maps.MarkerImage(
      info.current[Index].imgSrc,
      info.current[Index].imgSize,
      info.current[Index].imgPos
    ),
  });

  const roadView = () => {
    // 로드뷰 인스턴스
    // 두 번째 인수값은 마커 위치로부터 로드뷰가 출력될 수 있는 가장 가까운 거리의 범위 지정
    new kakao.maps.RoadviewClient().getNearestPanoId(
      info.current[Index].latlng,
      50,
      (panoId) => {
        new kakao.maps.Roadview(viewFrame.current).setPanoId(
          panoId,
          info.current[Index].latlng
        ); //panoId와 중심좌표를 통해 로드뷰 실행
      }
    );
  };

  const setCenter = () => {
    mapInstance.current.setCenter(info.current[Index].latlng);
    roadView();
  };

  useEffect(() => {
    mapFrame.current.innerHTML = "";

    // 지도 인스턴스 생성해서 지도화면 렌더링
    mapInstance.current = new kakao.maps.Map(mapFrame.current, {
      center: info.current[Index].latlng,
    });
    // 지도 인스턴스에 맵타입 인스턴스로 타입컨트롤러 추가
    mapInstance.current.addControl(
      new kakao.maps.MapTypeControl(),
      kakao.maps.ControlPosition.TOPRIGHT
    );
    // 지도 인스턴스에 줌타입 인스턴스로 줌컨트롤러 추가
    mapInstance.current.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );

    // 마커 인스턴스에 맵 인스턴스 결합해서 마커 추가
    marker.setMap(mapInstance.current);
    mapInstance.current.setZoomable(false);

    roadView();

    setTraffic(false);

    window.addEventListener("resize", setCenter);
  }, [Index]);

  // 교통 정보 보기 토글 기능
  useEffect(() => {
    Traffic
      ? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
      : mapInstance.current.removeOverlayMapTypeId(
          kakao.maps.MapTypeId.TRAFFIC
        );
  }, [Traffic]);

  useEffect(() => {
    return () => window.removeEventListener("resize", setCenter);
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `service_ayc9mr9`,
        `template_okw27bi`,
        form.current,
        `vwyqr5YXGzW4D1nVr`
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Layout title={"Contact us"}>
      <div className="mailBox">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="from_name" />
          <label>Email</label>
          <input type="email" name="reply_to" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
      <div className="mapBox">
        <button onClick={() => setView(!View)}>
          {!View ? "지도뷰 보기" : "로드뷰 보기"}
        </button>
        <article id="map" ref={mapFrame} className={View ? "on" : ""}></article>
        <article
          id="view"
          ref={viewFrame}
          className={!View ? "on" : ""}
        ></article>

        <ul className="branch">
          {info.current.map((data, idx) => (
            <li
              key={idx}
              className={idx === Index ? "on" : ""}
              onClick={() => setIndex(idx)}
            >
              {data.title}
            </li>
          ))}
        </ul>

        <button onClick={setCenter}>위치 초기화</button>
        {View && (
          <button onClick={() => setTraffic(!Traffic)}>
            {Traffic ? "교통 정보 끄기" : "교통 정보 보기"}
          </button>
        )}
      </div>
    </Layout>
  );
}
