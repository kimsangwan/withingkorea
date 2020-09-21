import React, { Fragment } from "react"

import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Cookie from "js-cookie"
import axios from "axios"

const DropEn = props => {
  // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => {
  //   return {
  //     url:
  //       "https://ps-service-the-build.s3.ap-northeast-2.amazonaws.com/res/gf_2020_08_27_18_53_36_940_866.jpg"
  //   }
  // }
  // called every time a file's `status` changes

  const handleChangeStatus = async (files, status) => {
    // 파일정보
    console.log(files)
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
          props.enImageNumber(data.message)
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
            <h5>영문배너이미지</h5>
          </div>
          <div className="card-body">
            <form
              className="dropzone dropzone-info"
              id="fileTypeValidation"
              action="/upload.php"
            >
              <div className="dz-message needsclick">
                <Dropzone
                  // getUploadParams={getUploadParams}
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

export default DropEn
