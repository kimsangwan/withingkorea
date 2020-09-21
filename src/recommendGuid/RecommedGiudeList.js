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
  const [en, seten] = useState(false)
  const [zn, setzn] = useState(false)

  let [누른탭, 누른탭변경] = useState(0)
  return (
    <>
      <Breadcrumb title="추천 가이드 관리" parent="메인관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="bennerContent" />
                <div className="card-body " style={{ fontSize: "16px" }}>
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
                              누른탭변경(0)
                            }}
                          >
                            영문관리
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-1"
                            onClick={() => {
                              누른탭변경(1)
                            }}
                          >
                            중문관리
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    </Nav>
                    <TabContent 누른탭={누른탭} />
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
      .post("/api/v1/recommend/listG", form, {
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
    history.push(`/recomend/guide/update/${recNo}`)
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("lang", "en")
    try {
      const { data } = await axios.post("/api/v1/recommend/listG", form, {
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
        .post("api/v1/recommend/deleteG", form, {
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
            history.push("/recomend/guidecnt/en")
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

              <th scope="col" style={{ width: "10%" }}>
                노출순위
              </th>
              <th scope="col" style={{ width: "10%" }}>
                작성일시
              </th>
              <th scope="col" style={{ width: "50%", textAlign: "left" }}>
                가이드정보
              </th>
              <th scope="col" />
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
                    <td>작성일시</td>
                    <td style={{ textAlign: "left" }}>
                      <img
                        style={{ height: "auto", border: "1px solid #eaeaea" }}
                        src={lists.profile_img}
                        alt="Gallery"
                        className="img-100 b-r-15"
                        onClick={() => {
                          setIsOpen(true)
                          setPhotoIndex(1)
                        }}
                      />
                      <span style={{ marginLeft: "3%" }}>
                        이름 :{lists.guide_name}/나이{lists.age}/언어:
                        {lists.lang}
                        {lists.zh_name}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-warning active btn -xs btn-sm"
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
      .post("/api/v1/recommend/listG", form, {
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
    history.push(`/recomend/guide/update/${recNo}`)
  }
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("lang", "zh")
    try {
      const { data } = await axios.post("/api/v1/recommend/listG", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      if (data.status == "success") {
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
        .post("api/v1/recommend/deleteG", form, {
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
            history.push("/recomend/guidecnt/zh")
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

              <th scope="col" style={{ width: "10%" }}>
                노출순위
              </th>
              <th scope="col" style={{ width: "10%" }}>
                작성일시
              </th>
              <th scope="col" style={{ width: "50%", textAlign: "left" }}>
                가이드정보
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {zhlist.list &&
              zhlist.list.map((lists, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "left" }} scope="row" key={index}>
                      {index}
                    </td>
                    <td style={{ textAlign: "left" }}>{lists.z_index}</td>
                    <td>작성일자</td>
                    <td style={{ textAlign: "left" }}>
                      <img
                        style={{ height: "auto", border: "1px solid #eaeaea" }}
                        src={lists.profile_img}
                        alt="Gallery"
                        className="img-100 b-r-15"
                        onClick={() => {
                          setIsOpen(true)
                          setPhotoIndex(1)
                        }}
                      />
                      <span style={{ marginLeft: "3%" }}>
                        이름 :{lists.guide_name}/나이{lists.age}/언어:
                        {lists.lang}
                        {lists.zh_name}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-warning active btn -xs btn-sm"
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
