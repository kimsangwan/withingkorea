import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav, TabContent } from "react-bootstrap"
import Breadcrumb from "../components/common/breadcrumb"
import PagnationTool from "../PagnationTool"
import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"
import { message } from "antd"
const PrivateGoodsList = () => {
  const history = useHistory()
  let [tab, settab] = useState(0)

  return (
    <>
      <Breadcrumb title="프라이빗 상품리스트" parent="프라이빗상품관리" />
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
                            판매중
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

function PrivateWahting() {
  const [seachtext, setSearchText] = useState("")

  const [privateOkList, setPrivateOkList] = useState({})

  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", seachtext)
    axios
      .post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setPrivateOkList({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("상품 리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", seachtext)

    axios
      .post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setPrivateOkList({
            list: response.data.data.list,
            count: response.data.data.count
          })
        } else {
          if (response.data.message === "NoResult") {
            message.warning("일치하는  상품이 없습니다")
          }
          setPrivateOkList([])
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 1)
    form.append("search", seachtext)
    try {
      const { data } = await axios.post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      if (data.status == "success") {
        setPrivateOkList({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }
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

              <h1> </h1>

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

                      <th
                        scope="col"
                        style={{ width: "50%", textAlign: "left" }}
                      >
                        상품정보
                      </th>
                      <th scope="col" style={{ width: "10%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {privateOkList.list &&
                      privateOkList.list.map((lists, index) => {
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
                              <span style={{ marginLeft: "30%" }}>
                                {lists.hour} 시간 USD {lists.en_price}
                              </span>
                              <span>&nbsp;|&nbsp; CNY {lists.zh_price}</span>
                            </td>
                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(
                                    `/priviat/ditail/${lists.tour_no}`
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
                  <Pagenation data={privateOkList} fn={fn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function PrivateOK() {
  const [seachtext, setSearchText] = useState("")

  const [privateOkList, setPrivateOkList] = useState({})

  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", seachtext)
    axios
      .post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        console.log(response)
        if (response.data.status === "success") {
          setPrivateOkList({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("상품 리스트를  불러오는데 실패했습니다.")
      })
  }, [])
  const onSearchHandler = () => {
    const form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", seachtext)

    axios
      .post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setPrivateOkList({
            list: response.data.data.list,
            count: response.data.data.count
          })
        } else {
          if (response.data.message === "NoResult") {
            message.warning("일치하는 상품이 없습니다")
          }
          setPrivateOkList([])
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", 1)
    form.append("type", 2)
    form.append("search", seachtext)
    try {
      const { data } = await axios.post("/api/v1/secret/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      if (data.status == "success") {
        setPrivateOkList({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }
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

              <h1> </h1>

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

                      <th
                        scope="col"
                        style={{ width: "50%", textAlign: "left" }}
                      >
                        상품정보
                      </th>
                      <th scope="col" style={{ width: "10%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {privateOkList.list &&
                      privateOkList.list.map((lists, index) => {
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
                              <span style={{ marginLeft: "30%" }}>
                                {lists.hour} 시간 USD {lists.en_price}
                              </span>
                              <span>&nbsp;|&nbsp; CNY {lists.zh_price}</span>
                            </td>
                            <td>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(
                                    `/priviat/ditail/${lists.tour_no}`
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
                  <Pagenation data={privateOkList} fn={fn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function TabContent2(props) {
  if (props.tab === 0) {
    return (
      <div>
        <PrivateWahting />
      </div>
    )
  } else if (props.tab === 1) {
    return (
      <div>
        {" "}
        <PrivateOK />{" "}
      </div>
    )
  }
}
export default PrivateGoodsList
