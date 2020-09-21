import React from 'react';
import CKEditors from 'react-ckeditor-component';

function Editor1() {
  const [usertext, setusertext] = React.useState('');
  const [content, setContent] = React.useState('');
  const [subData, setSubData] = React.useState();

  // localStorage.setItem('bordData', JSON.stringify({ data12 }
  // localStorage.setItem('bordData', JSON.stringify(content));
  const userText2 = localStorage.getItem('bordData'); // key-value
  const currentUserText = JSON.parse(userText2);

  // console.log(userText2);

  const onClickSave = () => {
    // const copyarry = [...subData];
    const today = new Date();
    const concatFunction = subData.concat([
      {
        id: `${subData.length + 1}`,
        name: usertext,
        status: {
          type: 'i',
          key: null,
          ref: null,
          props: { className: 'fa fa-circle font-success f-12' },
        },
        creat_on: today,
      },
    ]);
    // setSubData(copyarry);
    localStorage.setItem('bordData', JSON.stringify(concatFunction));
    // 1.라우팅 이동

    // const copyarry2 = [...content];
    // content.unshift(setContent);
    // setContent(copyarry2);
  };
  return (
    <div className="col-sm-12">
      <CKEditors
        editor={CKEditors}
        //질문사항
        // onChange={(e) => setusertext(e.target.value)}
        // onInit={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          setContent(data);
        }}
        // onBlur={(editor) => {
        //   console.log('Blur.', editor);
        // }}
      />
      {/* //질문사항 */}
      {/* 클릭을했을때 사용자의 입력값을 저장하고, 글목록에 추가하기위해 unshift를사용해서 데이터앞에추가명령을주고
      추가할 데이터는 사용자가 입력한값이며 이렇게 복사하고 수정한값을 데이터 변경값에넣음 */}
    </div>
  );
}

export default Editor1;
