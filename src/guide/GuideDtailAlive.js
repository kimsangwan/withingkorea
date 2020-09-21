import React, { useState, useEffect } from "react"
import NewCard from "../components/common/NewCard"
import one from "../assets/images/product/1.png"
import "../assets/css/layout.css"
import SweetAlert from "react-bootstrap-sweetalert"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import { Link, useHistory } from "react-router-dom"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"

const GuideDtail = ({ match }) => {
  const [Okbox, setOkbox] = useState(0)
  const [susees, setsusees] = useState(0)
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
    form.append("type", 2)

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
        alert("유저정보 를 불러오는데 실패했습니다.")
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
          console.log(response)
          if (response.data.status === "success") {
            alert("승인되었습니다")
            history.push("/guidelist")
          }
        })
    }
  }
  const onNobtn = () => {
    const rejectMessage = prompt("거절사유", "입력바랍니다.")
    let form = new FormData()
    form.append("guide_no", match.params.id)
    form.append("comment", rejectMessage)
    form.append("status", "REJECT")
    axios
      .post("/api/v1/guide/status", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(response => {
        console.log(response)
        if (response.data.status === "success") {
          alert("거절되었습니다")
          history.push("/guidelist")
        }
      })
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
        title="가이드 프로필상세"
        parent="가이드관리
     "
      />

      <div className="withing-product-detail__info">
        <div className="withing-product-detail__info-inner">
          <div className="withing-product-detail__label">
            {/* <strong className="c-title"> 가이드명 :{userData.style}</strong> */}

            {statusHandler(userData.status)}
            {console.log(userData)}
          </div>
          <div className="withing-product-detail__img">
            <img src={userData.profile_image} alt="" />
          </div>
          <div className="withing-product-detail__title">
            <h3 className="c-title">
              <span className="text">가이드 이름</span>
              <span className="text">중문:{userData.en_name}</span>
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
          <li>
            <strong className="c-title">자격증</strong>

            <img className="img-100 b-r-15" src={userData.guide_image} />
          </li>

          <li>
            <strong className="c-title">운전면허증</strong>
            <img className="img-100 b-r-15" src={userData.car_license} />
          </li>
          <li>
            <strong className="c-title">해시태그</strong>
            {userData.hashtag.map(a => (
              <>
                <br />
                <div
                  className="withing-label type-point"
                  style={{ margin: "0 5px 5px 0" }}
                >
                  {a}
                </div>
                <br />
              </>
            ))}
          </li>
          {/* <li>
            <strong className="c-title">평점</strong>
            <span className="c-text">{productInfo.average}</span>
          </li> */}
        </ul>
      </div>
      <div className="withing-product-detail__desc">
        <div className="withing-product-detail__desc-inner">
          <h4 className="withing-product-detail__desc-title">한줄소개</h4>
          <p className="withing-product-detail__desc-text" />
          렛미인투로듀스 마이셀프렛미인투로듀스 마이셀프렛미인투로듀스
          마이셀프렛미인투로듀스 마이셀프렛미인투로듀스 마이셀프렛미인투로듀스
          마이셀프렛미인투로듀스 마이셀프렛미인투로듀스 마이셀프
          {userData.introduce}
          <p />
          {/* {productInfo.status === "ALIVE" ? (
                <ReviewBox reviewList={review} />
              ) : null} */}
        </div>
      </div>
      {/* <div className="profile-btm-box3"> */}
      {/* </div> */}
      {/* <div className="profile-btm-box-3">
  <div className="profile-item">
    这里用中文说明的内容，祝您旅途愉快
    这次旅行的日程可以商量调整，请参考细节。
  </div>
</div> */}

      {/* <div className="btn-gup">
            <button className="btn btn-warning active " onClick={showMasege}>
              승인거절
            </button>{" "}
            &nbsp;
            <button
              className="btn 
              btn-success"
              onClick={okayMasege}
            >
              승인완료
            </button>
          </div>

          <div />
        </div>
      </div>
      {Okbox === 1 && (
        <SweetAlert
          input
          showCancel
          cancelBtnBsStyle="default"
          title="승인거절"
          placeHolder="Write something"
          validationMsg="한글자이상 입력하세요"
          onConfirm={noshowMasege}
          onCancel={noshowMasege}
        >
          거절사유를 입력해주세요
        </SweetAlert>
      )}
      {susees === 1 && (
        <SweetAlert
          success
          title="승인이 완료되었습니다 해당상품이 노출됩니다!"
          onConfirm={okayMmsegebtn}
        >
          노출성공
        </SweetAlert>
      )}
    </> */}
      <div className="btn-gup">
        <button
          className="btn btn-warning active "
          onClick={onNobtn}
          style={{ height: "35px" }}
        >
          판매중지
        </button>{" "}
        &nbsp;
        {/* <button
          className="btn 
              btn-success"
          onClick={() => Okstatus()}
        >
          승인완료
        </button> */}
      </div>
    </>
  )
}

export default GuideDtail
