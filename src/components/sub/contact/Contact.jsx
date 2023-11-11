import { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const { kakao } = window;
  const refMapContainer = useRef(null);
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

  const mapOption = {
    center: new kakao.maps.LatLng(37.51205098440375, 127.05875950015063),
    level: 3,
  };

  // 마커 이미지 인스턴스를 생성하기 위한 정보값들
  const imgSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
  const imgSize = new kakao.maps.Size(232, 99);
  const imgPos = { offset: new kakao.maps.Point(116, 99) };
  const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
  const markerPosition = mapOption.center;
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });
  useEffect(() => {
    const map = new kakao.maps.Map(refMapContainer.current, mapOption);

    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Contact Us"}>
      <article id="map" ref={refMapContainer}></article>
    </Layout>
  );
}
