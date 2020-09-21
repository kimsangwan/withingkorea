import React, { useState, useEffect } from "react"

import "../assets/css/layout.css"

import filtersReducer from "../reducers/filters.reducer"
import { TabContent } from "reactstrap"
import Breadcrumb from "../components/common/breadcrumb"
import { Nav } from "react-bootstrap"
import axios from "axios"
import Cookie from "js-cookie"
import { message } from "antd"
import SweetAlert from "react-bootstrap-sweetalert"

const NoWord = ({ history }) => {
  const [en, seten] = useState(0)

  return (
    <>
      <Breadcrumb title="채팅 금지어 관리" parent="정보관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="bennerContent">
                  <h5>채팅금지어 관리</h5>
                </div>

                <div className="card-body">
                  <Enup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Enup = ({ history }) => {
  const [tagList, setTagList] = useState([])
  const [usertext, setusertxt] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [indexState, setIndex] = useState(0)
  const [listNomber, setListNomber] = useState(0)

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    axios
      .post("/api/v1/prohibit/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setTagList(response.data.data)
        }
      })
      .catch(err => {
        alert("태그를 불러오는데 실패했습니다.")
      })
  }, [])

  const addClick = async e => {
    if (!usertext) {
      message.warning("한글자이상입력하세요")
      return
    }

    const index = tagList.findIndex(i => i.word === usertext)
    if (index >= 0) {
      message.warning("이미 추가된 금지어 입니다.")
      return
    }

    let form = new FormData()

    form.append("word", usertext)

    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/prohibit/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        setTagList([...tagList, { word: usertext, word_no: data.data }])

        message.success("성공적으로 작성되었습니다.")
        // history.push("/noWord")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  const deleteList = (listNo, index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      console.log(listNo)
      let form = new FormData()
      form.append("word_no", listNo)
      axios
        .post("/api/v1/prohibit/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const list = tagList.filter((item, i) => i !== index)
          console.log(list)
          setTagList(list)
        })
    }
  }
  const onNobtn = () => {
    setIsShow(!isShow)
  }
  const alertHandler = okay => {
    setIsShow(!isShow)
    if (okay) {
      let form = new FormData()
      form.append("rec_no", setListNomber)
      axios
        .post("/api/v1/hashtag/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const list = tagList.filter((item, i) => i !== indexState)

          setTagList(list)
        })
    }
  }

  return (
    <>
      {console.log(tagList)}
      <div className="tag-total">
        <div className="teg-text">금지어추가</div> &nbsp;
        <div className="tag-add-box">
          {/* {alert('한글자 이상 입력해주시기바랍니다')} */}
          <input
            className="form-control"
            placeholder="영문입력"
            onChange={e => {
              setusertxt(e.target.value)
            }}
            value={usertext}
            onKeyDown={e => {
              if (e.key === "Enter") {
                addClick()
              }
            }}
          />
        </div>{" "}
        &nbsp;
        <div className="tag-btn-btn">
          <div>
            <button className="btn btn-secondary btn-sm" onClick={addClick}>
              추가
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div className="row">
          {tagList.map((lists, index) => (
            <div className="tag-box" key={index}>
              <div className="close-box">
                <button
                  className="close"
                  onClick={() => {
                    onNobtn()
                    setIndex(index)
                    setListNomber(lists.word_no)
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="btn btn-info active">{lists.word}</div>
              </div>
            </div>
          ))}
        </div>
        <SweetAlert
          showCancel
          confirmBtnBsStyle="danger"
          danger
          show={isShow}
          onConfirm={() => alertHandler(true)}
          onCancel={() => alertHandler(false)}
          cancelBtnBsStyle="default"
          title="태그삭제"
        >
          삭제하시겠습니까?
        </SweetAlert>
      </div>
    </>
  )
}
export default NoWord
