import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import NewCard from "../components/common/NewCard"
import SweetAlert from "react-bootstrap-sweetalert"
import { message } from "antd"
import "react-image-lightbox/style.css"
import axios from "axios"
import Cookie from "js-cookie"
import Pagenation from "../util/Pagenation"
const NoticeListUser = () => {
  const history = useHistory()
  const [noticeLists, setNoticeLists] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [listNomber, setListNomber] = useState(0)
  const [indexNum, setIndexNum] = useState(0)

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    axios
      .post("/api/v1/notice/listU", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setNoticeLists({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        message.warning("공지사항을 불러오는데 실패했습니다.")
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
        .post("/api/v1/notice/deleteU", form, {
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
      const { data } = await axios.post("/api/v1/notice/listU", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status === "success") {
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
      <NewCard title="공지사항 리스트" parent="공지사항관리">
        <div className="bennerContent">
          <h5>유저용 공지사항</h5>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              history.push("/add/notice/user")
            }}
          >
            유저용 공지사항작성하기
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
                          <td>
                            {list.en_title}
                            <br />
                            {list.zh_title}
                          </td>
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
                            <button
                              className="btn btn-secondary btn-sm"
                              type="button"
                              onClick={() => {
                                history.push(`/notice/update/${list.notice_no}`)
                              }}
                            >
                              수정
                            </button>
                          </td>
                        </tr>
                      )
                    })}{" "}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagenation data={noticeLists} fn={fn} />
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

export default NoticeListUser
