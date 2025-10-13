import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import PI_Request_Table from "./PI_Request_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../../utils/decryptData";
import Date_Range_Model from "../../../../../components/Date Range/Date_Range_Model";
import moment from "moment";

export default function PI_Request_List() {
  const {
    search,
    setSearch,
    getPIRequest,
    activeTab,
    pagination,
    setPagination,
    setActiveTab,
    piRequest,
    selectedType,
    setSelectedType,
    itemName,
    setItemName,
    department,
    setDepartment,
    orderBy,
    setOrderBy,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePIRequest();
  const { setFilterItem, fetchItemFilter, filterItem } = useItemRequest();
  const { deptFilter, setDeptFilter, fetchDeptFilter } = useDepartment();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const {
    filterUser,
    fetchUserFilter,
    setFilterUser,
    fetchUserPermission,
    userPermission,
  } = useUserCreation();

  useEffect(() => {
    fetchItemFilter();
    fetchDeptFilter();
    fetchUserFilter();
  }, []);

  useEffect(() => {
    getPIRequest({
      type: activeTab,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    activeTab,
    selectedType,
    itemName,
    department,
    orderBy,
    search,
    status,
    startDate,
    endDate,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  // ✅ Get saved auth data
  const savedAuth = sessionStorage.getItem("authData");
  let user = null;

  if (savedAuth) {
    try {
      const decrypted = decryptData(savedAuth);
      user = decrypted?.user || null;
      // console.log("user", user);
    } catch (error) {
      console.error("Error decrypting auth data", error);
    }
  }

  useEffect(() => {
    fetchUserPermission(user.id);
  }, [user.id]);

  // console.log(userPermission);

  const handleDateSelect = (range) => {
    setSelectedDateRange(range);

    if (!range) {
      setStartDate("");
      setEndDate("");
      return;
    }

    // Split "DD/MM/YYYY - DD/MM/YYYY"
    const [start, end] = range.split(" - ");

    // ✅ Convert to YYYY-MM-DD for API
    const formattedStart = start
      ? moment(start, "DD/MM/YYYY").format("YYYY-MM-DD")
      : "";
    const formattedEnd = end
      ? moment(end, "DD/MM/YYYY").format("YYYY-MM-DD")
      : "";

    setStartDate(formattedStart);
    setEndDate(formattedEnd);

    setShowDatePicker(false);
  };

  return (
    <>
      {/* ------------------START PI REUEST LIST-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="row px-3 pt-2 pb-2">
            <div className="col-lg-6 mb-1 ">
              <ul
                className="nav nav-pills nav-fill border rounded bg-label-primary"
                role="tablist"
              >
                {userPermission.some(
                  (prem) =>
                    prem.type === "Get Quotation" &&
                    (prem.permission === "add" || prem.permission === "view")
                ) && (
                  <li className="nav-item mb-1 mb-sm-0" role="presentation">
                    <button
                      type="button"
                      className={`nav-link waves-effect waves-light ${
                        activeTab === "all_request" ? "active" : ""
                      }`}
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#navs-pills-justified-home"
                      aria-controls="navs-pills-justified-home"
                      aria-selected="true"
                      onClick={() => setActiveTab("all_request")}
                    >
                      <span className="d-none d-sm-inline-flex align-items-center">
                        <i className="icon-base ti tabler-home icon-sm me-1_5" />
                        All Request
                      </span>
                      <i className="icon-base ti tabler-home icon-sm d-sm-none" />
                    </button>
                  </li>
                )}

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
                      <i className="icon-base ti tabler-home icon-sm me-1_5" />
                      My Request
                    </span>
                    <i className="icon-base ti tabler-home icon-sm d-sm-none" />
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
                    tabIndex={-1}
                    onClick={() => setActiveTab("approval_request")}
                  >
                    <span className="d-none d-sm-inline-flex align-items-center">
                      <i className="icon-base ti tabler-user icon-sm me-1_5" />
                      Approval Request
                    </span>
                    {activeTab === "approval_request" && (
                      // (loading ? (
                      //   <span className="h-px-20 w-px-20 d-flex align-items-center justify-content-center">
                      //     <Loader />
                      //   </span>
                      // ) : (
                      <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                        {piRequest.length}
                      </span>
                    )}
                    <i className="icon-base ti tabler-user icon-sm d-sm-none" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between px-3 pb-2">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Request..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div className="d-flex gap-2">
              <Link
                to="/po-material/pi-request-create/material"
                className="btn btn-primary waves-effect waves-light text-decoration-none"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Material PI
              </Link>
              <Link
                to="/po-material/pi-request-create/service"
                className="btn btn-info waves-effect waves-light text-decoration-none"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Services PI
              </Link>
              <button
                className="btn buttons-collection btn-label-secondary  waves-effect"
                type="button"
              >
                <span>
                  <span className=" d-sm-block d-lg-flex align-items-center gap-1">
                    <i className="icon-base ti tabler-upload icon-xs" />
                    <span className="d-sm-inline-block">Export</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="row px-3 pb-2 ">
            <div className="col-lg-3">
              <div className="position-relative">
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
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
                <CustomSelect
                  id="selectItemName"
                  options={[
                    { value: "all", label: "All Items" }, // ✅ All option first
                    ...(filterItem?.map((item) => ({
                      value: item.item_id,
                      label: item.item_name,
                    })) || []),
                  ]}
                  value={itemName}
                  onChange={setItemName}
                  placeholder="Select Item"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
                <CustomSelect
                  id="selectDept"
                  options={[
                    { value: "all", label: "All Departments" }, // ✅ All option first
                    ...(deptFilter?.map((dept) => ({
                      value: dept.id,
                      label: dept.department_name,
                    })) || []),
                  ]}
                  value={department}
                  onChange={setDepartment}
                  placeholder="Select Department"
                />
              </div>
            </div>
            <div className="col-lg-3 ">
              <div className="position-relative">
                <CustomSelect
                  id="selectUser"
                  options={[
                    { value: "all", label: "All Users" }, // ✅ All option first
                    ...(filterUser?.map((user) => ({
                      value: user.id,
                      label: user.name,
                    })) || []),
                  ]}
                  value={orderBy}
                  onChange={setOrderBy}
                  placeholder="Select Created By"
                />
              </div>
            </div>
            <div className="col-lg-3 mt-2">
              <div className="position-relative">
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
                      value: "approved",
                      label: "Approved",
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
                  value={status}
                  onChange={setStatus}
                  placeholder="Select Item Status"
                />
              </div>
            </div>
            {/* <div className="col-lg-3 mt-2">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div> */}

            <div className="col-lg-3 mt-2">
              <div className="d-flex items-center">
                <input
                  type="text"
                  id="filterFilesByDate"
                  placeholder="Filter by Date"
                  className="form-control cursor-pointer"
                  autoComplete="off"
                  readOnly
                  value={selectedDateRange}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                />
                {showDatePicker && (
                  <Date_Range_Model
                    style={{
                      top: "193px",
                    }}
                    onDateSelect={handleDateSelect}
                    onClose={() => setShowDatePicker(false)}
                  />
                )}
                {selectedDateRange && (
                  <button
                    onClick={() => {
                      setSelectedDateRange("");
                      setStartDate("");
                      setEndDate("");
                      setShowDatePicker(false);
                    }}
                    className="btn btn-sm text-danger ms-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="card-datatable">
            <PI_Request_Table userPermission={userPermission} />
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

      {/* ------------------END PI REUEST LIST-------------------- */}
    </>
  );
}
