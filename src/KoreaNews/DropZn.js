import React, { Fragment } from "react"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Cookie from "js-cookie"
import axios from "axios"
import { Form } from "reactstrap"
const DropZn = props => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }
  // called every time a file's `status` changes

  const handleChangeStatus = async (files, status) => {
    try {
      if (status === "done") {
        const file = files.file
        const form = new FormData()

        form.append("type", "A")
        form.append("file", file)

        const { data } = await axios.post("/api/v1/File/uploadFile", form, {
          headers: {
            Authorization: Cookie.get("token")
          }
        })
        console.log(data)
        if (data.status === "success") {
          props.zhImageNumber(data.message)
        }
      }
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.")
    }
  }

  // receives array of files that are done uploading when submit button is clicked

  return (
    <div>
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <h5>중문배너이미지</h5>
          </div>
          <div className="card-body">
            <form
              className="dropzone dropzone-info"
              id="fileTypeValidation"
              action="/upload.php"
            >
              <div className="dz-message needsclick">
                <Dropzone
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  maxFiles={1}
                  accept="image/*,audio/*,video/*"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropZn
