import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav } from "react-bootstrap"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"
import SweetAlert from "react-bootstrap-sweetalert"
import { message } from "antd"

const RecomendList = () => {
  const history = useHistory()

  let [tap, setTab] = useState(0)
  return (
    <>
      <Breadcrumb title="추천 원데이투어 관리" parent="추천원데이투어리스트" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                {/* <div className="bennerContent">
                  <h5>추천원데이투어리스트</h5>
                </div> */}

                <div className="card-body" style={{ fontSize: "16px" }}>
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
                              setTab(0)
                            }}
                          >
                            영문관리
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-1"
                            onClick={() => {
                              setTab(1)
                            }}
                          >
                            중문관리
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    </Nav>
                    <TabContent 누른탭={tap} />
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

const RecomendItemEn = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [enlist, setEnlist] = useState([])
  const [indexNum, setIndexNum] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [listNomber, setListNomber] = useState(0)
  const history = useHistory()
  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("lang", "en")

    axios
      .post("/api/v1/recommend/listT", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setEnlist({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("불러오기실패")
      })
  }, [])

  const UpdateBtn = recNo => {
    history.push(`/recomdoned/onday/update/${recNo}`)
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("lang", "en")

    try {
      const { data } = await axios.post("/api/v1/recommend/listT", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setEnlist({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }
  }
  const onNobtn = () => {
    setIsShow(!isShow)
  }
  const alertHandler = okay => {
    setIsShow(!isShow)
    if (okay) {
      let form = new FormData()
      form.append("rec_no", listNomber)

      axios
        .post("api/v1/recommend/deleteT", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          // const listse = zhlist.list.filter((item, i) => i !== indexNum)
          setEnlist({
            ...enlist,
            list: enlist.list.filter((item, i) => i !== indexNum)
          })
        })
    }
  }
  return (
    <>
      <div className="cnct-btn">
        <button
          id="maching-btn"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            history.push("/recomdoned/cnt/en")
          }}
        >
          상품연결
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "5%" }} />
              <th scope="col" style={{ width: "7%" }}>
                노출순위
              </th>
              <th scope="col" style={{ width: "8%" }}>
                작성일시
              </th>
              <th scope="col" style={{ width: "25%", textAlign: "left" }}>
                상품명
              </th>

              <th scope="col" style={{ width: "15%", textAlign: "left" }}>
                가격
              </th>
              <th scope="col" style={{ width: "15%", textAlign: "left" }}>
                가이드명
              </th>

              <th scope="col" style={{ width: "20%" }} />
            </tr>
          </thead>
          <tbody>
            {enlist.list &&
              enlist.list.map((lists, index) => {
                return (
                  <tr>
                    <td scope="row" key={index} style={{ textAlign: "left" }}>
                      {index}
                    </td>
                    <td style={{ textAlign: "left" }}>{lists.z_index}</td>
                    <td>{lists.registered}</td>{" "}
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      <img
                        style={{ height: "auto", border: "1px solid #eaeaea" }}
                        src={lists.rep_image}
                        alt="Gallery"
                        className="img-100 b-r-15"
                        onClick={() => {
                          setIsOpen(true)
                          setPhotoIndex(1)
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      {lists.en_name}
                    </td>
                    <td style={{ textAlign: "left" }}>USD {lists.en_price} </td>
                    <td style={{ textAlign: "left" }}>{lists.guide_name}</td>
                    <td>
                      <button
                        className="btn btn-warning active  btn -xs btn-sm"
                        type="button"
                        onClick={() => {
                          onNobtn()
                          setIndexNum(index)
                          setListNomber(lists.rec_no)
                          // deleteList(lists.rec_no, index)
                        }}
                      >
                        삭제
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => UpdateBtn(lists.rec_no)}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div className="pagenation-box">
          <Pagenation data={enlist} fn={fn} />
        </div>
      </div>

      <SweetAlert
        showCancel
        confirmBtnBsStyle="danger"
        danger
        show={isShow}
        onConfirm={() => alertHandler(true)}
        onCancel={() => alertHandler(false)}
        cancelBtnBsStyle="default"
        title="리스트삭제"
      >
        삭제하시겠습니까?
      </SweetAlert>
    </>
  )
}
const RecomendItemZn = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [zhlist, setZhlist] = useState({})
  const [indexNum, setIndexNum] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [listNomber, setListNomber] = useState(0)
  const history = useHistory()
  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    form.append("lang", "zh")

    axios
      .post("/api/v1/recommend/listT", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setZhlist({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("불러오기실패")
      })
  }, [])

  const UpdateBtn = recNo => {
    history.push(`/recomdoned/onday/update/${recNo}`)
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("lang", "zh")

    try {
      const { data } = await axios.post("/api/v1/recommend/listT", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status === "success") {
        setZhlist({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }
  }
  const onNobtn = () => {
    setIsShow(!isShow)
  }
  const alertHandler = okay => {
    setIsShow(!isShow)
    if (okay) {
      let form = new FormData()
      form.append("rec_no", listNomber)
      axios
        .post("api/v1/recommend/deleteT", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          // const listse = zhlist.list.filter((item, i) => i !== indexNum)
          setZhlist({
            ...zhlist,
            list: zhlist.list.filter((item, i) => i !== indexNum)
          })
        })
    }
  }
  return (
    <>
      <div className="cnct-btn">
        <button
          id="maching-btn"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            history.push("/recomdoned/cnt/zh")
          }}
        >
          상품연결
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col" style={{ width: "5%" }} />
              <th scope="col" style={{ width: "7%" }}>
                노출순위
              </th>
              <th scope="col" style={{ width: "8%" }}>
                작성일시
              </th>
              <th scope="col" style={{ width: "25%", textAlign: "left" }}>
                상품명
              </th>

              <th scope="col" style={{ width: "15%", textAlign: "left" }}>
                가격
              </th>
              <th scope="col" style={{ width: "15%", textAlign: "left" }}>
                가이드명
              </th>
              <th scope="col" style={{ width: "20%" }} />
            </tr>
          </thead>
          <tbody>
            {zhlist.list &&
              zhlist.list.map((lists, index) => {
                return (
                  <tr>
                    <td scope="row" key={index} style={{ textAlign: "left" }}>
                      {index}
                    </td>
                    <td style={{ textAlign: "left" }}>{lists.z_index}</td>
                    <td>{lists.registered}</td>
                    <td style={{ textAlign: "left" }}>
                      {" "}
                      <img
                        style={{ height: "auto", border: "1px solid #eaeaea" }}
                        src={lists.rep_image}
                        alt="Gallery"
                        className="img-100 b-r-15"
                        onClick={() => {
                          setIsOpen(true)
                          setPhotoIndex(1)
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      {lists.zh_name}
                    </td>

                    <td style={{ textAlign: "left" }}>CNY {lists.zh_price} </td>
                    <td style={{ textAlign: "left" }}>{lists.guide_name}</td>
                    <td>
                      <button
                        className="btn btn-warning active  btn -xs btn-sm"
                        type="button"
                        onClick={() => {
                          onNobtn()
                          setIndexNum(index)
                          setListNomber(lists.rec_no)
                        }}
                      >
                        삭제
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => UpdateBtn(lists.rec_no)}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div className="pagenation-box">
          <Pagenation data={zhlist} fn={fn} />
        </div>
      </div>

      <SweetAlert
        showCancel
        confirmBtnBsStyle="danger"
        danger
        show={isShow}
        onConfirm={() => alertHandler(true)}
        onCancel={() => alertHandler(false)}
        cancelBtnBsStyle="default"
        title="리스트삭제"
      >
        삭제하시겠습니까?
      </SweetAlert>
    </>
  )
}
function TabContent(props) {
  if (props.누른탭 === 0) {
    return (
      <div>
        <RecomendItemEn />
      </div>
    )
  } else if (props.누른탭 === 1) {
    return (
      <div>
        <RecomendItemZn />
      </div>
    )
  } else if (props.누른탭 === 2) {
    return <div>내용2</div>
  }
}

export default RecomendList
