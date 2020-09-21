import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav, TabContent } from "react-bootstrap"
import { message } from "antd"
import Breadcrumb from "../components/common/breadcrumb"

import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"

const GuideGoodsList = () => {
  const history = useHistory()
  let [tab, settab] = useState(0)

  return (
    <>
      <Breadcrumb title="가이드 상품관리 리스트" parent="가이드상품관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="card-body">
                  <div className="nav-sub">
                    <Nav
                      variant="tabs"
                      defaultActiveKey="link-0"
                      className="nav--sub2"
                    >
                      <div className="navtab">
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-0"
                            onClick={() => {
                              settab(0)
                            }}
                          >
                            승인 상태
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-1"
                            onClick={() => {
                              settab(1)
                            }}
                          >
                            판매 상태
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div />
                    </Nav>
                    <TabContent2 tab={tab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function TabContent2(props) {
  if (props.tab === 0) {
    return (
      <div>
        <GuideSome />
      </div>
    )
  } else if (props.tab === 1) {
    return (
      <div>
        {" "}
        <GuideOk />
      </div>
    )
  }
}

function GuideSome() {
  const [SearchText, setSerchText] = useState("")

  const [waitlsit, setWaitlsit] = useState({})

  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", SearchText)
    axios
      .post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        alert(" 리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", SearchText)

    axios
      .post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
          if (response.data.data.count <= 0) {
            message.warning("일치하는 가이드 상품이 없습니다")
          }
        } else {
          setWaitlsit([])
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("type", 1)
    form.append("search", SearchText)
    try {
      const { data } = await axios.post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setWaitlsit({
          lists: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }

    // 이전 다음 페이지를 위한 api호출
    // axios로 서버 통신
    // success시 nomalList 업데이트
  }

  return (
    <div>
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body" style={{ fontSize: "16px" }}>
              <div className="user-search-bar">
                <div className="search-input">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="가이드명으로 검색하세요"
                      onChange={e => setSerchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          onSearchHandler()
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="icon-search">
                  <i className="fa fa-search fa-2x" onClick={onSearchHandler} />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ width: "5%" }} />
                      <th scope="col" style={{ width: "5%" }}>
                        상태
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        작성일시
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        타입
                      </th>
                      <th scope="col" style={{ width: "50%" }}>
                        상품정보
                      </th>
                      <th scope="col" style={{ width: "2" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {waitlsit.lists &&
                      waitlsit.lists.map((lists, index) => {
                        return (
                          <tr>
                            <th
                              scope="row"
                              key={index}
                              style={{ textAlign: "left" }}
                            >
                              {index}
                            </th>
                            <td>{lists.status}</td>
                            <td>{lists.registered}</td>
                            <td> {lists.type}</td>
                            <td style={{ textAlign: "left" }}>
                              {" "}
                              <img
                                style={{
                                  height: "auto",
                                  border: "1px solid #eaeaea"
                                }}
                                src={lists.rep_image}
                                alt="Gallery"
                                className="img-100 b-r-15"
                              />
                              <ul
                                style={{
                                  display: "inline-block",
                                  verticalAlign: "inherit",
                                  marginLeft: "3%"
                                }}
                              >
                                <li>
                                  <span>{lists.en_name}</span>
                                </li>
                                <li>
                                  <span>{lists.zh_name}</span>
                                </li>
                              </ul>
                              <span style={{ marginLeft: "5%" }}>
                                {lists.option.hour} 시간 USD {lists.option.usd}
                              </span>
                              <span>
                                &nbsp;|&nbsp; CNY {lists.option.cny} ~
                              </span>
                            </td>
                            {/* <td>
                              {" "}
                              {lists.en_name}
                              <br />
                              {lists.zh_name}
                            </td> */}

                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(
                                    `/guidegoods/ditail/${lists.product_no}`
                                  )
                                }}
                              >
                                보기
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                <div className="pagenation-box">
                  <Pagenation data={waitlsit} fn={fn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuideOk() {
  const [seachText, setSearchText] = useState("")

  const [waitlsit, setWaitlsit] = useState([])

  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", seachText)
    axios
      .post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        alert(" 리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", seachText)

    axios
      .post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
          if (response.data.data.count <= 0) {
            console.log(response.data.data.count)
            message.warning("일치하는 가이드 상품이 없습니다")
          }
        } else {
          setWaitlsit([])
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("type", 2)
    form.append("search", seachText)
    try {
      const { data } = await axios.post("/api/v1/product/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setWaitlsit({
          lists: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      alert("페이지를 로딩하는데 실패했어요.")
    }

    // 이전 다음 페이지를 위한 api호출
    // axios로 서버 통신
    // success시 nomalList 업데이트
  }
  return (
    <div>
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body" style={{ fontSize: "16px" }}>
              <div className="user-search-bar">
                <div className="search-input">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="가이드명으로 검색하세요"
                      onChange={e => setSearchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          onSearchHandler()
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="icon-search">
                  <i className="fa fa-search fa-2x" onClick={onSearchHandler} />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ width: "5%" }} />
                      <th scope="col" style={{ width: "5%" }}>
                        상태
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        작성일시
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        타입
                      </th>
                      <th scope="col" style={{ width: "50%" }}>
                        상품정보
                      </th>
                      <th scope="col" style={{ width: "2" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {waitlsit.lists &&
                      waitlsit.lists.map((lists, index) => {
                        return (
                          <tr>
                            <th
                              scope="row"
                              key={index}
                              style={{ textAlign: "left" }}
                            >
                              {index}
                            </th>
                            <td>{lists.status}</td>
                            <td>{lists.registered}</td>
                            <td> {lists.type}</td>
                            <td style={{ textAlign: "left" }}>
                              {" "}
                              <img
                                style={{
                                  height: "auto",
                                  border: "1px solid #eaeaea"
                                }}
                                src={lists.rep_image}
                                alt="Gallery"
                                className="img-100 b-r-15"
                              />
                              <ul
                                style={{
                                  display: "inline-block",
                                  verticalAlign: "inherit",
                                  marginLeft: "3%"
                                }}
                              >
                                <li>
                                  <span>{lists.en_name}</span>
                                </li>
                                <li>
                                  <span>{lists.zh_name}</span>
                                </li>
                              </ul>
                              <span style={{ marginLeft: "5%" }}>
                                {lists.option.hour} 시간 USD {lists.option.usd}
                              </span>
                              <span>
                                &nbsp;|&nbsp; CNY {lists.option.cny} ~
                              </span>
                            </td>

                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(
                                    `/guidegoods/ditail/${lists.product_no}`
                                  )
                                }}
                              >
                                보기
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                <div className="pagenation-box">
                  <Pagenation data={waitlsit} fn={fn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideGoodsList
