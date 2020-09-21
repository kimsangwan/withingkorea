import React, { useState, useEffect } from "react"
import NewCard from "../components/common/NewCard"
import "../assets/css/layout.css"
import axios from "axios"
import Cookie from "js-cookie"
import { message } from "antd"
const RegulationAdd = ({ history, match }) => {
  const [title, setTitle] = useState()
  const [enContents, setEnContents] = useState()
  const [zhContents, setZhContents] = useState()

  useEffect(() => {
    let form = new FormData()

    form.append("rule_no", match.params.id)

    // 데이터 가져오기
    axios
      .post("/api/v1/rule/editpage", form, {
        headers: { Authorization: Cookie.get("token") }
      })
      .then(function(response) {
        // 데이터불러오는데 성공했는지 확인 if
        setTitle(response.data.data.title)
        setZhContents(response.data.data.zh_editor)
        setEnContents(response.data.data.en_editor)
      })
    // 데이터 가져온후에 state 바인딩
  }, [])

  const onSubmithandler = async e => {
    e.preventDefault()

    let form = new FormData()
    form.append("rule_no", match.params.id)
    form.append("title", title)
    form.append("zh_editor", enContents)
    form.append("en_editor", zhContents)
    if (title.length <= 0) {
      message.warning("규정의 제목을 입력해주세요")
      return
    }
    if (enContents.length <= 0) {
      message.warning("영문 규정내용을 입력해주세요")
      return
    }
    if (zhContents.length <= 0) {
      message.warning("중문 규정내용을 입력해주세요")
      return
    }
    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/rule/edit", form, {
        headers: {
          Authorization: cookie
        }
      })
      {
      }
      if (data.status == "success") {
        message.success("성공적으로 수정되었습니다.")
        history.push("/regulationlist")
      }
    } catch (error) {
      message.warning("수정하는데 실패했습니다.")
    }
  }
  const onResetBtn = () => {
    setEnContents([])
    setZhContents([])
    setTitle([])
  }
  return (
    <>
      <NewCard title="규정관리" parent="정보관리/">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <form>
              <div className="regulatin-title">
                <h5> 규정 제목입력</h5>
                <input
                  class="form-control input-air-primary"
                  id="exampleFormControlInput1"
                  type="input"
                  placeholder="취소및 환불규정"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
                <p />
              </div>
              <div className="text-zone">
                <div>
                  <h5>규정내용 (영문)</h5>
                  <textarea
                    className="form-control input-air-primary"
                    onChange={e => setEnContents(e.target.value)}
                    value={enContents}
                  />
                </div>
                <div>
                  <h5>규정내용(중문)</h5>
                  <textarea
                    className="form-control input-air-primary"
                    onChange={e => setZhContents(e.target.value)}
                    value={zhContents}
                  />
                </div>
                <div className="guide-goods">
                  <input
                    className="btn btn-warning active  btn -xs btn-sm"
                    type="reset"
                    defaultValue="초기화"
                    style={{ height: 35 }}
                    onClick={onResetBtn}
                  />
                  &nbsp;
                  <button
                    className="btn 
              btn-success"
                    onClick={onSubmithandler}
                    style={{ marginLeft: "1%" }}
                  >
                    작성
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </NewCard>
    </>
  )
}

export default RegulationAdd
