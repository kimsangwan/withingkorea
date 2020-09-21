import React, { Fragment } from "react"
import Breadcrumb from "./breadcrumb"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../assets/css/layout.css"

const DropzoneComponent = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }
  // called every time a file's `status` changes

  const handleChangeStatus = ({ meta, file }, status) => {}

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove())
    toast.success("Dropzone successfully submitted !")
  }

  return (
    <>
      <div className="container-fluid">
        <form
          className="dropzone digits"
          id="singleFileUpload"
          action="/upload.php"
        >
          <div className="dropzonbox">
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              canCancel={false}
              inputContent="Drop A File"
              styles={{
                dropzone: { width: 1000, height: 100 },
                dropzoneActive: { borderColor: "green" },
              }}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default DropzoneComponent
