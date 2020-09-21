import React, { useState, useEffect } from "react"
import NewCard from "../components/common/NewCard"
import one from "../assets/images/product/1.png"
import "../assets/css/layout.css"

import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import { Link, useHistory } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { message } from "antd"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"

const GuideDtail = ({ match }) => {
  const [Okbox, setOkbox] = useState(0)
  const [susees, setsusees] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [isOkShow, setOkIsShow] = useState(false)
  const [rejet, setRejet] = useState(false)
  const [noMessage, setNoMessage] = useState("")
  const history = useHistory(0)

  const userInfo = {
    age: "",
    area: "",
    hashtag: [""],
    registered: "",
    name: "",
    en_name: "",
    zh_name: "",
    lang: "",
    email: "",
    social: "",
    profile_image: "",
    introduce: "",
    guide_license: "",
    car_license: "",
    status: "",
    nickName: ""
  }
  const [userData, setUserData] = useState(userInfo)
  const [comment, setcomment] = useState("")

  useEffect(() => {
    let form = new FormData()
    form.append("guide_no", match.params.id)
    form.append("type", 1)

    axios
      .post("/api/v1/guide/detail", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(response => {
        console.log(response.data.data.status)
        if (response.data.status === "success") {
          setUserData({
            register: response.data.data.registered,
            nickName: response.data.data.nickname,
            lang: response.data.data.lang,
            age: response.data.data.lang,
            name: response.data.data.name,
            email: response.data.data.email,
            social: response.data.data.social,
            hashtag: response.data.data.hashtag,
            profile_image: response.data.data.profile_image,
            guide_image: response.data.data.guide_license,
            car_license: response.data.data.car_license,
            introduce: response.data.data.introduce,
            en_name: response.data.data.en_name,
            zh_name: response.data.data.zh_name,
            status: response.data.data.status
          })
        }
      })
      .catch(err => {
        console.log(err)
        message.warning("유저정보 를 불러오는데 실패했습니다.")
        history.goBack()
      })
  }, [])
  const Okstatus = (listNo, index) => {
    if (window.confirm("승인하시겠습니까?")) {
      let form = new FormData()
      form.append("guide_no", match.params.id)
      form.append("comment", comment)
      form.append("status", "ALIVE")
      axios
        .post("/api/v1/guide/status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("승인되었습니다")
            history.push("/guidelist")
          }
        })
    }
  }
  const onNobtn = () => {
    setIsShow(!isShow)
  }

  const alertHandler = res => {
    setIsShow(!isShow)
    if (res) {
      let form = new FormData()
      form.append("guide_no", match.params.id)
      form.append("comment", res)
      form.append("status", "REJECT")
      axios
        .post("/api/v1/guide/status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("판매가 중단되었습니다.")

            history.push("/guidelist")
          }
        })
    }
  }

  const OutBtn = () => {
    if (window.confirm("회원을 탈퇴처리하시겠습니까?")) {
      let form = new FormData()
      form.append("guide_no", match.params.id)
      axios
        .post("/api/v1/guide/black", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("탈퇴 처리에 성공하였습니다.")
            history.push("/guidelist")
          }
        })
    }
  }
  const okbtn = () => {
    setOkIsShow(!isOkShow)
  }

  const alertHandlerOK = okay => {
    setOkIsShow(!isOkShow)
    if (okay) {
      let form = new FormData()
      form.append("guide_no", match.params.id)
      form.append("comment", "")
      form.append("status", "ALIVE")
      axios
        .post("/api/v1/guide/status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("승인되었습니다.")

            history.push("/guidelist")
          }
        })
    }
  }
  const recjtBtn = () => {
    setRejet(!rejet)
  }

  const rejetHandler = okay => {
    setRejet(!rejet)
    if (okay) {
      let form = new FormData()
      form.append("guide_no", match.params.id)

      axios
        .post("/api/v1/guide/black", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("승인되었습니다.")

            history.push("/guidelist")
          }
        })
    }
  }
  const statusHandler = status => {
    let statusTag
    if (status == "REJECT") {
      statusTag = <span className="withing-label type-red">승인거절</span>
    } else if (status === "WAIT") {
      statusTag = <span className="withing-label">승인대기</span>
    } else if (status === "ALIVE") {
      statusTag = <span className="withing-label type-point">활동중</span>
    } else {
      statusTag = <span className="withing-label type-red">판매중지</span>
    }

    return statusTag
  }
  return (
    <>
      <Breadcrumb
        title="가이드 프로필 상세"
        parent="가이드관리
     "
      />

      <div className="withing-product-detail__info">
        <div className="withing-product-detail__info-inner">
          <div className="withing-product-detail__label">
            {/* <strong className="c-title"> 가이드명 :{userData.style}</strong> */}

            {statusHandler(userData.status)}
          </div>
          <div className="withing-product-detail__img">
            <img src={userData.profile_image} alt="" />
          </div>
          <div className="withing-product-detail__title">
            <h3 className="c-title">
              <span className="text">가이드 이름</span>
              <span className="text">영문:{userData.en_name}</span>
              <span className="text">중문:{userData.zh_name}</span>
              <span className="text"> 가이드 나이 :{userData.age} 세</span>
            </h3>
          </div>
          <div className="withing-product-detail__price">
            <ul className="withing-product-detail__price-list">
              <li>
                <span className="c-box"> 사용가능언어 : {userData.lang} </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="withing-product-detail__part">
        <ul className="withing-product-detail__part-list">
          <li style={{ width: "33%" }}>
            <strong className="c-title" style={{ marginBottom: "4%" }}>
              자격증
            </strong>

            <img className="img-100 b-r-15" src={userData.guide_image} />
          </li>

          <li style={{ width: "33%" }}>
            <strong className="c-title" style={{ marginBottom: "4%" }}>
              운전면허증
            </strong>
            <img className="img-100 b-r-15" src={userData.car_license} />
          </li>
          <li style={{ width: "33%" }}>
            <strong className="c-title" style={{ marginBottom: "10%" }}>
              해시태그
            </strong>
            {userData.hashtag.map(a => (
              <>
                <div
                  className="withing-label type-point"
                  style={{ margin: "0 5px 5px 0" }}
                >
                  {a}
                </div>
              </>
            ))}
          </li>
          {/* <li>
            <strong className="c-title">평점</strong>
            <span className="c-text">4.0</span>
          </li> */}
        </ul>
      </div>
      <div className="withing-product-detail__desc">
        <div className="withing-product-detail__desc-inner">
          <h4 className="withing-product-detail__desc-title">한줄소개</h4>
          <p className="withing-product-detail__desc-text" />

          {userData.introduce}
          <p />
          {/* {productInfo.status === "ALIVE" ? (
                <ReviewBox reviewList={review} />
              ) : null} */}
        </div>
      </div>

      {userData.status == "ALIVE" ? (
        <div className="btn-gup">
          <button
            className="btn btn-warning active "
            onClick={recjtBtn}
            style={{ height: 35 }}
          >
            탈퇴처리
          </button>
        </div>
      ) : (
        <div className="btn-gup">
          <button
            className="btn btn-warning active "
            onClick={onNobtn}
            style={{ height: "35px" }}
          >
            승인거절
          </button>
          &nbsp;
          <button
            className="btn 
              btn-success"
            onClick={okbtn}
          >
            승인완료
          </button>
        </div>
      )}
      <SweetAlert
        input
        inputType="text"
        showCancel
        placeHolder="거절 메시지를 입력해주세요"
        validationMsg="한글자이상 입력하세요"
        // danger
        show={isShow}
        onConfirm={res => alertHandler(res)}
        onCancel={() => alertHandler()}
        cancelBtnBsStyle="default"
        title="판매중지"
      >
        거절사유를 입력해주세요
      </SweetAlert>
      <SweetAlert
        showCancel
        show={isOkShow}
        onConfirm={() => alertHandlerOK(true)}
        onCancel={() => alertHandlerOK(false)}
        cancelBtnBsStyle="default"
        title="승인하기"
      >
        승인하시겠습니까
      </SweetAlert>

      <SweetAlert
        showCancel
        show={rejet}
        danger
        onConfirm={() => rejetHandler(true)}
        onCancel={() => rejetHandler(false)}
        cancelBtnBsStyle="default"
        title="탈퇴처리하기"
      >
        탈퇴처리 시 가이드가 판매하고있는 상품 데이터가 모두 사라집니다.
        탈퇴처리 하시겠습니까?
      </SweetAlert>
    </>
  )
}

export default GuideDtail
