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
  // 위치값 정밀하게 보정하는 법
  // 기존 구글지도 위치값 복사 뒤 카카오예제의 클릭한 위치 마커 표시 직접해보기
  // 해당 코드 붙여넣기하고 원하는 지점을 찍으면아래와 같이 정밀한 수치값을 확인 가능
  // https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
  const mapOption = {
    center: new kakao.maps.LatLng(37.51205098440375, 127.05875950015063),
    level: 3,
  };
  // 인스턴스가 실행되는게 아니니 마운트와 관계가 없음.
  const marker = new kakao.maps.Marker({
    position: mapOption.center,
  });

  useEffect(() => {
    // 인스턴스 복사는 컴포넌트 마운트시 처리
    const map = new kakao.maps.Map(refMapContainer.current, mapOption);

    // 인스턴스가 실행되어야 하는거니, 마운트 이후에 실행 및 렌더 되어야함.
    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Contact Us"}>
      <article id="map" ref={refMapContainer}></article>
    </Layout>
  );
}
