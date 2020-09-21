import React, { useState, useRef, useCallback } from "react"
import "../assets/css/layout.css"
import { useHistory, useParams } from "react-router-dom"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import "react-dropzone-uploader/dist/styles.css"
import { message } from "antd"
import "codemirror/lib/codemirror.css"
import Editor from "../toastEditor/ToastEditor"
import DropEn from "./DropEn"
import DropZh from "./DropZn"
import { transform } from "@babel/core"

const AddKoreaNews = () => {
  const [EnImageNumber, setEnImageNumber] = useState(0)
  const [ZhImageNumber, setZhImageNumber] = useState(0)

  const [Zheditor, setZheditor] = useState("")
  const [Eneditor, setEneditor] = useState("")
  const [EnTitle, setEnTitle] = useState("")
  const [ZhTitle, setZhTitle] = useState("")
  const history = useHistory()
  const [selectState, setSelectState] = useState(0)
  const onChangeSelect = e => {
    setSelectState(e.target.value)
  }

  const editorContent = (content, value) => {
    if (value) {
      setEneditor(content)
    } else {
      setZheditor(content)
    }
  }

  const enImageNumber = useCallback(number => {
    setEnImageNumber(number)
  }, [])

  const zhImageNumber = useCallback(number => {
    setZhImageNumber(number)
  }, [])

  const onSubmithandler = async e => {
    e.preventDefault()
    if (selectState === 0) {
      message.warning("노출순위는 1이상 지정해주세요")
      return
    }
    if (EnImageNumber === 0) {
      message.warning("이미지를 업로드해주세요")
      return
    }
    if (ZhImageNumber === 0) {
      message.warning("이미지를 업로드해주세요")
      return
    }
    if (!EnTitle) {
      message.warning("영문제목을 입력하세요")
      return
    }
    if (!ZhTitle) {
      message.warning("중문제목을 입력하세요")
      return
    }
    if (!Zheditor) {
      message.warning("중문내용을 입력하세요")
      return
    }
    if (!Eneditor) {
      message.warning("영문내용을 입력하세요")
      return
    }

    let form = new FormData()

    form.append("cate", selectState)
    form.append("en_image", EnImageNumber)
    form.append("zh_image", ZhImageNumber)
    form.append("en_title", EnTitle)
    form.append("zh_title", ZhTitle)
    form.append("zh_editor", Zheditor)
    form.append("en_editor", Eneditor)
    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/news/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        message.success("성공적으로 작성되었습니다.")
        history.push("/koreanewslist")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  const canclebtn = () => {
    history.goBack()
  }
  return (
    <>
      <Breadcrumb title="한국소식 등록하기" parent="한국소식관리" />
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <form>
                <div>
                  <div className="col-sm-12">
                    <div className="card">
                      <form className="form theme-form">
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              {/* <div><h5> 카테고리 </h5></div> */}
                              <div
                                className="form-group"
                                style={{
                                  width: "40%",
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between"
                                }}
                              >
                                <label htmlFor="exampleFormControlSelect9">
                                  <strong>
                                    {" "}
                                    <h5> 카테고리 </h5>
                                  </strong>
                                </label>

                                <div
                                  style={{ position: "relative", width: "40%" }}
                                >
                                  <select
                                    className="form-control digits"
                                    id="exampleFormControlSelect9"
                                    onChange={onChangeSelect}
                                  >
                                    <option value="1">뉴스</option>
                                    <option value="2">연예</option>
                                    <option value="3">뷰티</option>
                                    <option value="4">여행</option>
                                    <option value="5">관광지</option>
                                    <option value="6">문화</option>
                                  </select>
                                  <i
                                    className="fa fa-angle-down"
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      right: "1%",
                                      transform: "translateY(-50%)"
                                    }}
                                  />
                                </div>
                              </div>
                              {console.log(selectState)}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <DropEn enImageNumber={enImageNumber} />
                </div>
                <div>
                  <DropZh zhImageNumber={zhImageNumber} />
                </div>
                <div className="card-header">
                  <h5>영문입력</h5> 
                </div>
                <input
                  onChange={e => setEnTitle(e.target.value)}
                  style={{ marginBottom: "3%" }}
                  value={EnTitle}
                  class="form-control"
                  id="exampleFormControlInput1"
                  type="input"
                  placeholder="영문으로 제목을 입력해주세요"
                />
                <Editor editorContent={editorContent} value={true} />
                <div className="card-header">
                  <h5>중문입력</h5> 
                </div>
                <input
                  style={{ marginBottom: "3%" }}
                  onChange={e => setZhTitle(e.target.value)}
                  value={ZhTitle}
                  class="form-control"
                  id="exampleFormControlInput1"
                  type="input"
                  placeholder="중문으로 제목을 입력해주세요"
                />
                <Editor editorContent={editorContent} />

                <div style={{ marginTop: "2%" }} className="btn-box-bner">
                  <button
                    className="btn btn-warning active btn-sm"
                    type="button"
                    onClick={canclebtn}
                  >
                    삭제
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={onSubmithandler}
                  >
                    작성
                  </button>
                </div>
                {/* </div> */}
              </form>
            </div>
            {/* <div className="col-sm-12">
<div> */}
            {/* </div>
</div> */}
            {/* <div className="col-sm-12"> */}
            {/* </div>
<div className="col-sm-12">
<div> */}
          </div>
        </div>
      </div>
      {/* </div>
</div> */}
    </>
  )
}
export default AddKoreaNews
