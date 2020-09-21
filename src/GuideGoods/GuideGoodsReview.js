import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom"
import Pagenation from "../util/Pagenation"
const GuideGoodsReview = props => {
  const [nomalList, setNomalList] = useState([])
  const history = useHistory()

  useEffect(() => {
    setNomalList(props.reviewList.lists)
  }, [props.reviewList])

  const fn = async d => {
    let form = new FormData()
    form.append("index", d)
    form.append("product_no", props.productNo)

    try {
      const { data } = await axios.post("/api/v1/product/review", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setNomalList(data.data.list)
        console.log(setNomalList)
      }
    } catch (error) {
      alert("작성하는데 실패했습니다.")
    }

    // 이전 다음 페이지를 위한 api호출
    // axios로 서버 통신
    // success시 nomalList 업데이트
  }
  const onNobtn = () => {
    const rejectMessage = prompt("거절사유", "입력바랍니다.")
    let form = new FormData()
    form.append("guide_no", props.productNo)
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

  return (
    <div>
      <h4 className="withing-product-detail__desc-title">후기</h4>
      <div className="withing-product-detail__review">
        <ul className="withing-product-detail__review-list">
          {nomalList ? (
            <>
              {nomalList.map(reviewlists => (
                <li className="withing-product-detail__review-item">
                  <div className="withing-product-detail__review-link">
                    <div className="withing-product-detail__review-num">
                      <span className="c-num"> </span>
                    </div>
                    <div className="withing-product-detail__review-date">
                      <span className="c-date">{reviewlists.registered}</span>
                    </div>
                    <div className="withing-product-detail__review-name">
                      <span className="c-name">{reviewlists.nickname}</span>
                    </div>
                    <div className="withing-product-detail__review-text">
                      <p className="c-text">{reviewlists.comment}</p>
                    </div>
                    <div className="withing-product-detail__review-img">
                      <a href="#" className="c-img">
                        <img
                          src={
                            "https://ps-service-the-build.s3.ap-northeast-2.amazonaws.com/res/gf_2020_08_27_17_44_26_66_846.jpg"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </li>
              ))}

              <Pagenation data={props.reviewList} fn={fn} />
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  )
}

export default GuideGoodsReview
