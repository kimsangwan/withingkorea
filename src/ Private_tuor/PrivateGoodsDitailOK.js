import React, { useState } from "react"
import NewCard from "../components/common/NewCard"
import Breadcrumb from "../components/common/breadcrumb"
import one from "../assets/images/product/1.png"
import "../assets/css/layout.css"
import SweetAlert from "react-bootstrap-sweetalert"
import Lightbox from "react-image-lightbox"
import Timeline1 from "../components/timelines/timeline1"
const images = [
  require("../assets/images/big-lightgallry/013.jpg"),
  require("../assets/images/big-lightgallry/014.jpg"),
  require("../assets/images/big-lightgallry/015.jpg"),
  require("../assets/images/big-lightgallry/016.jpg"),
  require("../assets/images/big-lightgallry/01.jpg"),
  require("../assets/images/big-lightgallry/04.jpg"),
  require("../assets/images/big-lightgallry/05.jpg"),
  require("../assets/images/big-lightgallry/06.jpg"),
  require("../assets/images/big-lightgallry/07.jpg"),
  require("../assets/images/big-lightgallry/08.jpg"),
  require("../assets/images/big-lightgallry/07.jpg"),
  require("../assets/images/big-lightgallry/08.jpg")
]

const smallImages = [
  require("../assets/images/lightgallry/013.jpg"),
  require("../assets/images/lightgallry/015.jpg"),
  require("../assets/images/lightgallry/014.jpg"),
  require("../assets/images/lightgallry/016.jpg"),
  require("../assets/images/lightgallry/01.jpg"),
  require("../assets/images/lightgallry/04.jpg"),
  require("../assets/images/lightgallry/05.jpg"),
  require("../assets/images/lightgallry/06.jpg"),
  require("../assets/images/lightgallry/07.jpg"),
  require("../assets/images/lightgallry/08.jpg"),
  require("../assets/images/lightgallry/07.jpg"),
  require("../assets/images/lightgallry/08.jpg")
]
const PrivateGoodsDitailOK = () => {
  const [Okbox, setOkbox] = useState(0)
  const [susees, setsusees] = useState(0)
  const [Outbox, setOutbox] = useState(0)
  const [Susees, setSusees] = useState(0)
  const [box, setbox] = useState(false)
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
  const [modal, setmodal] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [opengidue, setopengide] = useState(false)
  const SizeUp = () => {
    setIsOpen(true)
    setPhotoIndex(1)
  }

  const Onhide = () => {
    setmodal(3)
  }
  return (
    <>
      <Breadcrumb title="프라이빗상품 상세보기" parent="프라이빗상품관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="img-box">
                  <img src={one} />
                </div>
                <div className="text-box-guide-ok">
                  <div className="text-menu-box">
                    <div>도보가이드</div>
                    <div className="sues-box-guide-ok">판매중</div>
                  </div>
                  <div className="stop-box">
                    <button
                      className="btn btn-warning active "
                      onClick={ShowAlert}
                    >
                      판매중지
                    </button>
                  </div>
                </div>

                <div className="title-box-hd">
                  <div>
                    <h4>영문제목</h4>
                  </div>
                  <div>
                    <h4>중문제목</h4>
                  </div>
                </div>
                <div className="price-box">
                  <div> 달러 | 위안 </div>
                  <div> 달러| 위안 </div>
                  <div>| 위안 </div>
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

                      <div className="profile-item">
                        <h5>평점</h5>
                      </div>
                    </div>
                    <div className="goods-btm-box">
                      <div className="profile-item">중국어 영어</div>
                      <div className="profile-item">지역</div>
                      <div className="profile-item">액티비티/관광</div>
                      <div className="profile-item">4.0 </div>
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
                    Creative Direction, User Experience, Visual Design, Project
                    Management, Team Leading
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
                    Creative Direction, User Experience, Visual Design, Project
                    Management, Team Leading
                  </div>
                  <div className="exmbox">
                    <h5>불포함내용</h5>
                    <div>
                      Creative Direction, User Experience, Visual Design,
                      Project Management, Team Leading
                    </div>
                    <p />
                    <div>
                      Creative Direction, User Experience, Visual Design,
                      Project Management, Team Leading
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
                      Creative Direction, User Experience, Visual Design,
                      Project Management, Team Leading
                    </div>
                  </div>
                  <div className="guide-sub-info">
                    <h5>가이드 정보</h5>
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
                      <>
                        <div className="guide-total-box2">
                          <div className="guide-left-box2">
                            <img className="img-50 b-r-15" src={one} alt="#" />
                            &nbsp; &nbsp;
                            <div>
                              가이드명/나이/언어/지역/매칭수/추천수/평점
                            </div>
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
                        <div className="review-main-bar">
                          <h5>후기</h5>
                          <div className="table-responsive">
                            <div className="review-bar">
                              <table>
                                <thead>
                                  <tr>
                                    <td>날짜</td>
                                    <td>후기내용들어갈자리</td>
                                    <td />
                                    <td />
                                    <td />

                                    <td>
                                      <img
                                        src={one}
                                        alt="Gallery"
                                        className="img-50 b-r-15"
                                        onClick={SizeUp}
                                      />
                                      &nbsp;
                                      <img
                                        src={one}
                                        alt="Gallery"
                                        className="img-50 b-r-15"
                                        onClick={SizeUp}
                                      />
                                      &nbsp;
                                      <img
                                        src={one}
                                        alt="Gallery"
                                        className="img-50 b-r-15"
                                        onClick={SizeUp}
                                      />
                                      &nbsp;
                                      {/* <button
              className=" btn btn-danger btn-xs"
              onClick={Onhide}
            >
              숨기기
            </button> */}
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="guide-total-box2">
                      {box === true && (
                        <SweetAlert
                          danger
                          confirmBtnText="판매중지 "
                          confirmBtnBsStyle="danger"
                          showCancel
                          title="판매중지 하시겠습니까?
                          "
                          onCancel={ShowAlert}
                          onConfirm={ShowOkayMasege}
                          focusCancelBtn
                        >
                          판매중지 처리시판매하고있는 상품데이터가 모두
                          사라집니다
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
                          title="판매중지 처리가완료되었습니다"
                          onConfirm={HideOkMmsege}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            imageTitle={photoIndex + 1 + "/" + images.length}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              setPhotoIndex({
                photoIndex: (photoIndex + 1) % one.length
              })
            }
          />
        )}
      </div>
    </>
  )
}

export default PrivateGoodsDitailOK
