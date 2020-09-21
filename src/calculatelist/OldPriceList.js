import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import "../assets/css/layout.css"
import { Nav, TabContent } from "react-bootstrap"
import Data from "../Data"
import Breadcrumb from "../components/common/breadcrumb"
import PagnationTool from "../PagnationTool"
import one from "../assets/images/product/1.png"

const OldPriceList = () => {
  const history = useHistory()
  let [tab, settab] = useState(0)
  // const [en, seten] = useState(false);
  // const [zn, setzn] = useState(false);
  // // const 영어관리스위치 = () => {
  //   seten(!en);
  // };
  return (
    <>
      <Breadcrumb title="지난정산내역" parent="정산내역관리" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="price-ment">
                  <h2> 지난 정산내역</h2>
                </div>
                <GuideSome />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="card-block row">
        <div className="col-sm-12 col-lg-12 col-xl-12"></div>
      </div> */}
    </>
  )
}
// function TabContent2(props) {
//   if (props.tab === 0) {
//     return (
//       <div>
//         <GuideSome />
//       </div>
//     )
//   } else if (props.tab === 1) {
//     return (
//       <div>
//         <GuideOk />
//       </div>
//     )
//   }
// }

const GuideSome = () => {
  const [seachtext, setserchText] = React.useState("")
  const [dummyData, setDummyData] = React.useState(Data)
  const SerchFilter = () => {
    const filter = Data.filter(d => d.name.indexOf(seachtext) > -1)
    setDummyData(filter)
  }
  const onRemove = id => {
    setDummyData(dummyData.filter(user => user.id !== id))
  }
  const history = useHistory()
  const { id } = useParams()

  return (
    <div>
      <div className="card">
        <div className="card-block row">
          <div className="col-sm-12 col-lg-12 col-xl-12">
            <div className="card-body">
              <div className="user-search-bar">
                <div className="search-input">
                  <div className="form-group">
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="가이드명으로 검색하세요"
                      onChange={(e) => setserchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          SerchFilter()
                        }
                      }}
                    /> */}
                  </div>
                </div>

                <div onClick={SerchFilter} className="icon-search" />
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" />
                      <th scope="col">정산일</th>
                      <th scope="col">은행명</th>
                      <th scope="col">계좌번호</th>
                      <th scope="col">입금자명</th>
                      <th scope="col">입금금액</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map(a => {
                      return (
                        <tr>
                          <th scope="row" key={a.id}>
                            {a.id}
                          </th>
                          <td>{a.datea}</td>

                          <td>{a.bank}</td>

                          <td>{a.bankno}</td>
                          <td>{a.name}</td>
                          <td>{a.KoreaPr}</td>

                          <td>
                            <button
                              className="  btn btn-secondary btn-sm"
                              onClick={() => {
                                history.push(`/price/ditail/${a.id}`)
                              }}
                            >
                              보기
                            </button>
                            {/* <button
                              className="user-view-button"
                              onClick={() => onRemove(a.id)}
                            >
                              삭제
                            </button> */}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <PagnationTool />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//   )
// }
export default OldPriceList
