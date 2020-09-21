import React, { useState, useEffect } from "react"
import "./style.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import cookie from "js-cookie"
import ReviewBox from "./ReviewBox"
import { message } from "antd"
import { Link, useHistory } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component"
import { Edit, Video, Image, Activity } from "react-feather"
import "react-vertical-timeline-component/style.min.css"

function Detail(props) {
  const [productInfo, setProductInfo] = useState({})
  const [review, setReview] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [isOkShow, setOkIsShow] = useState(false)
  const [noMessage, setNoMessage] = useState("")
  const history = useHistory()
  const tourNo = props.match.params.id
  useEffect(() => {
    let form = new FormData()

    form.append("tour_no", tourNo)

    axios
      .post("/api/v1/secret/detail", form, {
        headers: {
          Authorization: cookie.get("token")
        }
      })
      .then(response => {
        console.log(response)
        if (response.data.status === "success") {
          setProductInfo({
            ...response.data.data
          })
          if (response.data.data.review) {
            setReview([...response.data.data.review])
          }
        }
      })
  }, [])
  const OutBtn = () => {
    if (window.confirm("회원을 탈퇴처리하시겠습니까?")) {
      let form = new FormData()
      form.append("guide_no", props.match.params.id)
      axios
        .post("/api/v1/guide/black", form, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            alert("탈퇴되었습니다")
            // history.push("/guidelist")
          }
        })
    }
  }
  const statusHandler = status => {
    let statusTag
    if (status === "REJECT") {
      statusTag = <span className="withing-label type-red">승인거절</span>
    } else if (status === "WAIT") {
      statusTag = <span className="withing-label">승인대기중</span>
    } else if (status === "ALIVE") {
      statusTag = <span className="withing-label type-point">판매중</span>
    } else if (status === "HOLD") {
      statusTag = <span className="withing-label type-red">일시중지</span>
    } else {
      statusTag = <span>판매중지</span>
    }

    return statusTag
  }

  const onNobtn = () => {
    setIsShow(!isShow)
  }

  const alertHandler = res => {
    setIsShow(!isShow)
    if (res) {
      let form = new FormData()
      form.append("tour_no", tourNo)
      form.append("comment", res)
      form.append("status", "REJECT")
      axios
        .post("/api/v1/secret/status", form, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(response => {
          console.log(response)
          if (response.data.status === "success") {
            message.success("판매가 중단되었습니다.")

            history.push("/priviatgoodslist")
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
      form.append("tour_no", tourNo)
      form.append("comment", "")
      form.append("status", "ALIVE")
      axios
        .post("/api/v1/secret/status", form, {
          headers: { Authorization: cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("승인되었습니다.")

            history.push("/priviatgoodslist")
          }
        })
    }
  }
  return (
    <>
      <div>
        <Breadcrumb title="프라이빗 상품 상세" parent="상품관리" />
        <div className="withing-product-detail">
          <div className="withing-product-detail__info">
            <div className="withing-product-detail__info-inner">
              <div className="withing-product-detail__label">
                <strong className="c-title">{productInfo.style}가이드</strong>
                {statusHandler(productInfo.status)}
              </div>
              <div className="withing-product-detail__img">
                <img
                  style={{
                    height: "auto",
                    border: "1px solid #eaeaea"
                  }}
                  src={productInfo.rep_image}
                  alt=""
                />
              </div>
              <div className="withing-product-detail__title">
                <h3 className="c-title">
                  <span className="text">{productInfo.en_name}</span>
                  <span className="text">{productInfo.zn_name}</span>
                </h3>
              </div>
              <div className="withing-product-detail__price">
                <ul className="withing-product-detail__price-list">
                  <li>
                    {productInfo.hour} 시간
                    <span className="c-box">USD: {productInfo.en_price}$ </span>
                    <span className="c-box">CNY: {productInfo.zh_price}元</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="withing-product-detail__part">
            <ul className="withing-product-detail__part-list">
              <li style={{ width: "25%" }}>
                <strong className="c-title">언어</strong>
                <span className="c-text">{productInfo.lang}</span>
              </li>
              <li style={{ width: "25%" }}>
                <strong className="c-title">지역</strong>
                <span className="c-text">{productInfo.area}</span>
              </li>
              <li style={{ width: "25%" }}>
                <strong className="c-title">여행스타일</strong>
                <span className="c-text">{productInfo.transportation}</span>
              </li>
              <li style={{ width: "25%" }}>
                <strong className="c-title">평점</strong>
                <span className="c-text">{productInfo.average}</span>
              </li>
            </ul>
          </div>
          <div className="withing-product-detail__desc">
            <div className="withing-product-detail__desc-inner">
              {productInfo.plan ? (
                <>
                  <h4 className="withing-product-detail__desc-title">일정</h4>
                  <Timeline productInfo={productInfo} />
                </>
              ) : (
                <h4 className="withing-product-detail__desc-title">
                  일정 현황이 게시되지않았습니다
                </h4>
              )}

              <h4 className="withing-product-detail__desc-title">
                출발지 안내
              </h4>
              <p className="withing-product-detail__desc-text" />
              <p className="withing-product-detail__desc-text" />
              <h4 className="withing-product-detail__desc-title">포함 내용</h4>
              <p className="withing-product-detail__desc-text">
                {productInfo.en_include}
              </p>
              <p className="withing-product-detail__desc-text">
                {productInfo.zh_include}
              </p>
              <h4 className="withing-product-detail__desc-title">
                불포함 내용
              </h4>
              <p className="withing-product-detail__desc-text">
                {productInfo.en_except}
              </p>
              <p className="withing-product-detail__desc-text">
                {productInfo.zh_except}
              </p>
              <h4 className="withing-product-detail__desc-title">비용 안내</h4>
              <p className="withing-product-detail__desc-text">
                {productInfo.en_cost}
              </p>
              <p className="withing-product-detail__desc-text">
                {productInfo.zh_cost}
              </p>
              <h4 className="withing-product-detail__desc-title">가이드정보</h4>
              <div
                className="guide-info-total-box"
                style={{
                  height: "auto",
                  border: "1px solid #eaeaea",
                  padding: "Opx"
                }}
              >
                <div className="guide-info-left-box">
                  <img
                    style={{ height: "auto", border: "1px solid #eaeaea" }}
                    className="img-100 b-r-15"
                    src={productInfo.rep_image}
                    alt="#"
                  />
                  &nbsp; &nbsp;
                  <div style={{ marginLeft: "5%" }}>
                    {" "}
                    가이드명 /나이/언어:{productInfo.lang}/지역:
                    {productInfo.area}/매칭수/
                    {productInfo.average}
                  </div>
                </div>
                <div className="guide-info-right-box">
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={() => {
                      history.push(`/guideditail/${productInfo.guide_no}`)
                    }}
                  >
                    보기
                  </button>
                </div>
              </div>
              {productInfo.status === "ALIVE" ? (
                <ReviewBox reviewList={review} />
              ) : null}
            </div>
          </div>
          <SweetAlert
            input
            inputType="text"
            showCancel
            placeHolder="판매중지사유를입력해주세요"
            validationMsg="한글자이상 입력하세요"
            danger
            show={isShow}
            onConfirm={okay => alertHandler(okay)}
            onCancel={() => alertHandler()}
            cancelBtnBsStyle="default"
            title="판매중지"
          >
            거절사유를 입력해주세요
          </SweetAlert>{" "}
          <SweetAlert
            showCancel
            // placeHolder="승인하시겠습니까"
            // // danger
            show={isOkShow}
            onConfirm={() => alertHandlerOK(true)}
            onCancel={() => alertHandlerOK(false)}
            cancelBtnBsStyle="default"
            title="승인하기"
          >
            승인하시겠습니까
          </SweetAlert>
        </div>
        {productInfo.status === "ALIVE" && (
          <div className="btn-gup">
            <button
              className="btn btn-warning active "
              onClick={onNobtn}
              style={{ height: 35 }}
            >
              탈퇴처리
            </button>
          </div>
        )}
        {productInfo.status === "WAIT" && (
          <div className="btn-gup">
            <button
              className="btn btn-warning active "
              onClick={onNobtn}
              style={{ height: 35 }}
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
        {productInfo.status === "HOLD" && (
          <div className="btn-gup">
            <button
              className="btn 
              btn-success"
              onClick={okbtn}
            >
              판매 재개
            </button>
          </div>
        )}
      </div>
    </>
  )
}

const Timeline = props => {
  return (
    <>
      <VerticalTimeline>
        {props.productInfo.plan &&
          props.productInfo.plan.map((data, index) => (
            <>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                animate={true}
                date={data.time}
                icon={<Edit />}
              >
                <h4 className="vertical-timeline-element-subtitle">
                  schedule content
                </h4>
                <p>{data.en_explain}</p>
                <p>{data.zh_explain}</p>
              </VerticalTimelineElement>
              {data.rep_image && (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2008 - 2010"
                  animate={true}
                  icon={<Image />}
                >
                  <h4 className="vertical-timeline-element-subtitle">
                    Tour_Imge
                  </h4>
                  <img
                    className="img-fluid p-t-20"
                    src={data.rep_image}
                    alt="timelineImg1"
                  />
                </VerticalTimelineElement>
              )}
            </>
          ))}
      </VerticalTimeline>
    </>
  )
}

export default Detail
