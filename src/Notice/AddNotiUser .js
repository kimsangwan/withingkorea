import React, { useState, useCallback, useRef } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Editor from "../toastEditor/ToastEditor"
import Cookie from "js-cookie"
import { message } from "antd"
const AddNotiUser = ({ history }) => {
  const [ZhTitle, setZhTitle] = useState("")
  const [EnTitle, setEnTitle] = useState("")
  const [Zheditor, setZheditor] = useState("")
  const [Eneditor, setEneditor] = useState("")
  // 에디터에 참조값

  const editorContent = (content, value) => {
    if (value) {
      setEneditor(content)
    } else {
      setZheditor(content)
    }
  }

  const onSubmithandler = async e => {
    e.preventDefault()
    if (!ZhTitle) message.warning("중문제목을입력해주세요")
    if (!EnTitle) message.warning("영문제목을 입력해주세요")
    if (!Zheditor) message.warning("중문내용을 입력해주세요")
    if (!Eneditor) message.warning("영문 내용을 입력해주세요")
    let form = new FormData()

    form.append("zh_editor", Zheditor)
    form.append("en_editor", Eneditor)
    form.append("zh_title", ZhTitle)
    form.append("en_title", EnTitle)
    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/notice/addU", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status === "success") {
        message.success("성공적으로 작성되었습니다.")
        history.push("/notice")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  const backBtn = () => history.goBack()
  return (
    <>
      <Breadcrumb title="유저용공지사항 작성" parent="공지사항관리" />
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div className="noti-title">
                <form>
                  <div className="card-header">
                    <h5>제목입력</h5> 
                  </div>
                  <input
                    onChange={e => setEnTitle(e.target.value)}
                    value={EnTitle}
                    class="form-control"
                    id="exampleFormControlInput1"
                    type="input"
                    placeholder="영문으로입력하세요"
                  />
                  <p />
                  <input
                    onChange={e => setZhTitle(e.target.value)}
                    value={ZhTitle}
                    class="form-control"
                    id="exampleFormControlInput1"
                    type="input"
                    placeholder="중문으로입력하세요"
                  />
                </form>
              </div>
            </div>

            <div className="col-sm-12" style={{ marginBottom: "20px" }}>
              <div className="card-header">
                <h5>영문 내용 입력하기</h5> 
              </div>
              <Editor editorContent={editorContent} value={true} />
            </div>
            <div className="col-sm-12">
              <div className="card-header">
                <h5>중문내용 입력하기</h5> 
              </div>
              <Editor editorContent={editorContent} />
              <div>
                {/* <CkEditerZn onChange={onEnContentHandler} /> */}
                {}
                <div className="noti-btn-grp">
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                    onClick={backBtn}
                  >
                    작성취소
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button
                    className="btn  btn-secondary active btn-sm"
                    type="button"
                    onClick={onSubmithandler}
                  >
                    작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNotiUser
