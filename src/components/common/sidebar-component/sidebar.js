import React, { Fragment, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import logo from "../../../assets/images/endless-logo.png"
import logo_compact from "../../../assets/images/logo/compact-logo.png"

import UserPanel from "./userPanel"
import { MENUITEMS } from "../../../constant/menu"
import { Link } from "react-router-dom"
import { translate } from "react-switch-lang"
import configDB from "../../../data/customizer/config"
import { LogOut } from "react-feather"

const Sidebar = props => {
  const [margin, setMargin] = useState(0)
  const [width, setWidth] = useState(0)
  const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true)
  const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true)
  const [hideRightArrow, setHideRightArrow] = useState(true)
  const [hideLeftArrow, setHideLeftArrow] = useState(true)
  const [mainmenu, setMainMenu] = useState(MENUITEMS)
  const wrapper = configDB.data.settings.sidebar.wrapper
  const layout = useSelector(content => content.Customizer.layout)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()

    var currentUrl = window.location.pathname

    // eslint-disable-next-line
    mainmenu.filter(items => {
      if (items.path === currentUrl) setNavActive(items)
      if (!items.children) return false
      // eslint-disable-next-line
      items.children.filter(subItems => {
        if (subItems.path === currentUrl) setNavActive(subItems)
        if (!subItems.children) return false
        // eslint-disable-next-line
        subItems.children.filter(subSubItems => {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems)
        })
      })
    })

    setTimeout(() => {
      const elmnt = document.getElementById("myDIV")
      const menuWidth = elmnt.offsetWidth
      // setMenuWidth(menuWidth)
      if (menuWidth > window.innerWidth) {
        setHideRightArrow(false)
        setHideLeftArrowRTL(false)
      } else {
        setHideRightArrow(true)
        setHideLeftArrowRTL(true)
      }
    }, 500)

    return () => {
      // eslint-disable-next-line
      window.addEventListener("resize", handleResize)
    }
    // eslint-disable-next-line
  }, [])

  const handleResize = () => {
    setWidth(window.innerWidth - 310)
  }

  const setNavActive = item => {
    // eslint-disable-next-line
    MENUITEMS.filter(menuItem => {
      // eslint-disable-next-line
      if (menuItem != item) menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        // eslint-disable-next-line
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  // Click Toggle menu
  const toggletNavActive = item => {
    if (!item.active) {
      MENUITEMS.forEach(a => {
        if (MENUITEMS.includes(item)) a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
          if (!b.children) return false
          b.children.forEach(c => {
            if (b.children.includes(item)) {
              c.active = false
            }
          })
        })
      })
    }
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const scrollToRight = () => {
    const elmnt = document.getElementById("myDIV")
    const menuWidth = elmnt.offsetWidth
    const temp = menuWidth + margin
    if (temp < menuWidth) {
      setMargin(-temp)
      setHideRightArrow(true)
    } else {
      setMargin(margin => (margin += -width))
      setHideLeftArrow(false)
    }
  }

  const scrollToLeft = () => {
    // If Margin is reach between screen resolution
    if (margin >= -width) {
      setMargin(0)
      setHideLeftArrow(true)
    } else {
      setMargin(margin => (margin += width))
      setHideRightArrow(false)
    }
  }

  const scrollToLeftRTL = () => {
    if (margin <= -width) {
      setMargin(margin => (margin += -width))
      setHideLeftArrowRTL(true)
    } else {
      setMargin(margin => (margin += -width))
      setHideRightArrowRTL(false)
    }
  }

  const scrollToRightRTL = () => {
    const temp = width + margin
    // Checking condition for remaing margin
    if (temp === 0) {
      setMargin(temp)
      setHideRightArrowRTL(true)
    } else {
      setMargin(margin => (margin += width))
      setHideRightArrowRTL(false)
      setHideLeftArrowRTL(false)
    }
  }

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper compactLogo">
            <Link to="/userlist">
              {/* <img className="blur-up lazyloaded" src={logo} alt="" />
              <img className="blur-up lazyloaded" src={''} alt="" /> */}
              <img className="blur-up lazyloaded" src={""} alt="" />
              <img
                style={{ width: "230px", height: "50px", margin: "-5%" }}
                className="blur-up lazyloaded"
                src="https://ps-service-the-build.s3.ap-northeast-2.amazonaws.com/res/gf_2020_09_16_16_49_06_801_440.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          {/* <UserPanel /> */}
          <ul
            className="sidebar-menu"
            id="myDIV"
            style={
              wrapper === "horizontal_sidebar"
                ? layout === "rtl"
                  ? { marginRight: margin + "px" }
                  : { marginLeft: margin + "px" }
                : { margin: "0px" }
            }
          >
            <li
              className={`left-arrow ${
                layout === "rtl"
                  ? hideLeftArrowRTL
                    ? "d-none"
                    : ""
                  : hideLeftArrow
                  ? "d-none"
                  : ""
              }`}
              onClick={
                wrapper === "horizontal_sidebar" && layout === "rtl"
                  ? scrollToLeftRTL
                  : scrollToLeft
              }
            >
              <i className="fa fa-angle-left" />
            </li>
            {MENUITEMS.map((menuItem, i) => (
              <li className={`${menuItem.active ? "active" : ""}`} key={i}>
                {menuItem.sidebartitle ? (
                  <div className="sidebar-title">{menuItem.sidebartitle}</div>
                ) : (
                  ""
                )}
                {menuItem.type === "sub" ? (
                  <a
                    className="sidebar-header"
                    href="#javascript"
                    onClick={() => toggletNavActive(menuItem)}
                  >
                    <menuItem.icon />
                    <span>{props.t(menuItem.title)}</span>
                    <i className="fa fa-angle-right pull-right" />
                  </a>
                ) : (
                  ""
                )}
                {menuItem.type === "link" ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}${menuItem.path}`}
                    className={`sidebar-header ${
                      menuItem.active ? "active" : ""
                    }`}
                    onClick={() => toggletNavActive(menuItem)}
                  >
                    <menuItem.icon />
                    <span>{props.t(menuItem.title)}</span>
                    {menuItem.children ? (
                      <i className="fa fa-angle-right pull-right" />
                    ) : (
                      ""
                    )}
                  </Link>
                ) : (
                  ""
                )}
                {menuItem.children ? (
                  <ul
                    className={`sidebar-submenu ${
                      menuItem.active ? "menu-open" : ""
                    }`}
                    style={
                      menuItem.active
                        ? { opacity: 1, transition: "opacity 500ms ease-in" }
                        : {}
                    }
                  >
                    {menuItem.children.map((childrenItem, index) => (
                      <li
                        key={index}
                        className={
                          childrenItem.children
                            ? childrenItem.active
                              ? "active"
                              : ""
                            : ""
                        }
                      >
                        {childrenItem.type === "sub" ? (
                          <a
                            href="#javascript"
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {props.t(childrenItem.title)}{" "}
                            <a className="fa fa-angle-right pull-right" />
                          </a>
                        ) : (
                          ""
                        )}

                        {childrenItem.type === "link" ? (
                          <Link
                            to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                            className={childrenItem.active ? "active" : ""}
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {props.t(childrenItem.title)}{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                        {childrenItem.children ? (
                          <ul
                            className={`sidebar-submenu ${
                              childrenItem.active ? "menu-open" : "active"
                            }`}
                          >
                            {childrenItem.children.map(
                              (childrenSubItem, key) => (
                                <li
                                  className={
                                    childrenSubItem.active ? "active" : ""
                                  }
                                  key={key}
                                >
                                  {childrenSubItem.type === "link" ? (
                                    <Link
                                      to={`${process.env.PUBLIC_URL}${
                                        childrenSubItem.path
                                      }`}
                                      className={
                                        childrenSubItem.active ? "active" : ""
                                      }
                                      onClick={() =>
                                        toggletNavActive(childrenSubItem)
                                      }
                                    >
                                      {props.t(childrenSubItem.title)}
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
            <li
              className={`right-arrow ${
                layout === "rtl"
                  ? hideRightArrowRTL
                    ? "d-none"
                    : ""
                  : hideRightArrow
                  ? "d-none"
                  : ""
              }`}
              onClick={
                wrapper === "horizontal_sidebar" && layout === "rtl"
                  ? scrollToRightRTL
                  : scrollToRight
              }
            >
              ~ <i className="fa fa-angle-right" />
            </li>
            <Link to="/">
              {/* <img className="blur-up lazyloaded" src={logo} alt="" />
              <img className="blur-up lazyloaded" src={''} alt="" /> */}

              {/* <img className="blur-up lazyloaded" src={LogOut} alt="" /> */}
              <i class="fas fa-sign-out-alt" />
            </Link>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default translate(Sidebar)
