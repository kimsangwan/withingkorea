import React, { Component } from "react"
import ReactSummernote from "react-summernote"
import "react-summernote/dist/react-summernote.css" // import styles
import "react-summernote/lang/summernote-ko-KR"
function Txtedter() {
  const [usertext, setusertext] = React.useState("")
  const [content, setContent] = React.useState("")
  const [subData, setSubData] = React.useState()

  // localStorage.setItem('bordData', JSON.stringify({ data12 }
  // localStorage.setItem('bordData', JSON.stringify(content));
  const userText2 = localStorage.getItem("bordData") // key-value
  const currentUserText = JSON.parse(userText2)

  // console.log(userText2);

  const onClickSave = () => {
    // const copyarry = [...subData];
    const today = new Date()
    const concatFunction = subData.concat([
      {
        id: `${subData.length + 1}`,
        name: usertext,
        status: {
          type: "i",
          key: null,
          ref: null,
          props: { className: "fa fa-circle font-success f-12" },
        },
        creat_on: today,
      },
    ])
    // setSubData(copyarry);
    localStorage.setItem("bordData", JSON.stringify(concatFunction))
    // 1.라우팅 이동

    // const copyarry2 = [...content];
    // content.unshift(setContent);
    // setContent(copyarry2);
  }
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5>영문에디터</h5>
        </div>
        <div className="card-body">
          <ReactSummernote
            value="Default value"
            options={{
              lang: "ru-RU",
              height: 350,
              dialogsInBody: true,
              toolbar: [
                ["style", ["style"]],
                ["font", ["bold", "underline", "clear"]],
                ["fontname", ["fontname"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "video"]],
                ["view", ["fullscreen", "codeview"]],
              ],
            }}
            // onBlur={(editor) => {
            //   console.log('Blur.', editor);
            // }}
          />
        </div>
      </div>
    </div>
  )
}
export default Txtedter
