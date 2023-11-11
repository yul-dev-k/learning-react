import { useRef, useEffect } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const { kakao } = window;
  const mapFrame = useRef(null);

  const info = [
    {
      latlng: new kakao.maps.LatLng(37.51272797391666, 127.06076771220832),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ];

  const marker = new kakao.maps.Marker({
    position: info[0].latlang,
    image: new kakao.maps.MarkerImage(
      info[0].imgSrc,
      info[0].imgSize,
      info[0].imgPos
    ),
  });

  useEffect(() => {
    const map = new kakao.maps.Map(mapFrame.current, {
      center: info[0].latlng,
    });
    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Contact us"}>
      <article id="map" ref={mapFrame}></article>
    </Layout>
  );
}
