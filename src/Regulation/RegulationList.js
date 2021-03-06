import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav, TabContent } from "react-bootstrap"
import Data from "../Data"
import Breadcrumb from "../components/common/breadcrumb"
import PagnationTool from "../PagnationTool"
import one from "../assets/images/product/1.png"
import axios from "axios"
import Cookie from "js-cookie"

const RegulationList = () => {
  const history = useHistory()
  let [tab, settab] = useState(0)
  const [termLists, setTermLists] = useState([])

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    axios
      .post("/api/v1/rule/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setTermLists(response.data.data)
          console.log(response)
        }
      })
      .catch(err => {
        alert("공지사항을 불러오는데 실패했습니다.")
      })
  }, [])
  return (
    <>
      <Breadcrumb title="규정관리" parent="정보관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="ment-box">
                  <h2>규정관리리스트</h2>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" />
                          <th scope="col">제목</th>
                          <th scope="col" />
                          <th scope="col" />
                          <th scope="col" />
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {termLists.map((lists, index) => {
                          return (
                            <tr>
                              <th scope="row" key={lists.term_no}>
                                {lists.term_no}
                              </th>
                              <td>{lists.title}</td>

                              <td />

                              <td />
                              <td />
                              <td>
                                {" "}
                                <button
                                  className="  btn btn-secondary btn-sm "
                                  onClick={() => {
                                    history.push(
                                      `/regulation/add/${lists.rule_no}`
                                    )
                                  }}
                                >
                                  수정
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
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

const GuideSome = () => {
  const [seachtext, setserchText] = React.useState("")
  const [dummyData, setDummyData] = React.useState(Data)
  const SerchFilter = () => {
    const filter = Data.filter(d => d.name.indexOf(seachtext) > -1)
    setDummyData(filter)
  }
  const onRemove = id => {
    setDummyData(dummyData.filter(user => user.id !== id))
  }
  const history = useHistory()
  const { id } = useParams()

  return (
    <div>
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div className="user-search-bar">
                <div className="search-input">
                  <div className="form-group">
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="가이드명으로 검색하세요"
                      onChange={(e) => setserchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          SerchFilter()
                        }
                      }}
                    /> */}
                  </div>
                </div>

                <div onClick={SerchFilter} className="icon-search" />
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" />
                      <th scope="col">결제일시</th>
                      <th scope="col">상품명</th>
                      <th scope="col" />

                      <th scope="col">유저명</th>
                      <th scope="col">이용일자</th>
                      <th scope="col">결제금액</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map(a => {
                      return (
                        <tr>
                          <th scope="row" key={a.id}>
                            {a.id}
                          </th>
                          <td>{a.datea}</td>

                          <td>
                            {" "}
                            <img
                              src={one}
                              alt="Gallery"
                              className="img-60 b-r-15"
                            />
                          </td>
                          <td>
                            {a.product}/<br />
                            {a.product}
                          </td>

                          <td>{a.name}</td>
                          <td>{a.datea}</td>
                          <td>180,000원</td>

                          <td>
                            {/* <button
                              className="user-view-button"
                              onClick={() => onRemove(a.id)}
                            >
                              삭제
                            </button> */}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <PagnationTool />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const GuideOk = () => {
  const [seachtext, setserchText] = React.useState("")
  const [dummyData, setDummyData] = React.useState(Data)
  const SerchFilter = () => {
    const filter = Data.filter(d => d.nicname.indexOf(seachtext) > -1)
    setDummyData(filter)
  }
  const onRemove = id => {
    setDummyData(dummyData.filter(user => user.id !== id))
  }
  const history = useHistory()
  const { id } = useParams()

  return (
    <div>
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div className="user-search-bar">
                <div className="search-input">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="가이드명으로 검색하세요"
                      onChange={e => setserchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          SerchFilter()
                        }
                      }}
                    />
                  </div>
                </div>
                <div onClick={SerchFilter} className="icon-search">
                  <i className="fa fa-search" />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" />
                      <th scope="col">승인상태</th>
                      <th scope="col">작성일시</th>
                      <th scope="col">타입</th>
                      <th scope="col">상품정보</th>
                      <th scope="col" />
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map(a => {
                      return (
                        <tr>
                          <th scope="row" key={a.id}>
                            {a.id}
                          </th>
                          <td>{a.Approval}</td>
                          <td>{a.datea}</td>
                          <td />
                          <td>
                            {" "}
                            <img
                              src={one}
                              alt="Gallery"
                              className="img-60 b-r-15"
                            />
                          </td>
                          <td>
                            <p>{a.product}</p>
                            <p>{a.product}</p>
                          </td>
                          <td>
                            {a.price} | {a.price}
                          </td>

                          <td>
                            <button
                              className="  btn btn-warning active  btn -xs btn-sm"
                              onClick={() => {
                                history.push(`/guidegoods/ditailok/${a.id}`)
                              }}
                            >
                              보기
                            </button>
                            {/* <button
                              className="user-view-button"
                              onClick={() => onRemove(a.id)}
                            >
                              삭제
                            </button> */}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <PagnationTool />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegulationList
