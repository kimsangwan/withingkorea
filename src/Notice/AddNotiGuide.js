import React, { useState, useRef, useCallback } from "react"
import "../assets/css/layout.css"
import NewCard from "../components/common/NewCard"
import axios from "axios"
import Cookie from "js-cookie"
import Editor from "../toastEditor/ToastEditor"
import "./editer.css"
import { message } from "antd"

const AddNotiGuide = ({ history }) => {
  const [KoTitle, setKoTitle] = useState("")
  const [KoContent, setKoContent] = useState("")

  const editorContent = content => {
    setKoContent(content)
  }

  const onUpload = files => {
    const form = new FormData()

    form.append("type", "A")
    form.append("file", files)

    return axios
      .post("/api/v1/file/uploadFile", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(res => {
        return { data: { link: res.data.data } }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onSubmithandler = async e => {
    e.preventDefault()
    if (!KoTitle) message.warning("제목을 입력해 주세요")
    if (!KoContent) message.warning("내용을 입력해 주세요")

    let form = new FormData()

    form.append("title", KoTitle)
    form.append("editor", KoContent)

    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/notice/addG", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        message.success("성공적으로 작성되었습니다.")
        history.push("/notice/guide")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  const backBtn = () => history.goBack()
  return (
    <>
      {/* <Breadcrumb title="가이드용 공지사항" parent="공지사항관리" /> */}
      <NewCard title="가이드용 공지사항" parent="공지사항관리">
        <div className="noti-title">
          <form>
            <div className="card-header">
              <h5>제목입력</h5> 
            </div>
            <input
              onChange={e => setKoTitle(e.target.value)}
              value={KoTitle}
              class="form-control"
              id="exampleFormControlInput1"
              type="input"
              placeholder="한글로입력해주세요"
            />
          </form>
        </div>

        {/* <div className="col-sm-12"> */}
        <div className="card-header">
          <h5>내용입력</h5> 
        </div>
        <div className="eiter_size">
          <Editor editorContent={editorContent} />
        </div>

        <div className="col-sm-12">
          <div>
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
      </NewCard>
    </>
  )
}

export default AddNotiGuide
