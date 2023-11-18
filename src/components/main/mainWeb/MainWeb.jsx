import React from "react";
import Visual from "../visual/Visual";
import News from "../news/News";
import Banner from "../banner/Banner";
import Info from "../info/Info";
import Btns from "../btns/Btns";

export default function MainWeb() {
  return (
    <main>
      <Btns />
      <Visual />
      <News />
      <Banner />
      <Info />
    </main>
  );
}
