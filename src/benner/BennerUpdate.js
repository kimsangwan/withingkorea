import React, { useState, useRef, useCallback, useEffect } from "react"
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

const AddBenner = ({ match }) => {
  const [EnImageNumber, setEnImageNumber] = useState(0)
  const [ZhImageNumber, setZhImageNumber] = useState(0)
  const [ViewLank, setViewLank] = useState(0)
  const [Zheditor, setZheditor] = useState("")
  const [Eneditor, setEneditor] = useState("")

  const [bannerState, setBannerState] = useState({})

  const history = useHistory()

  useEffect(() => {
    const form = new FormData()
    form.append("banner_no", match.params.id)

    axios
      .post("/api/v1/banner/editpage", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(res => {
        console.log(res.data)
        setBannerState({
          ...res.data.data
        })
        const imageUrl = res.data.data.en_image
        console.log(imageUrl)
        fetch(imageUrl).then(res => console.log(res))
      })
  }, [])

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

    let form = new FormData()

    form.append("z_index", ViewLank)
    form.append("en_image", EnImageNumber)
    form.append("zh_image", ZhImageNumber)
    form.append("zh_editor", Zheditor)
    form.append("en_editor", Eneditor)
    const cookie = Cookie.get("token")
    try {
      const { data } = await axios.post("/api/v1/banner/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        alert("성공적으로 작성되었습니다.")
        history.push("/bennerlist")
      }
    } catch (error) {
      alert("작성하는데 실패했습니다.")
    }
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
                          onChange={e => setViewLank(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <DropEn enImageNumber={enImageNumber} />
                </div>
                <div>
                  <DropZh zhImageNumber={zhImageNumber} />
                </div>
                <Editor editorContent={editorContent} value={true} />
                <Editor editorContent={editorContent} />

                <div style={{ marginLeft: "40px" }} className="btn-box-bner">
                  <button
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="button"
                  >
                    삭제
                  </button>
                  &nbsp; &nbsp;
                  {/* <button className="edit-button">수정</button>{' '} */}
                  <button
                    className="btn btn-square btn-secondary active btn-sm"
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
export default AddBenner
