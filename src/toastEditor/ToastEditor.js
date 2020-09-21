import React, { useRef, useState } from "react"
import axios from "axios"
import Cookie from "js-cookie"
import "codemirror/lib/codemirror.css"
import "@toast-ui/editor/dist/toastui-editor.css"

import { Editor } from "@toast-ui/react-editor"

const ToastEditor = props => {
  const editorRef = useRef()

  const onChangeHandler = () => {
    const content = editorRef.current.getInstance().getHtml()

    if (props.value) {
      props.editorContent(content, props.value)
    } else {
      props.editorContent(content)
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

  return (
    <div>
      <Editor
        // data={"ajshjsdjhsdhjsdhj"}
        initialValue=""
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
            maxHeight: 300,
            height: ""
          },
          "scrollSync",
          "colorSyntax",
          "uml",
          "mark",
          "table"
        ]}
        onChange={onChangeHandler}
        ref={editorRef}
        hooks={{
          addImageBlobHook: imageHandler
        }}
      />
    </div>
  )
}

export default ToastEditor
