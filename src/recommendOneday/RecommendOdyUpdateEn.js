import React, { useState, useEffect } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import one from "../assets/images/user/1.jpg"
import axios from "axios"
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom"
import RecomendList from "./RecommedList"
import { message } from "antd"

const RcomendOneDayUpdate = ({ match }) => {
  const [connectList, setconnectList] = useState([])
  const [searchText, setSearchText] = useState("")
  const [guideList, setguideList] = useState([])
  const [ViewLank, setViewLank] = useState(0)
  const history = useHistory()

  useEffect(() => {
    let form = new FormData()
    console.log(match.params.id)
    form.append("rec_no", match.params.id)

    // 데이터 가져오기
    axios
      .post("/api/v1/recommend/editPageT", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(function(response) {
        setViewLank(response.data.data.z_index)
        setconnectList(response.data.data.tourData)

        // 데이터불러오는데 성공했는지 확인 if
      })
    // 데이터 가져온후에 state 바인딩
  }, [])

  const searchhandler = () => {
    if (!searchText) {
      message.warning("한글자이상입력하세요")
      return
    }

    const form = new FormData()
    form.append("index", 1)
    form.append("lang", "en")
    form.append("search", searchText)

    axios
      .post("/api/v1/recommend/searchT", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          if (response.data.data.count > 0) {
            setguideList(response.data.data.list)
          } else {
            message.warning("일치하는 가이드가 없습니다")
            setguideList([])
          }
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }
  const addBtn = (en_name, rep_image, tour_no, en_price) => {
    const userInfo = {
      en_name,
      rep_image,
      tour_no,
      en_price
    }
    setconnectList([userInfo])
  }

  const onSubmithandler = async e => {
    if (connectList.length <= 0) {
      alert(" 연결할 가이드를검색후 추가해주세요")
      return
    } else if (ViewLank === 0) {
      alert("노출순위는 1이상 지정해주세요")
      return
    }

    let form = new FormData()

    form.append("z_index", ViewLank)
    form.append("lang", "en")
    form.append("tour_no", connectList[0].tour_no)

    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/recommend/addT", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status === "success") {
        alert("성공적으로 작성되었습니다.")
        history.push("/recommendlist")
      }
    } catch (error) {
      alert("작성하는데 실패했습니다.")
    }
  }
  const onRemove = () => {
    setconnectList([])
  }
  const onReset = () => {
    setconnectList([])
    setSearchText("")
    setguideList([])
  }

  return (
    <div>
      <Breadcrumb title="추천 원데이투어 연결하기" parent="추천 가이드 관리" />

      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className=" oneday-cont">
              <div>
                {connectList.map((inFolist, index) => (
                  <>
                    <h3>추천 원데이투어 상품연결(영문)</h3>

                    <div className="oneday-sub-bar">
                      <h4>노출순위설정 </h4>
                      <div style={{ width: "20%" }}>
                        <input
                          className=" form-control"
                          type="number"
                          min="1"
                          max="99"
                          value={ViewLank}
                          defaultValue="0"
                          onChange={e => setViewLank(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="guide-info-total-box">
                      <div className="guide-info-left-box ">
                        <div className="avatar ratio">
                          <img
                            style={{
                              height: "auto",
                              border: "1px solid #eaeaea"
                            }}
                            className="b-r-8 height-80"
                            src={inFolist.rep_image}
                            alt="#"
                          />
                        </div>
                        &nbsp; &nbsp;
                        <div>
                          <h5>상품명:{inFolist.en_name}</h5>
                        </div>
                        <div style={{ marginLeft: "10%" }}>
                          <h5>USD {inFolist.en_price}</h5>
                        </div>
                        <div style={{ marginLeft: "10%" }}>
                          <h5> 가이드명 {inFolist.guideName}</h5>
                        </div>
                      </div>
                      <div className="guide-info-right-box">
                        <button
                          className="btn btn-warning active btn-sm"
                          type="button"
                          onClick={onRemove}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="oneday-seach-box2 ">
              <div className="size-box">
                <input
                  className="form-control"
                  type="text"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder="상품명을 언어에맞게 입력해주세요"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      searchhandler()
                    }
                  }}
                />

                <i className="fa fa-search fa-2x" onClick={searchhandler} />
              </div>

              {guideList &&
                guideList.map((list, index) => (
                  <div className="onday-total-box2">
                    <div className="onday-left-box2">
                      <img
                        style={{ height: "auto", border: "1px solid #eaeaea" }}
                        className="img-100 b-r-15"
                        src={list.rep_image}
                        alt="#"
                      />
                      &nbsp; &nbsp;
                      <div>상품명 {list.en_name}</div>
                      <div style={{ marginLeft: "40%" }}>
                        USD {list.en_price}
                      </div>
                      <div style={{ marginLeft: "20%" }}>
                        가이드명 {list.guide_name}
                      </div>
                    </div>
                    <div className="oneday-right-box2">
                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        onClick={() =>
                          addBtn(
                            list.en_name,
                            list.rep_image,
                            list.tour_no,
                            list.guide_name,
                            list.en_price
                          )
                        }
                      >
                        추가
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="btn-div">
              <button
                className="btn btn-warning active btn-sm"
                type="button"
                onClick={onReset}
              >
                초기화
              </button>
              &nbsp; &nbsp;
              <button
                className="btn btn-secondary btn-sm"
                onClick={onSubmithandler}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// function MachingG() {
//   const [searchText, setSearchText] = useState("")
//   const [guideList, setguideList] = useState([])
//   const [connectList, setconnectList] = useState([])
//   const history = useHistory()
//   const searchhandler = () => {
//     if (!searchText) {
//       alert("한글자이상입력하세요")
//       return
//     }

//     const form = new FormData()
//     form.append("index", 1)
//     form.append("lang", "en")
//     form.append("search", searchText)

//     axios
//       .post("/api/v1/recommend/searchT", form, {
//         headers: {
//           Authorization: Cookie.get("token")
//         }
//       })
//       .then(response => {
//         console.log(response)
//         if (response.data.status === "success") {
//           if (response.data.data.count > 0) {
//             setguideList(response.data.data.list)
//           } else {
//             alert("일치하는 가이드가 없습니다")
//             setguideList([])
//           }
//         }
//       })
//       .catch(err => {
//         alert("검색한데이터를 불러오지못했습니다")
//       })
//   }
//   return (
//     <>
//       {" "}
//       <div className="oneday-seach-box2 ">
//         <div className="size-box">
//           <input
//             className="form-control"
//             type="text"
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//             placeholder="가이드의 이름을 한글로입력해주세요"
//             onKeyDown={e => {
//               if (e.key === "Enter") {
//                 searchhandler()
//               }
//             }}
//           />

//           <i className="fa fa-search fa-2x" onClick={searchhandler} />
//         </div>

//         {guideList.map((lists, index) => (
//           <div className="onday-total-box2">
//             <div className="onday-left-box2">
//               <img className="img-50 b-r-15" src={lists.rep_image} alt="#" />
//               &nbsp; &nbsp;
//               <div>
//                 가격 : {lists.en_price}/상품명누락/Name :{lists.en_name}
//               </div>
//             </div>
//             <div className="oneday-right-box2">
//               <button
//                 className="btn btn-secondary btn-sm"
//                 type="button"
//                 onClick={() => {
//                   history.push(`/recomdoned/cnt/${lists.tour_no}`)
//                 }}
//               >
//                 추가
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }
export default RcomendOneDayUpdate
