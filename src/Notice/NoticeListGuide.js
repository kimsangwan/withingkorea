import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import NewCard from "../components/common/NewCard"
import SweetAlert from "react-bootstrap-sweetalert"
import "react-image-lightbox/style.css"
import axios from "axios"
import Cookie from "js-cookie"
import { Form } from "reactstrap"
import { message } from "antd"
import Pagenation from "../util/Pagenation"
const NoticeListGuide = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [noticeLists, setNoticeLists] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [listNomber, setListNomber] = useState(0)
  const [indexNum, setIndexNum] = useState(0)
  // let 데이터 = useContext(데이터context);
  const deleteList = (listNo, index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let form = new FormData()
      form.append("notice_no", listNo)
      axios
        .post("/api/v1/notice/deleteG", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const lists = noticeLists.list.filter((item, i) => i !== index)
          setNoticeLists({
            ...noticeLists,
            lists: noticeLists.list.filter((item, i) => i !== index)
          })
        })
    }
  }
  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    axios
      .post("/api/v1/notice/listG", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(function(response) {
        if (response.data.status == "success") {
          setNoticeLists({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
  }, [])
  const onNobtn = () => {
    setIsShow(!isShow)
  }
  const alertHandler = okay => {
    setIsShow(!isShow)
    if (okay) {
      let form = new FormData()
      form.append("notice_no", listNomber)
      axios
        .post("/api/v1/notice/deleteG", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          // const listse = zhlist.list.filter((item, i) => i !== indexNum)
          setNoticeLists({
            ...noticeLists,
            list: noticeLists.list.filter((item, i) => i !== indexNum)
          })
        })
    }
  }

  const fn = async d => {
    let form = new FormData()
    form.append("index", d)

    try {
      const { data } = await axios.post("/api/v1/notice/listG", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setNoticeLists({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("작성하는데 실패했습니다.")
    }
  }
  return (
    <>
      <NewCard title="가이드용 공지사항리스트" parent="공지사항관리">
        <div className="bennerContent">
          <h5>가이드용 공지사항</h5>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              history.push("/add/notice/guide")
            }}
          >
            가이드용 공지사항 작성하기
          </button>
        </div>
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" />
                    <th scope="col">작성일시</th>

                    <th scope="col">제목</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {noticeLists.list &&
                    noticeLists.list.map((list, index) => {
                      return (
                        <tr>
                          <th scope="row" key={index}>
                            {list.notice_no}
                          </th>
                          <td>{list.registered}</td>
                          {/* <td>{a.facility}</td> */}
                          <td>{list.title}</td>
                          <td>
                            <button
                              className="btn btn-warning active  btn -xs btn-sm"
                              type="button"
                              onClick={() => {
                                onNobtn()
                                setIndexNum(index)
                                setListNomber(list.notice_no)
                              }}
                            >
                              삭제
                            </button>
                            &nbsp; &nbsp;
                            {/* <button className="edit-button">수정</button>{' '} */}
                            <button
                              onClick={() =>
                                history.push(
                                  `/notice/guide/update/${list.notice_no}`
                                )
                              }
                              className="btn btn-secondary btn-sm"
                              type="button"
                            >
                              수정
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pagenation-box">
          <Pagenation data={noticeLists} fn={fn} />
        </div>
        <SweetAlert
          showCancel
          confirmBtnBsStyle="danger"
          danger
          show={isShow}
          onConfirm={() => alertHandler(true)}
          onCancel={() => alertHandler(false)}
          cancelBtnBsStyle="default"
          title="리스트삭제"
        >
          삭제하시겠습니까?
        </SweetAlert>
      </NewCard>
    </>
  )
}

export default NoticeListGuide
