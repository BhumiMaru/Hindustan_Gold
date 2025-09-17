import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Item_Request_Table from "./Item_Request_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import View_Item_Request_Details from "./View_Item_Request_Details";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Item_Request_List() {
  const { getItemRequestData } = useItemRequest();
  const { modal } = useUIContext();
  useEffect(() => {
    getItemRequestData();
  }, []);
  return (
    <>
      {/* -----------------START ITEM REQUEST LIST---------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="row px-3 pt-2">
              <div className="col-lg-5 mb-1 ">
                <ul
                  className="nav nav-pills nav-fill border rounded bg-label-primary"
                  role="tablist"
                >
                  <li className="nav-item mb-1 mb-sm-0" role="presentation">
                    <button
                      type="button"
                      className="nav-link active waves-effect waves-light"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#navs-pills-justified-home"
                      aria-controls="navs-pills-justified-home"
                      aria-selected="true"
                    >
                      <span className="d-none d-sm-inline-flex align-items-center">
                        <i className="icon-base ti tabler-home icon-sm me-1_5"></i>
                        My Request
                      </span>
                      <i className="icon-base ti tabler-home icon-sm d-sm-none"></i>
                    </button>
                  </li>
                  <li className="nav-item mb-1 mb-sm-0" role="presentation">
                    <button
                      type="button"
                      className="nav-link waves-effect waves-light"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#navs-pills-justified-profile"
                      aria-controls="navs-pills-justified-profile"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <span className="d-none d-sm-inline-flex align-items-center">
                        <i className="icon-base ti tabler-user icon-sm me-1_5"></i>
                        Approvel Request
                      </span>
                      <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                        3
                      </span>
                      <i className="icon-base ti tabler-user icon-sm d-sm-none"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-sm-block d-lg-flex justify-content-between px-3 pt-1">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
                <div className="input-group input-group-merge">
                  <span className="input-group-text" id="basic-addon-search31">
                    <i className="icon-base ti tabler-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Request..."
                    aria-label="Search Request..."
                    aria-describedby="basic-addon-search31"
                  />
                </div>
              </div>
              <div className=" d-sm-block d-lg-flex gap-2">
                <Link
                  to="/user/request/request-create/material"
                  className="btn btn-primary text-white waves-effect waves-light"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Material Request
                </Link>
                <Link
                  to="/user/request/request-create/service"
                  className="btn btn-info waves-effect waves-light"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Service Request
                </Link>
                <button
                  className="btn buttons-collection btn-label-secondary  waves-effect"
                  type="button"
                >
                  <span>
                    <span className=" d-sm-block d-lg-flex align-items-center gap-1">
                      <i className="icon-base ti tabler-upload icon-xs"></i>
                      <span className="d-sm-inline-block">Export</span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="row px-3 pt-2 pb-2">
              <div className="col-lg-3">
                <select id="select10Basic" className="select2 form-select">
                  <option value="AK">Select&nbsp;Type</option>
                  <option value="HI">Item</option>
                  <option value="CA">Services</option>
                  <option value="NV">Asset</option>
                </select>
              </div>
              <div className="col-lg-3">
                <select id="select7Basic" className="select2 form-select">
                  <option value="AK">Select&nbsp;Item</option>
                  <option value="HI">Category</option>
                  <option value="CA">Category</option>
                  <option value="NV">Category</option>
                </select>
              </div>
              <div className="col-lg-3">
                <select id="select9Basic" className="select2 form-select">
                  <option value="AK">Select&nbsp;Status</option>
                  <option value="HI">Active</option>
                  <option value="CA">Deactive</option>
                </select>
              </div>
              <div className="col-lg-3">
                <input
                  type="date"
                  id="bs-rangepicker-range"
                  className="form-control"
                />
              </div>
            </div>

            <div className="card-datatable table-responsive pt-0">
              <Item_Request_Table />
              <Pagination />
            </div>
          </div>
        </div>
      </>

      {modal.viewItemRequest && <View_Item_Request_Details />}
      {/* -----------------END ITEM REQUEST LIST---------------- */}
    </>
  );
}
