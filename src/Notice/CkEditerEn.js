import React, { Component } from "react"
import CKEditors from "react-ckeditor-component"
function Txtedter(props) {
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
          <h5>영문상세내용입력하기</h5>
        </div>
        <div className="card-body">
          <CKEditors
            editor={CKEditors}
            //질문사항
            // onChange={(e) => setusertext(e.target.value)}
            // onInit={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            // }}
            onChange={props.onEnContentHandler}
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
