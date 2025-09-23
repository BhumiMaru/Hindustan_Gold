import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item_Request_Table from "./Item_Request_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import View_Item_Request_Details from "./View_Item_Request_Details";
import { useUIContext } from "../../../../../Context/UIContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Approve_Request_Modal from "./Approve_Request_Modal";
import Reject_Request_Modal from "./Reject_Request_Modal";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Item_Request_List() {
  const {
    getItemRequestData,
    pagination,
    setPagination,
    itemList,
    activeTab,
    setActiveTab,
    itemRequest,
    filterItem,
    fetchItemFilter,
  } = useItemRequest();
  const [search, setSearch] = useState("");
  const { modal } = useUIContext();
  const [selectedType, setSelectedType] = useState("all"); // item type filter
  const [statusFilter, setStatusFilter] = useState("all"); // status filter
  const [itemNameId, setItemNameId] = useState(null);

  // when type changes, fetch items and update itemRequestData
  // useEffect(() => {
  //   if (selectedType) {
  //     getItemNameAndId(selectedType);
  //     setItemRequestData((prev) => ({ ...prev, item_type: selectedType }));
  //   }
  // }, [selectedType]);

  // // when item name changes, update item_id in itemRequestData
  // useEffect(() => {
  //   if (itemNameId) {
  //     setItemRequestData((prev) => ({ ...prev, id: itemNameId }));
  //   }
  // }, [itemNameId]);

  useEffect(() => {
    getItemRequestData({
      search,
      type: activeTab,
      item_type: selectedType === "all" ? "" : selectedType,
      status: statusFilter === "all" ? "" : statusFilter,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
    fetchItemFilter();
  }, [
    search,
    activeTab,
    selectedType,
    statusFilter,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

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
                      className={`nav-link waves-effect waves-light ${
                        activeTab === "my_request" ? "active" : ""
                      }`}
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#navs-pills-justified-home"
                      aria-controls="navs-pills-justified-home"
                      aria-selected="true"
                      onClick={() => setActiveTab("my_request")}
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
                      className={`nav-link waves-effect waves-light ${
                        activeTab === "approval_request" ? "active" : ""
                      }`}
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#navs-pills-justified-profile"
                      aria-controls="navs-pills-justified-profile"
                      aria-selected="false"
                      tabIndex="-1"
                      onClick={() => setActiveTab("approval_request")}
                    >
                      <span className="d-none d-sm-inline-flex align-items-center">
                        <i className="icon-base ti tabler-user icon-sm me-1_5"></i>
                        Approval Request
                      </span>
                      {activeTab === "approval_request" && (
                        // (loading ? (
                        //   <span className="h-px-20 w-px-20 d-flex align-items-center justify-content-center">
                        //     <Loader />
                        //   </span>
                        // ) : (
                        <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                          {itemRequest.length}
                        </span>
                      )}

                      <i className="icon-base ti tabler-user icon-sm d-sm-none"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-sm-block d-lg-flex justify-content-between px-3 pt-1">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
                <SearchBar
                  placeholder="Search Request..."
                  value={search}
                  onChange={setSearch}
                  onSubmit={(val) => setSearch(val)}
                />
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
                {/* <select
                  id="select10Basic"
                  className="select2 form-select"
                  value={selectedType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedType(value);
                    console.log("item type:", value);
                  }}
                >
                  {console.log("selected type:", selectedType)}
                  <option value="">Select Type</option>
                  <option value="material">Material</option>
                  <option value="service">Service</option>
                  <option value="asset">Asset</option>
                </select> */}
                <CustomSelect
                  id="selectItemType"
                  options={[
                    {
                      value: "all",
                      label: "Select Item Type",
                    },
                    {
                      value: "material",
                      label: "Material",
                    },
                    {
                      value: "service",
                      label: "Service",
                    },
                    {
                      value: "asset",
                      label: "Asset",
                    },
                  ]}
                  value={selectedType}
                  onChange={setSelectedType}
                  placeholder="Select Item"
                />
              </div>
              <div className="col-lg-3">
                {/* <select id="select7Basic" className="select2 form-select">
                  <option value="AK">Select&nbsp;Item</option>
                  <option value="HI">Category</option>
                  <option value="CA">Category</option>
                  <option value="NV">Category</option>
                </select> */}
                <CustomSelect
                  id="selectItemName"
                  options={filterItem?.map((item) => ({
                    value: item.item_id,
                    label: item.item_name,
                  }))}
                  // value={itemNameId}
                  // onChange={setItemNameId}
                  placeholder="Select Item"
                />
                {/* {/* {console.log("item name", itemNameId)} */}
                {console.log("filterItem", filterItem)}
              </div>
              <div className="col-lg-3">
                <CustomSelect
                  id="selectItemStatus"
                  options={[
                    {
                      value: "all",
                      label: "Select Status",
                    },
                    {
                      value: "pending",
                      label: "Pending",
                    },
                    {
                      value: "completed",
                      label: "Completed",
                    },
                    {
                      value: "reject",
                      label: "Reject",
                    },
                  ]}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Select Item Status"
                />
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
              <Item_Request_Table search={search} />
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.total}
                itemsPerPage={pagination.perPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </div>
      </>

      {modal.viewItemRequest && <View_Item_Request_Details />}
      {modal.viewApprove && <Approve_Request_Modal />}
      {modal.viewReject && <Reject_Request_Modal />}
      {/* -----------------END ITEM REQUEST LIST---------------- */}
    </>
  );
}
