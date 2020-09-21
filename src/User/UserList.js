import React, { useContext, useState, useEffect } from "react"

import "../assets/css/layout.css"
import axios from "axios"
import Cookie from "js-cookie"
import { useHistory, useParams } from "react-router-dom"
import Breadcrumb from "../components/common/breadcrumb"
import Pagenation from "../util/Pagenation"
import { message } from "antd"
const UserList = () => {
  const [searchText, setSerchText] = useState("")
  const [userlist, setUserlist] = useState({})

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)

    axios
      .post("/api/v1/member/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setUserlist({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("불러오기실패")
        console.log(err)
      })
  }, [])

  const onSearchHandler = () => {
    if (!searchText) {
      message.warning("한글자이상입력하세요")
    }

    const form = new FormData()
    form.append("index", 1)
    form.append("search", searchText)

    axios
      .post("/api/v1/member/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setUserlist({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
        if (response.data.message === "NoResult") {
          message.warning("일치하는 유저가없습니다")
        } else {
          setUserlist({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }

  const history = useHistory()

  const fn = async d => {
    let form = new FormData()
    form.append("index", d)

    try {
      const { data } = await axios.post("/api/v1/guide/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setUserlist({
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
      <Breadcrumb title="유저관리" parent="유저관리" />
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
                      placeholder="닉네임으로 검색하세요"
                      onChange={e => setSerchText(e.target.value)}
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
                      <th scope="col" style={{ width: "5%" }}>
                        .NO
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        가입일시
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        언어
                      </th>
                      <th
                        scope="col"
                        style={{ width: "20%", textAlign: "left" }}
                      >
                        이메일
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        닉네임
                      </th>
                      <th scope="col" style={{ width: "40%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {userlist.lists &&
                      userlist.lists.map((list, index) => {
                        return (
                          <tr>
                            <th scope="row" key={index}>
                              {index}
                            </th>
                            <td>{list.registered}</td>
                            <td>{list.lang}</td>
                            <td style={{ textAlign: "left" }}>{list.email}</td>
                            <td>{list.nickname}</td>

                            <td style={{ textAlign: "right" }}>
                              <button
                                className="  btn btn-secondary btn-sm"
                                onClick={() => {
                                  history.push(
                                    `/userdetails/${list.account_no}`
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
                  <Pagenation data={userlist} fn={fn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UserList)
