import React, { useState } from "react"

const EnTag = () => {
  const [teg, settag] = useState([])
  const [usertext, setusertxt] = useState("")
  const addClick = () => {
    if (!usertext) alert("한글자이상입력해주세요")
    const arrayCopy = teg.concat(usertext)

    // arrayCopy;
    settag(arrayCopy)
    setusertxt("")
    const onRemove = id => {
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인 것을 제거함
      setusertxt(usertext.filter(user => user.id !== id))
    }
    return (
      <>
        <div>
          <label>
            해시태그추가 &nbsp;
            <input
              placeholder="영문으로입력하세요"
              onChange={e => {
                setusertxt(e.target.value)
              }}
              value={usertext}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  ;`addClick`()
                }
              }}
            />
          </label>{" "}
          &nbsp;
          <button className="btn btn-secondary btn-sm" onClick={addClick}>
            추가
          </button>
        </div>

        <div class="container">
          <div className="row">
            {teg.map((d, i) => (
              <div className="tag-box" key="i">
                <p>
                  {" "}
                  <button
                    className="close"
                    onClick={() => {
                      ""
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="tag-item"> {console.log(d, i)}</div>
                  dffds
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default EnTag
