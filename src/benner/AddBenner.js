import React, { useState, useRef, useCallback } from "react"
import "../assets/css/layout.css"
import { useHistory, useParams } from "react-router-dom"
import Breadcrumb from "../components/common/breadcrumb"
import axios from "axios"
import Cookie from "js-cookie"
import "react-dropzone-uploader/dist/styles.css"
import "codemirror/lib/codemirror.css"
import Editor from "../toastEditor/ToastEditor"
import DropEn from "./DropEn"
import DropZh from "./DropZn"
import { message } from "antd"

const AddBenner = () => {
  const [EnImageNumber, setEnImageNumber] = useState(0)
  const [ZhImageNumber, setZhImageNumber] = useState(0)
  const [ViewLank, setViewLank] = useState(0)
  const [Zheditor, setZheditor] = useState("")
  const [Eneditor, setEneditor] = useState("")
  const history = useHistory()

  const editorContent = (content, value) => {
    if (value) {
      setEneditor(content)
    } else {
      setZheditor(content)
    }
  }

  const enImageNumber = useCallback(number => {
    console.log(number)
    setEnImageNumber(number)
  }, [])

  const zhImageNumber = useCallback(number => {
    console.log(number)
    setZhImageNumber(number)
  }, [])

  const onSubmithandler = async e => {
    e.preventDefault()
    if (ViewLank === 0) {
      message.warning("노출순위는 1이상 지정해주세요")
      return
    }
    if (EnImageNumber === 0) {
      message.warning("이미지를 하나이상 업로드해주세요")
      return
    }
    if (ZhImageNumber === 0) {
      message.warning("이미지를 하나이상 업로드해주세요")
      return
    }
    if (Zheditor.length <= 0) {
      message.warning(" 중국어를  한글자 이상 입력해주세요 ")
      return
    }
    if (Eneditor.length <= 0) {
      message.warning("영어를 한글자 이상 입력해주세요 ")
      return
    }

    let form = new FormData()

    form.append("z_index", ViewLank)
    form.append("en_image", EnImageNumber)
    form.append("zh_image", ZhImageNumber)
    form.append("zh_editor", Zheditor)
    form.append("en_editor", Eneditor)
    const cookie = Cookie.get("token")
    try {
      let form = new FormData()

      form.append("z_index", ViewLank)
      form.append("en_image", EnImageNumber)
      form.append("zh_image", ZhImageNumber)
      form.append("zh_editor", Zheditor)
      form.append("en_editor", Eneditor)
      const cookie = Cookie.get("token")
      const { data } = await axios.post("/api/v1/banner/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        message.success("성공적으로 작성되었습니다.")
        history.push("/bennerlist")
      }
    } catch (error) {
      alert("작성하는데 실패했습니다.")
    }
  }
  const canCleBtn = () => {
    setViewLank(0)
    // setZheditor("")
    // setEneditor("")
    // setZhImageNumber(0)
    // setEnImageNumber(0)
    history.push("/bennerlist")
  }
  const dropzoneCancle = status => {
    console.log(status)
  }

  return (
    <>
      <Breadcrumb title="배너추가" parent="배너관리" />
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <form>
                <div>
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h5>노출 우선 순위</h5>
                      </div>
                      <div className="card-body">
                        <input
                          className=" form-control"
                          type="number"
                          min="1"
                          max="999"
                          defaultValue="0"
                          value={ViewLank}
                          onChange={e => setViewLank(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <DropEn
                    enImageNumber={enImageNumber}
                    cancleHandler={dropzoneCancle}
                  />

                  <DropZh zhImageNumber={zhImageNumber} />
                </div>
                <div className="card-header">
                  <h5>영문 배너내용</h5>
                </div>

                <Editor editorContent={editorContent} value={true} />

                <div className="card-header">
                  <h5>중문배너내용</h5>
                </div>

                <Editor editorContent={editorContent} />

                <div style={{ marginTop: "40px" }} className="btn-box-bner">
                  <button
                    className="btn btn-secondary active  btn-sm"
                    type="button"
                    onClick={onSubmithandler}
                  >
                    작성
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                    onClick={canCleBtn}
                  >
                    작성취소
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
export default AddBenner
