import React, { useState } from "react"
import NewCard from "../components/common/NewCard"
import Breadcrumb from "../components/common/breadcrumb"
import one from "../assets/images/product/1.png"
import "../assets/css/layout.css"
import SweetAlert from "react-bootstrap-sweetalert"
import Timeline1 from "../components/timelines/timeline1"
const PrivateGoodsDitail = () => {
  const [Okbox, setOkbox] = useState(0)
  const [susees, setsusees] = useState(0)
  const [opengidue, setopengide] = useState(false)

  const showMasege = () => {
    setOkbox(1)
  }
  const noshowMasege = () => {
    setOkbox(0)
  }
  const okayMasege = () => {
    setsusees(1)
  }
  const okayMmsegebtn = () => {
    setsusees(0)
  }
  return (
    <>
      <Breadcrumb title="단체투어 상세 페이지" parent="상품관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="img-box">
                  <img src={one} />
                </div>
                <div className="text-box-guide">
                  <div>도보가이드</div>
                  <div className="sues-box-guide">승인대기</div>
                  <div />
                </div>
                <div className="title-box-hd">
                  <div>
                    <h4>영문제목</h4>
                  </div>
                  <div>
                    <h4>영문제목</h4>
                  </div>
                </div>
                <div className="price-box">
                  <div>6시간 달러 | 위안 </div>
                  {/* <div>8시간 달러 | 위안 </div>
                  <div>10시간 달러| 위안 </div> */}
                </div>
                <div className="privit-total-box">
                  <div className="goods-total-box">
                    <div className="goods-top-box">
                      <div className="profile-item">
                        <h5>언어</h5>
                      </div>
                      <div className="profile-item">
                        <h5>지역</h5>
                      </div>

                      <div className="profile-item">
                        <h5>투어스타일</h5>
                      </div>
                    </div>
                    <div className="goods-btm-box">
                      <div className="profile-item">중국어 영어</div>
                      <div className="profile-item">지역</div>
                      <div className="profile-item">액티비티/관광</div>
                    </div>
                  </div>
                </div>

                <div className="exmbox">
                  <h5>설명</h5>
                  <div>
                    Creative Direction, User Experience, Visual Design, Project
                    Management, Team Leading
                  </div>
                  <p />
                  <div>
                    这里用中文说明的内容，祝您旅途愉快
                    这次旅行的日程可以商量调整，请参考细节。
                  </div>
                </div>
                <div className="timeline-box">
                  <h5>일정</h5>
                  <Timeline1 />
                </div>
                <div className="exmbox">
                  <h5>출발지안내</h5>
                  <div>
                    Creative Direction, User Experience, Visual Design, Project
                    Management, Team Leading
                  </div>
                  <p />
                  <div>
                    这里用中文说明的内容，祝您旅途愉快
                    这次旅行的日程可以商量调整，请参考细节。
                  </div>
                  <div className="exmbox">
                    <h5>불포함내용</h5>
                    <div>
                      Creative Direction, User Experience, Visual Design,
                      Project Management, Team Leading
                    </div>
                    <p />
                    <div>
                      这里用中文说明的内容，祝您旅途愉快
                      这次旅行的日程可以商量调整，请参考细节。
                    </div>
                  </div>
                  <div className="exmbox">
                    <h5>비용안내</h5>
                    <div>
                      Creative Direction, User Experience, Visual Design,
                      Project Management, Team Leading
                    </div>
                    <p />
                    <div>
                      这里用中文说明的内容，祝您旅途愉快
                      这次旅行的日程可以商量调整，请参考细节。?
                    </div>
                  </div>
                  <div className="guide-sub-info">
                    <h5>가이드정보 </h5>
                  </div>
                  <div className="view-btn">
                    <button
                      className="btn btn-warning btn-sm"
                      type="button"
                      onClick={() => {
                        setopengide(!opengidue)
                      }}
                    >
                      {opengidue ? " 가이드 정보 접기" : "가이드 정보 보기"}
                    </button>
                  </div>
                  {opengidue === true && (
                    <div className="guide-total-box2">
                      <div className="guide-left-box2">
                        <img className="img-50 b-r-15" src={one} alt="#" />
                        &nbsp; &nbsp;
                        <div>가이드명/나이/언어/지역/매칭수/추천수/평점</div>
                      </div>
                      <div className="guide-right-box2">
                        <button
                          className="btn btn-secondary btn-sm"
                          type="button"
                        >
                          보기
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="guide-seach-box2 ">
                    {/* <input
                className="form-control"
                type="text"
                placeholder="가이드의 이름을 한글로입력해주세요"
              ></input> */}
                  </div>
                  <div className="btn-gup">
                    <button
                      className="btn btn-warning active "
                      onClick={showMasege}
                    >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivateGoodsDitail
