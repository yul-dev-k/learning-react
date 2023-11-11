import { useRef, useEffect, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  // JSX 컴포넌트에서는 cdn을 통해서 window 전역 객체에 받아지는 kakao 객체에 자동 접근이 안되니
  // 비구조할당으로 직접 해당 객체 추출
  // cdn은 외부에서 데이트를 받아와 window에 전역 객체를 받아옴으로
  const { kakao } = window;
  // api를 적용할 요소도 가상돔이기 때문에 참조 객체에 연결
  const refMapContainer = useRef(null);
  const mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  useEffect(() => {
    // 인스턴스 복사는 컴포넌트 마운트시 처리
    const map = new kakao.maps.Map(refMapContainer.current, mapOption);

    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
    });
  }, []);

  return (
    <Layout title={"Contact Us"}>
      <article id="map" ref={refMapContainer}></article>
    </Layout>
  );
}
