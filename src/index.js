import React, { Fragment, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"
import "./index.scss"

import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom"
import { ScrollContext } from "react-router-scroll-4"
import * as serviceWorker from "./serviceWorker"

// ** Import custom components for redux**
import { Provider } from "react-redux"
import store from "./store/index"
import App from "./components/app"

// Import custom Components

// import Default from "./components/dashboard/defaultCompo/default"
// import Ecommerce from "./components/dashboard/ecommerce"
// import University from "./components/dashboard/university"
// import CryptoComponent from "../src/components/dashboard/crypto/crypto-component"
// import Project from "./components/dashboard/project/project"

// sample page
// import Samplepage from "./components/sample/samplepage"
import SupportTicket from "./components/support-ticket/supportTicket"
import signin from "./auth/signin"
import BennerList from "./benner/BennerList"
import AddBenner from "./benner/AddBenner"
import BeneerUpdate from "./benner/BennerUpdate"
import Hashtag from "./hashhag/Hashtag"
import Onedayture from "./onday_ture/Onedayture"
import RecommedOnedaycnt from "./recommendOneday/RcomendOneDay"
import RcomendOneDayUpdateEn from "./recommendOneday/RecommendOdyUpdateEn"
import RecommedOnedaycntZh from "./recommendOneday/RcomendOneDayZh"
import RecomendList from "./recommendOneday/RecommedList"
import RecommendGuide from "./recommendGuid/RecommendGuide"
import RecommendGuideZh from "./recommendGuid/RecommendGuideZh"

import RecommendGuideList from "./recommendGuid/RecommedGiudeList"
import UserList from "./User/UserList"
import Userdetail from "./User/Userdetail"
import Data from "./Data"
import GlobalProvider from "./provider/GlobalProvider"
import Guidelist from "./guide/GuideList"
import GuideDtail from "./guide/GuideDtail"
import GuideDtailAlive from "./guide/GuideDtailAlive"
import GuideGoodsList from "./GuideGoods/GuideGoodsList"
import GuideGoodsDitail from "./ Private_tuor/PrivateDitail_old"
import GuideGoodsDitailOK from "./GuideGoods/GuideGoodsDitailOK"
import PrivateGoodsList from "./ Private_tuor/PrivateGoodsList"
import PrivateDetall from "./ Private_tuor/PrivateDetail"
import PrivateGoodsDitailOK from "./ Private_tuor/PrivateGoodsDitailOK"
import GorpGoodsDitailOK from "./GorpTour/GorpGoodsDitailOK"
import DetaiFinal from "./GorpTour/DetaiFinal"
import GorpGoodsList from "./GorpTour/GorpGoodsList"
import AddKoreaNews from "./KoreaNews/AddKoreaNews"
import KoreaNewsUserList from "./KoreaNews/KoreaNewsUserList"
import NoticeListUser from "./Notice/NoticeListUser"
import AddNotiUser from "./Notice/AddNotiUser "
import NoticeListGuide from "./Notice/NoticeListGuide"
import AddnotiGuide from "./Notice/AddNotiGuide"
import PriceList from "./calculatelist/PriceList"
import OldPriceList from "./calculatelist/OldPriceList"
import NoWord from "./NOword/NoWord"
import PriceDitail from "./calculatelist/PriceDitail"
import RegulationList from "./Regulation/RegulationList"
import RegulationAdd from "./Regulation/ RegulationAdd"

import NotiUserUpDate from "./Notice/NotiUserUpdate"
import NotiGuideUpDate from "./Notice/NotGuideUpDate "
import TermList from "./Poramislst/TermList"
import TermUpdate from "./Poramislst/TermUpdate"
import RcomendGuideUpdateEn from "./recommendGuid/RecommendGuideUpdateEn"
import Detail from "./GuideGoods/GuidGoodDetail"
import Cookie from "js-cookie"
import auth from "./hoc/auth"
//firebase Auth
const Datacontext = React.createContext()
function Root(props) {
  useEffect(() => {
    const layout = localStorage.getItem("layout_version")
    document.body.classList.add(layout)
  }, [])
  const [dummyData, setDummyData] = React.useState(Data)
  const 데이터 = useContext(Datacontext)
  const [abc, setAbc] = React.useState(false)

  return (
    <div className="App">
      <GlobalProvider>
        <Provider store={store}>
          <BrowserRouter basename={"/"}>
            <ScrollContext>
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  component={signin}
                />
                {/* {!Cookie.get('token') ? } */}
                <Fragment>
                  <App>
                    {/* dashboard menu */}

                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/bennerlist`}
                      component={auth(BennerList)}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/banneradd`}
                      component={auth(AddBenner)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/banner/update/:id`}
                      component={auth(BeneerUpdate)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/hstg`}
                      component={auth(Hashtag)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/recommendlist`}
                      component={auth(RecomendList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/onedayture`}
                      component={auth(Onedayture)}
                    />
                    {/* 추천가이드 페이지*/}
                    <Route
                      path={`${process.env.PUBLIC_URL}/recommendguidelist`}
                      component={auth(RecommendGuideList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/recomend/guidecnt/en`}
                      component={auth(RecommendGuide)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/recomend/guidecnt/zh`}
                      component={auth(RecommendGuideZh)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/recomdoned/cnt/en`}
                      component={auth(RecommedOnedaycnt)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/recomdoned/cnt/zh`}
                      component={auth(RecommedOnedaycntZh)}
                    />
                    <Route
                      path={`${
                        process.env.PUBLIC_URL
                      }/recomdoned/onday/update/:id`}
                      component={auth(RcomendOneDayUpdateEn)}
                    />
                    {/* Pricing */}
                    <Route
                      path={`${
                        process.env.PUBLIC_URL
                      }/support-ticket/supportTicket`}
                      component={auth(SupportTicket)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/userlist`}
                      component={auth(UserList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/userdetails/:id`}
                      component={auth(Userdetail)}
                      데이터={데이터}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/guidelist`}
                      component={auth(Guidelist)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/guideditail/:id`}
                      component={auth(GuideDtail)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/guideditail/ok/:id`}
                      component={auth(GuideDtailAlive)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/guidgoodslist/`}
                      component={auth(GuideGoodsList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/guidegoods/ditail/:id`}
                      // component={GuideGoodsDitail}
                      component={auth(Detail)}
                    />
                    <Route
                      path={`${
                        process.env.PUBLIC_URL
                      }/guidegoods/ditail/ok/:id`}
                      component={auth(Detail)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/priviatgoodslist`}
                      component={auth(PrivateGoodsList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/priviat/ditail/:id`}
                      component={auth(PrivateDetall)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/priviat/ditailok/:id`}
                      component={auth(PrivateGoodsDitailOK)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/gorplist`}
                      component={auth(GorpGoodsList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/gorp/ditail/:id`}
                      component={auth(DetaiFinal)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/gorp/ditail/ok/:id`}
                      component={auth(GorpGoodsDitailOK)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/koreanewslist`}
                      component={auth(KoreaNewsUserList)}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/koreanewsadd`}
                      component={auth(AddKoreaNews)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/notice`}
                      component={auth(NoticeListUser)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/notice/update/:id`}
                      component={auth(NotiUserUpDate)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/notice/guide/update/:id`}
                      component={auth(NotiGuideUpDate)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/add/notice/user`}
                      component={auth(AddNotiUser)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/notice/guide`}
                      component={auth(NoticeListGuide)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/add/notice/guide`}
                      component={auth(AddnotiGuide)}
                    />

                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/pricelist`}
                      component={auth(PriceList)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/oldpricelist`}
                      component={auth(OldPriceList)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/noword`}
                      component={auth(NoWord)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/price/ditail/:id`}
                      component={auth(PriceDitail)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/regulationlist`}
                      component={auth(RegulationList)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/regulation/add/:id`}
                      component={auth(RegulationAdd)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/term/list`}
                      component={auth(TermList)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/term/update/:id`}
                      component={auth(TermUpdate)}
                    />
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/ex/ex`}
                      component={auth(GuideGoodsDitail)}
                    />
                    <Route
                      exact
                      path={`${
                        process.env.PUBLIC_URL
                      }/recomend/guide/update/:id`}
                      component={auth(RcomendGuideUpdateEn)}
                    />
                    {/* <Redirect path="*" to="/" /> */}
                  </App>
                </Fragment>
              </Switch>
            </ScrollContext>
          </BrowserRouter>
        </Provider>
      </GlobalProvider>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))

serviceWorker.unregister()
