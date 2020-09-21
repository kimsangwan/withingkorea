import React, { useState, useEffect, useRef } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import { Editor } from "@toast-ui/react-editor"
import { message } from "antd"

const NotiGuideUpDate = ({ history, match }) => {
  const [KoTitle, setKoTitle] = useState("")
  const [editorState, setEditorState] = useState()
  const enEditorRef = useRef()
  useEffect(() => {
    let form = new FormData()

    form.append("notice_no", match.params.id)

    // 데이터 가져오기
    axios
      .post("/api/v1/notice/editpageG", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(function(response) {
        // 데이터불러오는데 성공했는지 확인 if
        setKoTitle(response.data.data.title)

        enEditorRef.current.getInstance().setHtml(response.data.data.editor)
      })
    // 데이터 가져온후에 state 바인딩
  }, [])

  const onEnEditorChangeHandler = () => {
    const content = enEditorRef.current.getInstance().getHtml()
    setEditorState(content)
  }

  const onSubmithandler = async e => {
    e.preventDefault()
    if (!KoTitle) message.warning("제목을 입력해 주세요")
    if (!editorState) message.warning("내용을 입력해 주세요")

    let form = new FormData()
    form.append("title", KoTitle)
    form.append("editor", editorState)
    form.append("notice_no", match.params.id)

    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/notice/editG", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        alert("성공적으로 수정되었습니다.")
        history.push("/notice/guide")
        // history.push("/notice/guide")
      }
    } catch (error) {
      alert("수정하는데 실패했습니다.")
    }
  }

  const imageHandler = async (file, callback) => {
    // 파일 업로드
    const form = new FormData()
    form.append("type", "A")
    form.append("file", file)

    const { data } = await axios.post("/api/v1/File/uploadFile", form, {
      headers: {
        Authorization: Cookie.get("token")
      }
    })

    callback(data.data)
  }

  const onEditorStateChange = data => {
    setEditorState(data)
  }
  const backBtn = () => history.goBack()
  return (
    <>
      <Breadcrumb title="가이드용 공지사항 수정페이지" parent="공지사항관리" />
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
                    onChange={e => setKoTitle(e.target.value)}
                    value={KoTitle}
                    class="form-control"
                    id="exampleFormControlInput1"
                    type="input"
                    placeholder="한글로입력해주세요"
                  />
                </form>
              </div>
            </div>
            <div className="col-sm-12">
              <div />
            </div>
            <div className="col-sm-12">
              <div className="card-header">
                <h5>내용입력하기</h5> 
              </div>
              <Editor
                data={editorState}
                initialValue={editorState}
                previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                exts={[
                  {
                    name: "chart",
                    minWidth: 100,
                    maxWidth: 600,
                    minHeight: 100,
                    maxHeight: 300
                  },
                  "scrollSync",
                  "colorSyntax",
                  "uml",
                  "mark",
                  "table"
                ]}
                onChange={onEnEditorChangeHandler}
                ref={enEditorRef}
                hooks={{
                  addImageBlobHook: imageHandler
                }}
              />
            </div>
            <div className="col-sm-12">
              <div>
                <div className="noti-btn-grp">
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                    onClick={backBtn}
                  >
                    작성 취소
                  </button>
                  &nbsp; &nbsp;
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

export default NotiGuideUpDate
