import React from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"

// import { reduceHooks } from 'react-table';
const RecommendGuide = () => {
  return (
    <div>
      <Breadcrumb title="추천 가이드 연결하기" parent="추천 원데이투어 관리" />

      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className="sub-bar">
              <h6>추천가이드연결</h6>
              <div>
                <select className="form-control digit">
                  <option value="select">1</option>
                  <option value="First">2</option>
                  <option value="Second">3</option>
                  <option value="Third">4</option>
                </select>
              </div>
            </div>
            <div className="cont-guide">
              <h6>원데이투어 상품연결</h6>
              <div>
                <div className="guide-bar">
                  <div className="guide-img">
                    <image src="">이미지 박스</image>
                    &nbsp; &nbsp;<div>가이드명/나이/언어/가이드명</div>
                  </div>
                  <div className="guide-sub-item">
                    <button
                      className="btn btn-warning active btn-sm"
                      type="button"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="guide-onday2 ">
              <input
                className="form-control"
                type="text"
                placeholder="가이드의 이름을 한글로입력해주세요"
              />

              <div className="guide-bar2">
                <div className="guide-img2">
                  <image src="">이미지박스</image>
                  &nbsp; &nbsp;<div>가이드명/나이/언어/가이드명</div>
                </div>
                <div className="guide-sub-item2">
                  <button className="btn btn-secondary btn-sm" type="button">
                    추가
                  </button>
                </div>
              </div>
            </div>
            <div className="btn-div">
              <button className="btn btn-secondary btn-sm" type="button">
                삭제
              </button>
              &nbsp; &nbsp;
              <button className="btn btn-secondary btn-sm">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendGuide
