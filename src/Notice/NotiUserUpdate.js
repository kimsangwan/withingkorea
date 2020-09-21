import React, { useState, useEffect, useRef } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import "codemirror/lib/codemirror.css"
import "@toast-ui/editor/dist/toastui-editor.css"
import { Editor } from "@toast-ui/react-editor"
import { message } from "antd"
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom"

const NotiUserUpDate = ({ match }) => {
  const [ZhTitle, setZhTitle] = useState("")
  const [EnTitle, setEnTitle] = useState("")
  const [Zheditor, setZheditor] = useState("")
  const [Eneditor, setEneditor] = useState("")
  const zhEditorRef = useRef()
  const enEditorRef = useRef()
  const history = useHistory()
  useEffect(() => {
    let form = new FormData()

    form.append("notice_no", match.params.id)

    // 데이터 가져오기
    axios
      .post("/api/v1/notice/editpageU", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(function(response) {
        // 데이터불러오는데 성공했는지 확인 if
        //  바인딩해주는부분

        setZhTitle(response.data.data.zh_title)
        setEnTitle(response.data.data.en_title)
        zhEditorRef.current.getInstance().setHtml(response.data.data.zh_editor)
        enEditorRef.current.getInstance().setHtml(response.data.data.en_editor)
      })
    // 데이터 가져온후에 state 바인딩
  }, [])

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

  const onZhEditorChangeHandler = () => {
    const content = zhEditorRef.current.getInstance().getHtml()
    setZheditor(content)
  }

  const onEnEditorChangeHandler = () => {
    const content = enEditorRef.current.getInstance().getHtml()
    setEneditor(content)
  }

  const onSubmithandler = async e => {
    e.preventDefault()
    if (!ZhTitle) message.warning("중문 제목을 입력하세요")
    if (!EnTitle) message.warning("중문 제목을 입력하세요")
    if (!Zheditor) message.warning("중문 내용을 입력하세요")
    if (!Eneditor) message.warning("영문 내용을 입력하세요")

    let form = new FormData()
    form.append("notice_no", match.params.id)
    form.append("zh_editor", Zheditor)
    form.append("en_editor", Eneditor)
    form.append("zh_title", ZhTitle)
    form.append("en_title", EnTitle)
    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/notice/editU", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status === "success") {
        message.success("성공적으로 수정되었습니다.")
        history.push("/notice")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  const backBtn = () => history.goBack()

  return (
    <>
      <Breadcrumb title="유저용 공지사항 수정" parent="공지사항관리" />
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div className="noti-title">
                <form>
                  <div className="card-header">
                    <h5>제목 입력하기</h5> 
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

            <div className="col-sm-12">
              <div className="card-header">
                <h5>영문내용</h5> 
              </div>
              <Editor
                data={Eneditor}
                initialValue={Eneditor}
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
              <div className="card-header">
                <h5>중문내용</h5> 
              </div>
              <Editor
                data={Zheditor}
                initialValue={Zheditor}
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
                onChange={onZhEditorChangeHandler}
                ref={zhEditorRef}
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

export default NotiUserUpDate
