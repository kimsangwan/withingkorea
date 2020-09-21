import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav } from "react-bootstrap"
import Breadcrumb from "../components/common/breadcrumb"
import Data from "../Data"
import axios from "axios"
import Cookie from "js-cookie"

const RecomendList = () => {
  const history = useHistory()
  const [en, seten] = useState(false)
  const [zn, setzn] = useState(false)
  const 영어관리스위치 = () => {
    seten(!en)
  }
  let [누른탭, 누른탭변경] = useState(0)
  return (
    <>
      <Breadcrumb title="추천 " parent="추천 가이드리스트" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="bennerContent">
                  <h5>추천 가이드리스트</h5>
                </div>

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
                      <div>
                        <button
                          id="maching-btn"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            history.push("/recomendguidecnt")
                          }}
                        >
                          상품연결
                        </button>
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

      {/* <div className="card-block row">
        <div className="col-sm-12 col-lg-12 col-xl-12"></div>
      </div> */}
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

const RecomendItemEn = () => {
  const [enList, setEnList] = useState()
  useEffect(() => {
    let form = new FormData()
    axios
      .post("/api/v1/recommend/listG", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setEnList(response.data.data.list)
        }
        console.log(response)
      })
      .catch(err => {
        alert("가이드리스트를  불러오는데 실패했습니다.")
      })
  }, [])

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col" />
            <th scope="col">노출순위</th>
            <th scope="col">작성일시</th>
            <th scope="col">가이드정보</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {Data.map(a => {
            return (
              <tr>
                <th scope="row" key={a.id}>
                  {a.id}
                </th>
                <td>{a.facility}</td>
                <td>{a.date}</td>
                <td>{a.sortation}</td>
                <td>
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                  >
                    삭제
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button className="btn btn-secondary btn-sm" type="button">
                    수정
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
const RecomendItemZn = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col" />
            <th scope="col">노출순위</th>
            <th scope="col">작성일시</th>
            <th scope="col">가이드정보 </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {Data.map(a => {
            return (
              <tr>
                <th scope="row" key={a.id}>
                  {a.id}
                </th>

                <td>{a.facility}</td>
                <td>{a.date}</td>
                <td>{a.sortation}</td>
                <td>
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                  >
                    삭제
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button className="btn btn-secondary btn-sm" type="button">
                    수정
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default RecomendList
