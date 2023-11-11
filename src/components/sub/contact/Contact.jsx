import { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const { kakao } = window;
  const refMapContainer = useRef(null);

  const mapOption = {
    center: new kakao.maps.LatLng(37.51205098440375, 127.05875950015063),
    level: 3,
  };

  // 마커 이미지 인스턴스를 생성하기 위한 정보값들
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
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
