import React, { useContext, useState, useEffect, isValidElement } from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
import NewCard from "../components/common/NewCard"
import "react-image-lightbox/style.css"
import Cookie from "js-cookie"
import axios from "axios"
import Pagenation from "../util/Pagenation"
import SweetAlert from "react-bootstrap-sweetalert"

const BannerList = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [bannerlists, setBannerlists] = useState({})
  const [indexState, setIndex] = useState(0)
  const [listNomber, setListNomber] = useState(0)
  // const list = bannerlists.list.filter((item, i) => i !== index)
  const deleteList = (listNo, index) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let form = new FormData()
      form.append("banner_no", listNo)
      axios
        .post("/api/v1/banner/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const lists = bannerlists.lists.filter((item, i) => i !== index)
          setBannerlists({
            ...bannerlists,
            lists: bannerlists.lists.filter((item, i) => i !== index)
          })
        })
    }
  }

  useEffect(() => {
    let form = new FormData()
    form.append("index", 1)
    axios
      .post("/api/v1/banner/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })
      .then(function(response) {
        console.log(response)
        if (response.data.status == "success") {
          setBannerlists({
            lists: response.data.data.list,
            count: response.data.data.count
          })
        }
      })
  }, [])

  const fn = async d => {
    let form = new FormData()
    form.append("index", d)

    try {
      const { data } = await axios.post("/api/v1/banner/list", form, {
        headers: {
          Authorization: Cookie.get("token")
        }
      })

      if (data.status == "success") {
        setBannerlists({
          lists: data.data.list,
          count: data.data.count
        })
      }
    } catch (error) {
      alert("페이지를 로딩하는데 실패했어요.")
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
      form.append("banner_no", listNomber)
      console.log()
      axios
        .post("/api/v1/banner/delete", form, {
          headers: { Authorization: Cookie.get("token") }
        })
        .then(response => {
          const lists = bannerlists.lists.filter((item, i) => i !== indexState)
          setBannerlists({
            ...bannerlists,
            lists: bannerlists.lists.filter((item, i) => i !== indexState)
          })
        })
    }
  }

  return (
    <>
      <NewCard title="배너 리스트" parent="배너 관리">
        <div className="bennerContent">
          <h3>배너리스트 </h3>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              history.push("/banneradd/")
            }}
          >
            배너등록
          </button>
        </div>
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" />
                    <th scope="col">노출순위</th>
                    <th scope="col">작성일시</th>
                    <th scope="col">대표이미지</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {bannerlists.lists &&
                    bannerlists.lists.map((list, index) => {
                      return (
                        <tr>
                          <th scope="row" key={list.banner_no}>
                            {list.banner_no}
                          </th>
                          <td>{list.z_index}</td>
                          {/* <td>{list.username}</td> */}
                          <td>{list.registered}</td>
                          <td>
                            <img
                              src={list.zh_image}
                              alt="Gallery"
                              className="img-100 b-r-15"
                              onClick={() => {
                                setIsOpen(true)
                                setPhotoIndex(1)
                              }}
                            />
                            &nbsp;&nbsp;
                            <img
                              src={list.en_image}
                              alt="Gallery"
                              className="img-100 b-r-15"
                              onClick={() => {
                                setIsOpen(true)
                                setPhotoIndex(1)
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-warning active  btn -xs btn-sm"
                              type="button"
                              onClick={() => {
                                // deleteList(list.banner_no, index)
                                onNobtn()
                                setIndex(index)
                                setListNomber(list.banner_no)
                              }}
                            >
                              삭제
                            </button>
                            &nbsp; &nbsp;
                            {/* <button className="edit-button">수정</button>{' '} */}
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ backgroundColor: "#43a1df" }}
                              type="button"
                              onClick={() => {
                                history.push(`/banner/update/${list.banner_no}`)
                              }}
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
          <Pagenation data={bannerlists} fn={fn} />
        </div>
        <SweetAlert
          showCancel
          confirmBtnBsStyle="danger"
          danger
          show={isShow}
          onConfirm={() => alertHandler(true)}
          onCancel={() => alertHandler(false)}
          cancelBtnBsStyle="default"
          title="배너삭제"
        >
          삭제하시겠습니까?
        </SweetAlert>
      </NewCard>
    </>
  )
}

export default BannerList
