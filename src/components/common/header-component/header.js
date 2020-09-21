import React, { useState, Fragment } from "react"
import logo from "../../../assets/images/endless-logo.png"
import Language from "./language"
import UserMenu from "./userMenu"
// import Notification from "./notification"
// import SearchHeader from "./searchHeader"
import { Link, useHistory } from "react-router-dom"
import "../../../assets/css/layout.css"
import Cookie from "js-cookie"
import { message } from "antd"

import {
  AlignLeft,
  Maximize,
  Bell,
  MessageCircle,
  MoreHorizontal,
  LogOut
} from "react-feather"

const Header = () => {
  const history = useHistory()
  const logOut = () => {
    Cookie.remove("token")

    history.push(`/`)
    message.success("성공적으로 로그아웃되셨습니다")
  }
  const [sidebar, setSidebar] = useState(false)
  const [rightSidebar, setRightSidebar] = useState(true)
  const [headerbar, setHeaderbar] = useState(true)

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.remove("open")
      document.querySelector(".page-sidebar").classList.remove("open")
    } else {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.add("open")
      document.querySelector(".page-sidebar").classList.add("open")
    }
  }

  function showRightSidebar() {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.add("show")
    } else {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.remove("show")
    }
  }

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  return (
    <Fragment>
      <div className="page-main-header">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to="/dashboard/default">
                <img className="img-fluid" src={logo} alt="" />
              </Link>
            </div>
          </div>
          {/* 헤더 시작 */}
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <a href="javascript" onClick={() => openCloseSidebar()} />
              </label>
            </div>
          </div>

          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? "" : "open"}`}>
              <li className="onhover-dropdown">
                <a className="txt-dark" href="#javascript">
                  {/* <h6>EN</h6> */}
                </a>
                <Language />
              </li>
              <li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <a onClick={logOut} href="#!">
                    <LogOut />
                  </a>
                  <a herf="#" onClick={logOut}>
                    LogOut
                  </a>
                </div>
              </li>
            </ul>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => setHeaderbar(!headerbar)}
            >
              <MoreHorizontal />
            </div>
          </div>
          {/* 헤더끝*/}
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">
              <div className="ProfileCard-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-airplay m-0"
                >
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                  <polygon points="12 15 17 21 7 21 12 15" />
                </svg>
              </div>
              <div className="ProfileCard-details">
                <div className="ProfileCard-realName" />
              </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template">
            <div className="EmptyMessage">
              Your search turned up 0 results. This most likely means the
              backend is down, yikes!
            </div>
          </script>
        </div>
      </div>
    </Fragment>
  )
}
export default Header
