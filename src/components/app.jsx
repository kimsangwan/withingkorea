import React from "react"
import Header from "./common/header-component/header"
import Sidebar from "./common/sidebar-component/sidebar"
import RightSidebar from "./common/right-sidebar"
import Footer from "./common/footer"
import ThemeCustomizer from "./common/theme-customizer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "./common/loader"
import Cookie from "js-cookie"

const AppLayout = ({ children, history }) => {
  return (
    <div>
      <Loader />
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <Header />
          {Cookie.get("token") ? <Sidebar /> : ""}

          <RightSidebar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AppLayout
