import React, { useState, useEffect } from "react"
import "./style.css"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"
import GuideGoodsReview from "./GuideGoodsReview"
import SweetAlert from "react-bootstrap-sweetalert"
import { message } from "antd"

function Detail(props) {
  const [productInfo, setProductInfo] = useState({})
  const [reviewLists, setReviewLists] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [isOkShow, setOkIsShow] = useState(false)
  const [noMessage, setNoMessage] = useState("")
  const product_no = props.match.params.id
  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    // const product_no = props.match.params.id
    form.append("product_no", product_no)

    axios
      .post("/api/v1/product/detail", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setProductInfo({
            ...response.data.data.product
          })
        }
        return
      })
      .then(() => {
        const form = new FormData()
        form.append("product_no", product_no)
        form.append("index", 1)
        axios
          .post("/api/v1/product/review", form, {
            headers: {
              Authorization: Cookie.get("token")
            }
          })
          .then(response =>
            setReviewLists({
              count: response.data.data.count,
              lists: response.data.data.list
            })
          )
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

  const onNobtn = () => {
    setIsShow(!isShow)
  }

  const alertHandler = res => {
    setIsShow(!isShow)
    if (res) {
      let form = new FormData()
      form.append("product_no", product_no)
      form.append("comment", res)
      form.append("status", "REJECT")
      axios
        .post("/api/v1/product/status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("판매가 중단되었습니다.")

            history.push("/guidgoodslist")
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
      form.append("product_no", product_no)
      form.append("comment", "")
      form.append("status", "ALIVE")
      axios
        .post("/api/v1/product/status", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          if (response.data.status === "success") {
            message.success("승인되었습니다.")

            history.push("/guidgoodslist")
          }
        })
    }
  }

  return (
    <>
      <div>
        <Breadcrumb title="가이드 상품 상세" parent="가이드상품관리" />

        <div className="withing-product-detail">
          <div className="withing-product-detail__info">
            <div className="withing-product-detail__info-inner">
              <div className="withing-product-detail__label">
                <strong className="c-title">{productInfo.style}가이드</strong>
                {statusHandler(productInfo.status)}
                {productInfo.status === "ALIVE" ? (
                  <button className="withing-label type-red" onClick={onNobtn}>
                    판매중단
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div
                className="withing-product-detail__img"
                style={{
                  border: "1px solid #eaeaea"
                }}
              >
                <img src={productInfo.rep_image} alt="" />
              </div>
              <div className="withing-product-detail__title">
                <h3 className="c-title">
                  <span className="text">{productInfo.en_name}</span>
                  <span className="text">{productInfo.zn_name}</span>
                </h3>
              </div>
              <div className="withing-product-detail__price">
                <ul className="withing-product-detail__price-list">
                  {productInfo.price
                    ? productInfo.price.map(item => (
                        <li>
                          {item.hour} 시간
                          <span className="c-box">USD: {item.usd}$ </span>
                          <span className="c-box">CNY: {item.cny}元</span>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="withing-product-detail__part">
            <ul className="withing-product-detail__part-list">
              <li style={{ width: "33.3%" }}>
                <strong className="c-title">언어</strong>
                <span className="c-text">{productInfo.lang}</span>
              </li>
              <li style={{ width: "33.3%" }}>
                <strong className="c-title">지역</strong>
                <span className="c-text">{productInfo.area}</span>
              </li>
              <li style={{ width: "33.3%" }}>
                <strong className="c-title">여행스타일</strong>
                <span className="c-text">{productInfo.transportation}</span>
              </li>
              {/* <li>
                <strong className="c-title">평점</strong>
                <span className="c-text">{productInfo.average}</span>
              </li> */}
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
                <div className="guide-info-right-box2">
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

              {productInfo.status === "ALIVE" && reviewLists.count > 0 ? (
                <div className="review_box" style={{ marginTop: 100 }}>
                  <GuideGoodsReview
                    reviewList={reviewLists}
                    productNo={product_no}
                  />
                </div>
              ) : // <GuideGoodsReview reviewList={reviewList} />
              null}

              {productInfo.status === "WAIT" && (
                <div className="btn-gup-guide-goods">
                  <button
                    className="btn btn-warning active "
                    onClick={onNobtn}
                    style={{ height: 35 }}
                  >
                    승인거절
                  </button>{" "}
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
                <div className="btn-gup-guide-goods">
                  &nbsp;
                  <button
                    className="btn 
              btn-success"
                    onClick={okbtn}
                  >
                    판매재개
                  </button>
                </div>
              )}
              <SweetAlert
                input
                inputType="text"
                showCancel
                placeHolder="판매중지사유를입력해주세요"
                validationMsg="한글자이상 입력하세요"
                danger
                show={isShow}
                onConfirm={res => alertHandler(res)}
                onCancel={() => alertHandler()}
                cancelBtnBsStyle="default"
                title="판매중지"
              >
                판매중지사유를 입력해주세요
              </SweetAlert>
              <SweetAlert
                showCancel
                // placeHolder="승인하시겠습니까"
                success
                show={isOkShow}
                onConfirm={() => alertHandlerOK(true)}
                onCancel={() => alertHandlerOK(false)}
                cancelBtnBsStyle="default"
                title="승인하기"
              >
                승인하시겠습니까
              </SweetAlert>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail
