import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Data from "../Data"
import { Modal, Button } from "react-bootstrap"
import GlobalContext from "../context/global.context"
import Breadcrumb from "../components/common/breadcrumb"
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios"
import Pagenation from "../util/Pagenation"
import Cookie from "js-cookie"
import one from "../assets/images/product/1.png"
import { message } from "antd"

const Userdetail = ({ match }) => {
  // const Datacontext = React.createContext();
  // const 데이터 = useContext(Datacontext);
  const userInfo = {
    register: "",
    nickName: "",
    lang: "",
    email: "",
    social: ""
  }

  const [userData, setUserData] = useState(userInfo)
  const [userInfolists, setUserInfolists] = useState({})
  const [modal, setmodal] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [Okbox, setOkbox] = useState(0)
  const [susees, setsusees] = useState(0)
  const [Outbox, setOutbox] = useState(0)
  const [Susees, setSusees] = useState(0)
  const [box, setbox] = useState(false)
  const history = useHistory()
  const ShowOkayMasege = () => {
    setSusees(1)
    setbox(false)
  }
  const HideOkMmsege = () => {
    setSusees(0)
  }
  const ShowAlert = () => {
    setbox(!box)
  }

  useEffect(() => {
    let form = new FormData()
    form.append("account_no", match.params.id)
    form.append("index", 1)

    axios
      .post("/api/v1/member/detail", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(response => {
        if (response.data.status === "success") {
          setUserData({
            register: response.data.data.registered,
            nickName: response.data.data.nickname,
            lang: response.data.data.lang,
            email: response.data.data.email,
            social: response.data.data.social
          })
        }
      })
      .catch(err => {
        console.log(err)
        message.warning("유저정보 를 불러오는데 실패했습니다.")
        history.goBack()
      })
  }, [])

  useEffect(() => {
    let form = new FormData()
    // const product_no = props.match.params.id
    form.append("account_no", match.params.id)
    form.append("index", 1)
    axios
      .post("/api/v1/member/history", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setUserInfolists({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
        return
      })
  }, [])

  const onNobtn = (review_no, type, index) => {
    if (window.confirm("리뷰를  모든 페이지에서 숨기시겠습니까??")) {
      let form = new FormData()

      form.append("review_no", review_no)
      form.append("type", type)
      form.append("status", "HOLD")
      axios
        .post("/api/v1/member/review_status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("리뷰를 숨겼습니다")

            // 서버에넘겼다고 상태가 변했다고생각하면안됌.
            const a = { ...userInfolists }
            a.list[index].review.status = "HOLD"
            setUserInfolists(a)
          }
        })
    }
  }
  const onOkbtn = (review_no, type, index) => {
    if (window.confirm("리뷰를  모든 페이지에서 노출시겠습니까?")) {
      let form = new FormData()

      form.append("review_no", review_no)
      form.append("type", type)
      form.append("status", "ALIVE")
      axios
        .post("/api/v1/member/review_status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("리뷰가 노출됩니다")
            const a = { ...userInfolists }
            a.list[index].review.status = "ALIVE"
            setUserInfolists(a)
            // history.push("/guidgoodslist1")
          }
        })
    }
  }
  const test = (review_no, type, status) => {}
  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("account_no", match.params.id)

    try {
      const { data } = await axios.post("/api/v1/member/history", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setUserInfolists({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  return (
    <div>
      <Breadcrumb title="회원상세" parent="회원관리" />

      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div>
                <div className="withing-product-detail">
                  <div className="benner-btn">
                    <div className="withing-product-detail__label">
                      <strong className="c-title">
                        <h4 style={{ margin: "0px" }}>회원 상세정보</h4>
                      </strong>

                      <button className="withing-label type-red" onClick={""}>
                        회원 탈퇴처리하기
                      </button>
                    </div>
                  </div>
                  <div className="withing-product-detail__part">
                    <ul className="withing-product-detail__part-list">
                      <li style={{ width: "25%" }}>
                        <strong className="c-title">회원 닉네임</strong>
                        <span className="c-text">{userData.nickName}</span>
                      </li>
                      <li style={{ width: "25%" }}>
                        <strong className="c-title">언어</strong>
                        <span className="c-text">{userData.lang}</span>
                      </li>

                      <li style={{ width: "25%" }}>
                        <strong className="c-title">가입일시</strong>
                        <span className="c-text">{userData.register}</span>
                      </li>

                      <li style={{ width: "25%" }}>
                        <strong className="c-title">이메일</strong>
                        <span className="c-text">{userData.email}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="card-block row">
                    <div className="col-sm-12 col-lg-12 col-xl-12" id="bennerH">
                      <div className="user-info-table">
                        <div className="card-header">
                          <h5>이용내역</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">결제일자</th>
                                <th scope="col">이용일자</th>
                                <th scope="col">타입</th>
                                <th scope="col">상세정보</th>
                                <th scope="col">상품금액</th>
                                <th scope="col">결제금액</th>
                                <th scope="col">비고</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userInfolists.list &&
                                userInfolists.list.map((lists, index) => (
                                  <tr>
                                    <td>{lists.rsv.reservation_date}</td>
                                    <td>{lists.rsv.reservation_date}</td>
                                    <td>{lists.rsv.reservation_date}</td>
                                    <td />
                                    <td>{lists.rsv.currency_price}</td>
                                    <td>{lists.rsv.price}</td>
                                    <td>{lists.rsv.pay_status}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="card-header">
                          <h5>이용후기</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col"> 작성일</th>
                                <th scope="col">후기내용</th>

                                <th scope="col">이미지</th>
                                <th scope="col" />
                              </tr>
                            </thead>

                            <tbody>
                              {userInfolists.list &&
                                userInfolists.list.map((lists, index) => (
                                  <tr>
                                    <td>{lists.review.review_registered}</td>
                                    <td>{lists.review.comment}</td>

                                    <td>
                                      {userInfolists &&
                                        lists.review.image.map(
                                          (list, index) => (
                                            <img
                                              src={list}
                                              alt="Gallery"
                                              className="img-50 b-r-15"
                                            />
                                          )
                                        )}
                                    </td>
                                    <td>
                                      {userInfolists &&
                                      lists.review.status === "ALIVE" ? (
                                        <button
                                          className="withing-label type-red"
                                          onClick={() =>
                                            onNobtn(
                                              lists.review.review_no,
                                              lists.type,
                                              index
                                            )
                                          }
                                        >
                                          리뷰숨기기
                                        </button>
                                      ) : (
                                        <button
                                          className="withing-label type-point"
                                          onClick={() =>
                                            onOkbtn(
                                              lists.review.review_no,
                                              lists.type,
                                              index
                                            )
                                          }
                                        >
                                          리뷰보이기
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <div className="pagenation-box">
                            <Pagenation data={userInfolists} fn={fn} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userdetail
