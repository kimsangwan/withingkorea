import React, { useState, useEffect } from "react"
import "../assets/css/layout.css"
import Breadcrumb from "../components/common/breadcrumb"
import { Nav } from "react-bootstrap"
import axios from "axios"
import Cookie from "js-cookie"
import SweetAlert from "react-bootstrap-sweetalert"
import { message } from "antd"
const Hashtag = () => {
  const [en, seten] = useState(0)

  return (
    <>
      <Breadcrumb title="해시태그관리" parent="해시태그관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div className="bennerContent">
                  <h5>검색 해시태그</h5>
                </div>

                <div className="card-body">
                  <Nav
                    variant="tabs"
                    defaultActiveKey="link-0"
                    className="nav--sub2"
                  >
                    <div className="navtab">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="link-0"
                          onClick={() => {
                            seten(0)
                          }}
                        >
                          영문관리
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="link-1"
                          onClick={() => {
                            seten(1)
                          }}
                        >
                          중문관리
                        </Nav.Link>
                      </Nav.Item>
                    </div>
                  </Nav>
                </div>
                <TabContentTab en={en} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Znup = () => {
  const [zhTagList, setZhTaglist] = useState([])
  const [usertext, setusertxt] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [indexState, setIndex] = useState(0)
  const [listNomber, setListNomber] = useState(0)
  useEffect(() => {
    let form = new FormData()
    form.append("lang", 2)
    axios
      .post("/api/v1/hashtag/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setZhTaglist(response.data.data)
        }
      })
      .catch(err => {
        message.warning("태그를 불러오는데 실패했습니다.")
      })
  }, [])

  const addClick = async e => {
    if (!usertext) {
      message.warning("한글자이상입력하세요")
      return
    }
    const index = zhTagList.findIndex(i => i.name === usertext)
    if (index >= 0) {
      message.warning("이미 추가된 태그 입니다.")
      return
    }
    const arrayCopy = [...zhTagList, { name: usertext }]

    setZhTaglist(arrayCopy)
    setusertxt("")
    let form = new FormData()

    form.append("lang", 2)
    form.append("name", usertext)

    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/hashtag/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        message.success("성공적으로 작성되었습니다.")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
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
          const list = zhTagList.filter((item, i) => i !== indexState)

          setZhTaglist(list)
        })
    }
  }

  const deleteList = (listNo, index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let form = new FormData()
      form.append("rec_no", listNo)
      axios
        .post("/api/v1/hashtag/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const list = zhTagList.filter((item, i) => i !== index)

          setZhTaglist(list)
        })
    }
  }

  return (
    <>
      <div className="tag-total">
        <div className="teg-text">해시태그추가</div>
        &nbsp;
        <div className="tag-add-box">
          <input
            className="form-control"
            placeholder="중문입력"
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
          <button className="btn btn-secondary btn-sm" onClick={addClick}>
            추가
          </button>
        </div>
      </div>

      <div class="container">
        <div className="row">
          {zhTagList.map((tagLists, index) => (
            <div className="tag-box" key={index}>
              <div className="close-box">
                <button
                  className="close"
                  onClick={() => {
                    onNobtn()
                    setIndex(index)
                    setListNomber(tagLists.rec_no)
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="btn btn-info active">{tagLists.name}</div>
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
const Enup = () => {
  const [tegList, setTagList] = useState([])
  const [usertext, setusertxt] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [indexState, setIndex] = useState(0)
  const [listNomber, setListNomber] = useState(0)

  useEffect(() => {
    let form = new FormData()
    form.append("lang", 1)
    axios
      .post("/api/v1/hashtag/list", form, {
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
        message.warning("태그를 불러오는데 실패했습니다.")
      })
  }, [])

  const addClick = async e => {
    if (!usertext) {
      message.warning("한글자이상입력하세요")
      return
    }
    const index = tegList.findIndex(i => i.name === usertext)
    if (index >= 0) {
      message.warning("이미 추가된 태그 입니다.")
      return
    }
    const arrayCopy = [...tegList, { name: usertext }]

    setTagList(arrayCopy)
    setusertxt("")
    let form = new FormData()

    form.append("lang", 1)
    form.append("name", usertext)

    const cookie = Cookie.get("token")

    try {
      const { data } = await axios.post("/api/v1/hashtag/add", form, {
        headers: {
          Authorization: cookie
        }
      })
      if (data.status == "success") {
        message.success("성공적으로 작성되었습니다.")
        // history.push("/notice/guide")
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  // const deleteList = (listNo, index) => {
  //   if (window.confirm("삭제 하시겠습니까?")) {
  //     let form = new FormData()
  //     form.append("rec_no", listNo)
  //     axios
  //       .post("/api/v1/hashtag/delete", form, {
  //         headers: { Authorization: Cookie.get("token") }
  //       })
  //       .then(response => {
  //         const list = tegList.filter((item, i) => i !== index)
  //         console.log(list)
  //         setTagList(list)
  //       })
  //   }
  // }
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
          const list = tegList.filter((item, i) => i !== indexState)

          setTagList(list)
        })
    }
  }

  return (
    <>
      <div className="tag-total">
        <div className="teg-text">해시태그추가</div>
        &nbsp;
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
          <button className="btn btn-secondary btn-sm" onClick={addClick}>
            추가
          </button>
        </div>
      </div>

      <div class="container">
        <div className="row">
          {tegList.map((lists, index) => (
            <div className="tag-box" key={index}>
              <div className="close-box">
                <button
                  className="close"
                  onClick={() => {
                    onNobtn()
                    setIndex(index)
                    setListNomber(lists.rec_no)
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="btn btn-info active">{lists.name}</div>
              </div>
            </div>
          ))}
        </div>
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
    </>
  )
}
function TabContentTab(props) {
  if (props.en === 0) {
    return (
      <div className="tag-tab-box">
        <Enup />
      </div>
    )
  } else if (props.en === 1) {
    return (
      <div className="tag-tab-box">
        <Znup />
      </div>
    )
  } else if (props.누른탭 === 2) {
    return <div>내용2</div>
  }
}
export default React.memo(Hashtag)
