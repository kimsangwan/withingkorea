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
import { message } from "antd"

const TermNotieList = () => {
  const history = useHistory()
  let [tab, settab] = useState(0)
  const [termLists, setTermLists] = useState([])
  let form = new FormData()
  form.append("index", 1)
  useEffect(() => {
    axios
      .post("/api/v1/term/list", form, {
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
        message.warning("약관을 불러오는데 실패했습니다.")
      })
  }, [])
  return (
    <>
      <Breadcrumb title="약관관리" parent="정보관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="ment-box">
                  <h2>약관관리 리스트</h2>
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
                                      `/term/update/${lists.term_no}`
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

export default TermNotieList
