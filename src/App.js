import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import Visual from "./components/main/visual/Visual";
import Contact from "./components/sub/contact/Contact";
import Department from "./components/sub/department/Department";
import Gallery from "./components/sub/gallery/Gallery";
import Members from "./components/sub/members/Members";
import Youtube from "./components/sub/youtube/Youtube";
import "./styles/Global.scss";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      {/* visual은 main 라우트에만 보여야 하니 /일 때만 보여야함. 그러나 path='/'만 적혀있다면 모든 /가 붙는 경로에 다 보이게 됨. 그러므로 exact 라는 걸 포함해주면 다른 페이지에서 보이지 않음. */}
      <Route exact path="/" component={Visual} />
      <Route path="/department" component={Department} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />

      <Footer />
    </>
  );
}

export default App;
