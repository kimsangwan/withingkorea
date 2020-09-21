import React from "react"
import { useHistory } from "react-router-dom"
import "../assets/css/layout.css"
const dummyData = [
  {
    id: "1",
    facility: "1",
    visitor: "2020.05.14",
    Sortation: "이미지",
    phone: "010-****-***9",
    date: "2020.05.14",
    Validity: "30분",
    Approval: "승인"
  },
  {
    id: "2",
    facility: "99",
    visitor: "2020.05.14",
    Sortation: "이미지",
    phone: "010-****-***1",
    date: "2020.08.14",
    Validity: "35분",
    Approval: "거절"
  },
  {
    id: "3",
    facility: "80",
    visitor: "2020.05.14",
    Sortation: "이미지",
    phone: "010-****-***3",
    date: "2020.07.14",
    Validity: "30분",
    Approval: "승인"
  }
]
const Onedayture = () => {
  const history = useHistory()
  return (
    <>
      <div className="card-block row">
        <div className="col-sm-12 col-lg-12 col-xl-12" id="bennerH">
          <div className="bennerContent">
            <div className="benner">배너관리</div>
            <div className="benner">
              <div className="benner-btn">
                <button
                  id="bnr-btn"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    history.push("/banneradd")
                  }}
                >
                  배너등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>원데이 추천관리</h5>
        </div>
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Username</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <button className="cancel-btn">취소</button>
                      &nbsp; &nbsp;
                      <button className="edit-button">수정</button>{" "}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                      <button className="cancel-btn">취소</button>
                      &nbsp; &nbsp;
                      <button className="edit-button">수정</button>{" "}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>
                      <button className="cancel-btn">취소</button>
                      &nbsp; &nbsp;
                      <button className="edit-button">수정</button>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Onedayture
