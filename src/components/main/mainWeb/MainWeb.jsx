import React from "react";
import Visual from "../visual/Visual";
import News from "../news/News";
import Banner from "../banner/Banner";
import Info from "../info/Info";

export default function MainWeb() {
  return (
    <main>
      <Visual />
      <News />
      <Banner />
      <Info />
    </main>
  );
}
