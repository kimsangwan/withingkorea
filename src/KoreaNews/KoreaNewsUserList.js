import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import NewCard from "../components/common/NewCard"
import SweetAlert from "react-bootstrap-sweetalert"
import "react-image-lightbox/style.css"
import axios from "axios"
import Cookie from "js-cookie"
import { message } from "antd"
import Pagenation from "../util/Pagenation"
const KoreaNewsUserList = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [newsList, setNewsList] = useState({})
  const [indexNum, setIndexNum] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [listNomber, setListNomber] = useState(0)
  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)

    axios
      .post("/api/v1/news/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(response => {
        if (response.data.status === "success") {
          setNewsList({
            list: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
      .catch(err => {
        alert("한국소식을  불러오는데 실패했습니다.")
      })
  }, [])

  const fn = async d => {
    let form = new FormData()
    form.append("index", d)

    try {
      const { data } = await axios.post("/api/v1/news/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setNewsList({
          list: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      message.warning("페이지를 로딩하는데 실패했어요.")
    }

    // 이전 다음 페이지를 위한 api호출
    // axios로 서버 통신
    // success시 nomalList 업데이트
  }
  const onNobtn = () => {
    setIsShow(!isShow)
  }
  const alertHandler = okay => {
    setIsShow(!isShow)
    if (okay) {
      let form = new FormData()
      form.append("news_no", listNomber)

      axios
        .post("api/v1/news/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          // const listse = zhlist.list.filter((item, i) => i !== indexNum)
          setNewsList({
            ...newsList,
            list: newsList.list.filter((item, i) => i !== indexNum)
          })
        })
    }
  }
  return (
    <>
      <NewCard title="한국소식리스트" parent="한국소식관리">
        <div className="bennerContent">
          <h5>한국소식리스트</h5>
          <button
            className="btn btn-secondary "
            onClick={() => {
              history.push("/koreanewsadd")
            }}
          >
            한국소식등록
          </button>
        </div>
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      style={{ width: "5%", textAlign: "left" }}
                    />
                    <th scope="col" style={{ width: "10%", textAlign: "left" }}>
                      작성일시
                    </th>
                    <th scope="col" style={{ width: "10%", textAlign: "left" }}>
                      카테고리
                    </th>
                    <th scope="col" style={{ width: "25%", textAlign: "left" }}>
                      대표이미지
                    </th>
                    <th scope="col" style={{ width: "30%", textAlign: "left" }}>
                      제목
                    </th>
                    <th scope="col" style={{ width: "20%" }} />
                  </tr>
                </thead>
                <tbody>
                  {newsList.list &&
                    newsList.list.map((lists, index) => {
                      return (
                        <tr>
                          <th
                            scope="row"
                            key={index}
                            style={{ textAlign: "left" }}
                          >
                            {index}
                          </th>
                          <td style={{ textAlign: "left" }}>
                            {lists.registered}
                          </td>
                          <td style={{ textAlign: "left" }}>{""}</td>
                          <td style={{ textAlign: "left" }}>
                            <img
                              src={lists.en_image}
                              alt="Gallery"
                              className="img-100 b-r-15"
                              onClick={() => {
                                setIsOpen(true)
                                setPhotoIndex(1)
                              }}
                            />
                            &nbsp;&nbsp;
                            <img
                              src={lists.zh_image}
                              alt="Gallery"
                              className="img-100 b-r-15"
                              onClick={() => {
                                setIsOpen(true)
                                setPhotoIndex(1)
                              }}
                            />
                          </td>
                          <td style={{ textAlign: "left" }}>
                            <strong>{lists.zh_title}</strong>
                            <br />
                            <strong>{lists.en_title}</strong>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning active  btn -xs btn-sm"
                              type="button"
                              onClick={() => {
                                onNobtn()
                                setIndexNum(index)
                                setListNomber(lists.news_no)
                                // deleteList(lists.rec_no, index)
                              }}
                            >
                              삭제
                            </button>
                            &nbsp; &nbsp;
                            {/* <button className="edit-button">수정</button>{' '} */}
                            <button
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
          <Pagenation data={newsList} fn={fn} />
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
        </SweetAlert>{" "}
      </NewCard>
    </>
  )
}

export default KoreaNewsUserList
