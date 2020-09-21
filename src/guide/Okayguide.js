import React, { useState, useEffect } from "react"
import NewCard from "../components/common/NewCard"
import one from "../assets/images/product/1.png"
import "../assets/css/layout.css"
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios"
import Cookie from "js-cookie"
const Okayguide = () => {
  const [Outbox, setOutbox] = useState(0)
  const [Susees, setSusees] = useState(0)
  const [box, setbox] = useState(false)
  const userInfo = {
    age: "",
    area: "",
    hashtag: [""],
    registered: "",
    name: "",
    lang: "",
    email: "",
    social: "",
    profile_image: "",
    introduce: "",
    guide_license: "",
    car_license: ""
  }

  const [userData, setUserData] = useState(userInfo)

  //   const OutMasege = () => {
  //     setOutbox(1)
  //   }
  //   const HideOutMasege = () => {
  //     setOutbox(0)
  //   }
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
    form.append("guide_no", 1)
    form.append("type", 2)

    axios
      .post("/api/v1/guide/detail", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(response => {
        console.log(response)
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
            introduce: response.data.data.introduce
          })
        }
      })
      .catch(err => {
        console.log(err)
        alert("유저정보 를 불러오는데 실패했습니다.")
      })
  }, [])
  return (
    <>
      <NewCard title="가이드프로필상세" parent="가이드관리">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <h5>프로필상세 </h5>
            <div className="sues-box">활동중</div>
            {/* <div className "guide-lay">  */}
            <br />
            <br />

            <div>
              <img
                src={one}
                alt="Gallery"
                className="img-100 "
                id="guide-pro-detail"
              />
            </div>
          </div>
          <div className="profile-total-box">
            <div className="profile-top-box">
              <div className="profile-item">
                <h6>이름</h6>
              </div>
              <div className="profile-item">
                <h6>나이</h6>
              </div>

              <div className="profile-item">
                <h6>사용가능언어</h6>
              </div>
            </div>
            <div className="profile-btm-box">
              <div className="profile-item">김아무개</div>
              <div className="profile-item">20대</div>
              <div className="profile-item">중국어 영어</div>
            </div>
          </div>
          <div className="liesece-total-box">
            <div className="profile-top-box">
              <div className="profile-item">
                <h6>자격증</h6>
              </div>
              <div className="profile-item">
                <h6>운전면허증</h6>
              </div>

              <div className="profile-item">
                <h6>해시태그</h6>
              </div>
            </div>

            <div className="profile-btm-box">
              <div className="profile-item">
                {" "}
                <button className="btn btn-warning active btn-xs">
                  다운로드
                </button>
              </div>
              <div className="profile-item">
                <button className="btn btn-warning active btn-xs">
                  다운로드
                </button>
              </div>

              <div className="profile-item">
                <div className="btn btn-warning active btn-xs">해시태그</div>
                &nbsp;
                <div className="btn btn-warning active btn-xs">해시태그</div>
              </div>
            </div>
          </div>
          <div className="profile-total-box3">
            <div className="profile-top-box3">
              <div className="profile-item3">
                <h6>한줄소개</h6>
                <br />
                <div>
                  Hi. I'm a competent guide. Nice to meet you. I will explain
                  about Korea in detail.
                </div>
                <br />
                <br />
                <div>这是中文介绍文 我中文说得很好 会好好介绍韩国。</div>
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
          </div>
        </div>
        <div className="profile-total-box4">
          <div className="profile-top-box4">
            <div className="profile-item">
              <h6>매칭수</h6>
            </div>
            <div className="profile-item">
              <h6>추천수</h6>
            </div>
            <div className="profile-item">
              <h6>평점</h6>
            </div>
          </div>
          <div className="profile-btm-box4">
            <div className="profile-item">11</div>
            <div className="profile-item">12</div>
            <div className="profile-item">4.0</div>
          </div>
        </div>
        <div />

        <div className="btn-gup">
          <button className="btn btn-warning active " onClick={ShowAlert}>
            탈퇴처리
          </button>{" "}
        </div>

        {box === true && (
          <SweetAlert
            danger
            confirmBtnText="탈퇴"
            confirmBtnBsStyle="danger"
            showCancel
            title="탈퇴처리하시겠습니까?"
            onCancel={ShowAlert}
            onConfirm={ShowOkayMasege}
            focusCancelBtn
          >
            탈퇴처리시 가이드가 판매하고있는 상품데이터가 모두 사라집니다
          </SweetAlert>
        )}
        {/* {Okbox === 1 && (
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
        )} */}
        {Susees === 1 && (
          <SweetAlert
            success
            title="승인이 완료되었습니다 해당상품이 노출됩니다!"
            onConfirm={HideOkMmsege}
          >
            노출성공
          </SweetAlert>
        )}
      </NewCard>
    </>
  )
}

export default Okayguide
