import React, { useContext } from "react"
import Breadcrumb from "./breadcrumb"

const BennerList = ({ title, parent, children }) => {
  // let 데이터 = useContext(데이터context);
  return (
    <>
      <Breadcrumb title={title} parent={parent} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                {/*  */}
                {children}
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BennerList
