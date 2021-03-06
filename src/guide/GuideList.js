import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav } from "react-bootstrap"

import Breadcrumb from "../components/common/breadcrumb"

import one from "../assets/images/product/1.png"
import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"
import { message } from "antd"
function Guidelist() {
  const history = useHistory()
  let [tab, settab] = useState(0)

  return (
    <>
      <Breadcrumb title="가이드 관리" parent="가이드 관리" />
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
                            활동중
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        {/* <button
                          id="maching-btn"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            history.push('/recomendguidecnt');
                          }}
                        >
                          상품연결
                        </button> */}
                      </div>
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
        <GuideOk />
      </div>
    )
  }
}

function GuideSome() {
  const history = useHistory()
  const [waitlsit, setWaitlsit] = useState({})
  const [searchText, setSearchText] = useState()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    axios
      .post("/api/v1/guide/list", form, {
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
        message.warning("가이드리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", searchText)

    if (!searchText) {
      message.warning("한글자이상 입력하세요")
    }

    axios
      .post("/api/v1/guide/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          if (response.data.data.count > 0) {
            setWaitlsit({
              lists: response.data.data.list,
              count: response.data.data.count
            })
          }
        } else {
          if (response.data.message === "NoResult")
            message.warning("일치하는 가이드가없습니다 다시검색해주세요")
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
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

    try {
      const { data } = await axios.post("/api/v1/guide/list", form, {
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
                      onChange={e => setSearchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          onSearchHandler()
                        }
                      }}
                    />
                  </div>
                </div>
                <div onClick={""} className="icon-search">
                  <i className="fa fa-search fa-2x" onClick={onSearchHandler} />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th
                        scope="col"
                        style={{ width: "5%", textAlign: "left" }}
                      />
                      <th scope="col " style={{ width: "10%" }}>
                        상태
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        작성일시
                      </th>
                      <th
                        scope="col"
                        style={{ width: "50%", textAlign: "left" }}
                      >
                        가이드정보
                      </th>

                      <th scope="col" style={{ width: "10%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {waitlsit.lists ? (
                      waitlsit.lists.map((list, index) => {
                        return (
                          <tr>
                            <th scope="row" key={index}>
                              {index}
                            </th>
                            <td>{list.status}</td>
                            <td>{list.registered}</td>

                            <td style={{ textAlign: "left" }}>
                              <img
                                src={one}
                                alt="Gallery"
                                className="img-100 b-r-15"
                              />
                              <span style={{ marginLeft: "3%" }}>
                                가이드명/ 나이 /영어,중국어/ 위치 (서버에
                                칼럼이없음)
                              </span>
                            </td>

                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(`/guideditail/${list.guide_no}`)
                                }}
                              >
                                보기
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <div>{/* <h2>일치하는데이터가 없습니다.</h2> */}</div>
                    )}
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
  const history = useHistory()
  const [waitlsit, setWaitlsit] = useState({})
  const [searchText, setSearchText] = useState()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    axios
      .post("/api/v1/guide/list", form, {
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
        message.warning("가이드리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    if (!searchText) {
      message.warning("한글자이상 입력해주세요")
    }
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", searchText)

    axios
      .post("/api/v1/guide/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          if (response.data.data.count > 0) {
            setWaitlsit({
              lists: response.data.data.list,
              count: response.data.data.count
            })
          }
        } else {
          if (response.data.message === "NoResult")
            message.warning("일치하는 가이드가없습니다 다시검색해주세요")
          setWaitlsit({
            lists: response.data.data.list,
            count: response.data.data.count
          })
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

    try {
      const { data } = await axios.post("/api/v1/guide/list", form, {
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
                <div onClick={""} className="icon-search">
                  <i
                    className="fa fa-search fa-2x "
                    onClick={onSearchHandler}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th
                        scope="col"
                        style={{ width: "5%", textAlign: "left" }}
                      />
                      <th scope="col " style={{ width: "10%" }}>
                        상태
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        작성일시
                      </th>
                      <th
                        scope="col"
                        style={{ width: "50%", textAlign: "left" }}
                      >
                        가이드정보
                      </th>

                      <th scope="col" style={{ width: "10%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {waitlsit.lists ? (
                      waitlsit.lists.map((list, index) => {
                        return (
                          <tr>
                            <th scope="row" key={index}>
                              {index}
                            </th>
                            <td>{list.status}</td>
                            <td>{list.registered}</td>

                            <td style={{ textAlign: "left" }}>
                              <img
                                src={one}
                                alt="Gallery"
                                className="img-100 b-r-15"
                              />
                              <span style={{ marginLeft: "3%" }}>
                                가이드명/ 나이 /영어,중국어/ 위치 (서버에
                                칼럼이없음)
                              </span>
                            </td>

                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(`/guideditail/${list.guide_no}`)
                                }}
                              >
                                보기
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <div>{/* <h2>일치하는데이터가 없습니다.</h2> */}</div>
                    )}
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
export default Guidelist
