import Test from "./test";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import Banner from "./components/main/banner/Banner";
import Info from "./components/main/info/Info";
import MainWeb from "./components/main/mainWeb/MainWeb";
import News from "./components/main/news/News";
import Visual from "./components/main/visual/Visual";
import Community from "./components/sub/community/Community";
import Contact from "./components/sub/contact/Contact";
import Department from "./components/sub/department/Department";
import Gallery from "./components/sub/gallery/Gallery";
import Members from "./components/sub/members/Members";
import Detail from "./components/sub/youtube/Detail";
import Youtube from "./components/sub/youtube/Youtube";
import { useMedia } from "./hooks/useMedia";
import "./styles/Global.scss";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <main className={useMedia({ tablet: 800 })}>
      <Test />
      {/* visual은 main 라우트에만 보여야 하니 /일 때만 보여야함. 그러나 path='/'만 적혀있다면 모든 /가 붙는 경로에 다 보이게 됨. 그러므로 exact 라는 걸 포함해주면 다른 페이지에서 보이지 않음. */}
      {/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될 때 처음 연결라우터만 호출하고 나머지는 무시 */}
      <Switch>
        <Route exact path="/">
          <Header isMain={true} />
          <MainWeb />
        </Route>
        <Route path="/">
          <Header isMain={false} />
        </Route>
      </Switch>
      <Route path="/department" component={Department} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />
      {/* 특정 URL 라우터 설정 시 유튜브의 고유 아이디 값을 params로 전달 */}
      <Route path="/detail/:id" component={Detail} />
      <Route path="/community" component={Community} />
      <Footer />
    </main>
  );
}

export default App;
