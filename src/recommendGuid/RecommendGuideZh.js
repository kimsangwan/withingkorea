import React, { useState, useEffect } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom"
import { message } from "antd"
// import { reduceHooks } from 'react-table';
const RecommendGuideZh = () => {
  const [connectList, setconnectList] = useState([])
  const [searchText, setSearchText] = useState("")
  const [guideList, setguideList] = useState([])
  const [ViewLank, setViewLank] = useState(0)
  const history = useHistory()

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
      .post("/api/v1/recommend/searchG", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        console.log(response)
        if (response.data.status === "success") {
          if (response.data.data.count > 0) {
            setguideList(response.data.data.list)
          } else {
            message.warning("일치하는 가이드가 없습니다")
            setguideList([])
          }
          console.log(guideList)
        }
      })
      .catch(err => {
        message.warning("검색한데이터를 불러오지못했습니다")
      })
  }

  const addBtn = (name, profile_img, guide_no, age, lang) => {
    const userInfo = {
      name,
      profile_img,
      guide_no,
      age,
      lang
    }
    setconnectList([userInfo])
  }

  const onSubmithandler = async e => {
    if (connectList.length <= 0) {
      message.warning(" 연결할 가이드를검색후 추가해주세요")
      return
    } else if (ViewLank === 0) {
      message.warning("노출순위는 1이상 지정해주세요")
      return
    }

    let form = new FormData()

    form.append("z_index", ViewLank)
    form.append("lang", "zh")
    form.append("guide_no", connectList[0].guide_no)

    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/recommend/addG", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status === "success") {
        message.success("성공적으로 작성되었습니다.")
        history.push("/recommendguidelist")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
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
      <Breadcrumb title="추천 가이드연결하기" parent="메인관리" />

      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className=" oneday-cont">
              <div>
                {connectList.map((inFolist, index) => (
                  <>
                    <h3>추천 원데이투어 상품연결</h3>

                    <div className="oneday-sub-bar">
                      <h3>노출순위</h3>
                      <div>
                        <input
                          className=" form-control"
                          type="number"
                          min="1"
                          max="99"
                          defaultValue="0"
                          onChange={e => setViewLank(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="onday-total-box">
                      <div className="guide-left-box">
                        <div className="avatar ratio">
                          <img
                            className="b-r-8 height-80"
                            src={inFolist.profile_img}
                            alt="#"
                          />
                        </div>
                        &nbsp; &nbsp;
                        <h2>
                          가이드명:{inFolist.name}/나이:{inFolist.age}/언어:
                          {inFolist.lang}
                        </h2>
                      </div>
                      <div className="onday-right-box">
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
                  placeholder="가이드의 이름을 영어로 입력해주세요"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      searchhandler()
                    }
                  }}
                />

                <i className="fa fa-search fa-2x" onClick={searchhandler} />
              </div>

              {guideList.map((list, index) => (
                <div className="onday-total-box2">
                  <div className="onday-left-box2">
                    <img
                      className="img-50 b-r-15"
                      src={list.profile_img}
                      alt="#"
                    />
                    &nbsp; &nbsp;
                    <div>
                      Name :{list.name} /AGE :{list.age} / AREA:{list.area}/
                      Lang : {list.lang}
                    </div>
                  </div>
                  <div className="oneday-right-box2">
                    <button
                      className="btn btn-square btn btn-secondary btn-sm btn-s"
                      type="button"
                      onClick={() =>
                        addBtn(
                          list.name,
                          list.profile_img,
                          list.guide_no,
                          list.lang,
                          list.age
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

export default RecommendGuideZh
