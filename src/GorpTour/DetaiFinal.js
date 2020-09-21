import React, { useState, useEffect } from "react"
import "./style.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import cookie from "js-cookie"
import ReviewBox from "./ReviewBox"
import { useHistory } from "react-router-dom"

function Detail(props) {
  const [productInfo, setProductInfo] = useState({})
  const [review, setReview] = useState([])
  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    const tour_no = props.match.params.id
    form.append("tour_no", tour_no)

    axios
      .post("/api/v1/tour/detail", form, {
        headers: {
          Authorization: cookie.get("token")
        }
      })
      .then(response => {
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

  const statusHandler = status => {
    let statusTag
    if (status === "REJECT") {
      statusTag = <span className="withing-label type-red">승인거절</span>
    } else if (status === "WAIT") {
      statusTag = <span className="withing-label">승인대기중</span>
    } else if (status === "ALIVE") {
      statusTag = <span className="withing-label type-point">판매중</span>
    } else {
      statusTag = <span className="withing-label type-red">판매중지</span>
    }

    return statusTag
  }

  return (
    <>
      <div>
        <Breadcrumb title="단체투어상품 상세페이지" parent="프라이빗상품관리" />
        <div className="withing-product-detail">
          {/* <!-- <div className="withing-main-title__wrap type3">
                <div className="withing-main-title__inner">
                    <h2 className="withing-main-title__title"><span className="title">가이드상품 상세보기</span></h2>
                    <div className="withing-main-title__edit">
                        <a href="#" className="withing-cta type-red"><span className="text">삭제</span></a>
                    </div>
                </div>
            </div> --> */}
          <div className="withing-product-detail__info">
            <div className="withing-product-detail__info-inner">
              <div className="withing-product-detail__label">
                <strong className="c-title" />
                {statusHandler(productInfo.status)}
              </div>
              <div className="withing-product-detail__img">
                <img
                  src="https://ps-service-the-build.s3.ap-northeast-2.amazonaws.com/res/ps_2020_04_01_13_33_16_600_501.png"
                  alt=""
                />
              </div>
              <div className="withing-product-detail__title">
                <h3 className="c-title">
                  <span className="text">가이드명</span>
                  <span className="text">{productInfo.en_name}</span>
                  <span className="text">{productInfo.zh_name}</span>
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
              <li style={{ width: "30%" }}>
                <strong className="c-title">언어</strong>
                <span className="c-text">{productInfo.lang}</span>
              </li>
              <li style={{ width: "30%" }}>
                <strong className="c-title">지역</strong>
                <span className="c-text">{productInfo.area}</span>
              </li>
              <li style={{ width: "30%" }}>
                <strong className="c-title">여행스타일</strong>
                <span className="c-text">{productInfo.transportation}</span>
              </li>
            </ul>
          </div>
          <div className="withing-product-detail__desc">
            <div className="withing-product-detail__desc-inner">
              <h4 className="withing-product-detail__desc-title">설명</h4>
              <p className="withing-product-detail__desc-text">
                {productInfo.en_paln}
              </p>
              <p className="withing-product-detail__desc-text">
                {productInfo.zh_plan}
              </p>
              <h4 className="withing-product-detail__desc-title">
                출발지 안내
              </h4>
              <p className="withing-product-detail__desc-text">
                {productInfo.en_start_info}
              </p>
              <p className="withing-product-detail__desc-text">
                {productInfo.zh_start_info}
              </p>
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
        </div>
      </div>
    </>
  )
}

export default Detail
