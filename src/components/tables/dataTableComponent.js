import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../data/dummyTableData";
import Datatable from "../common/datatable";

function DataTableComponent() {
  return (
    <Fragment>
      <Breadcrumb title="Data Tables" parent="Table" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Delete Single Data</h5>
              </div>
              <div className="card-body datatable-react">
                <Datatable
                  multiSelectOption={true}
                  myData={data}
                  pageSize={6}
                  pagination={false}
                  class="-striped -highlight"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Select Multiple Data</h5>
              </div>
              <div className="card-body datatable-react">
                <Datatable
                  multiSelectOption={false}
                  myData={data}
                  pageSize={6}
                  pagination={false}
                  class="-striped -highlight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DataTableComponent;
