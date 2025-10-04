import React, { useEffect, useState } from "react";
// import { DateRangePicker } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Get_Quote_Table from "./Get_Quote_Table";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import {
  UserCreationProvider,
  useUserCreation,
} from "../../../../../Context/Master/UserCreationContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import DateRangePickerReact from "../../../../../components/Date Range/DateRangePickerReact";
import Date_Range_Model from "../../../../../components/Date Range/Date_Range_Model";
import moment from "moment";

export default function Get_Quote_List() {
  const {
    search,
    getQuoteList,
    setPagination,
    pagination,
    setSearch,
    itemType,
    setItemType,
    department,
    setDepartment,
    createdBy,
    setCreatedBy,
    status,
    setStatus,
    dateRange,
    setDateRange,
  } = useGetQuote();
  const { deptFilter, setDeptFilter, fetchDeptFilter } = useDepartment();
  const { filterUser, fetchUserFilter, setFilterUser } = useUserCreation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  useEffect(() => {
    fetchDeptFilter();
    fetchUserFilter();
  }, []);

  // useEffect(() => {
  //   getQuoteList({
  //     search,
  //     page: pagination.currentPage,
  //     perPage: pagination.perPage,
  //   });
  // }, [
  //   search,
  //   itemType,
  //   department,
  //   createdBy,
  //   status,
  //   pagination.currentPage,
  //   pagination.perPage,
  //   dateRange,
  // ]);

  useEffect(() => {
    getQuoteList({
      search,
      page: pagination.currentPage,
      perPage: pagination.perPage,
      itemType,
      department,
      createdBy,
      status,
      dateRange,
    });
  }, [
    search,
    itemType,
    department,
    createdBy,
    status,
    pagination.currentPage,
    pagination.perPage,
    dateRange, // ✅ refresh list when date range changes
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  const handleDateSelect = (range) => {
    setSelectedDateRange(range);

    const [start, end] = range.split(" - ");
    setDateRange({
      start: start ? moment(start, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
      end: end ? moment(end, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
    });

    setShowDatePicker(false);
  };

  return (
    <>
      {/* ---------------START GET QUOTE LIST------------------ */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Request..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div>
              {/*<a href="request-list.html" className="btn btn-primary waves-effect waves-light"
                          >
                              <span className="icon-xs icon-base ti tabler-plus me-2"></span>Create Request Quote
                          </a>*/}
            </div>
          </div>
          <div className="row px-3 pb-2">
            <div className="col-lg-3">
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
                value={itemType}
                onChange={setItemType}
                placeholder="Select Item"
              />
            </div>
            <div className="col-lg-3">
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
            <div className="col-lg-2">
              <CustomSelect
                id="selectUser"
                options={[
                  { value: "all", label: "All Users" }, // ✅ All option first
                  ...(filterUser?.map((user) => ({
                    value: user.id,
                    label: user.name,
                  })) || []),
                ]}
                value={createdBy}
                onChange={setCreatedBy}
                placeholder="Select Created By"
              />
            </div>
            <div className="col-lg-2">
              <CustomSelect
                id="selectItemStatus"
                options={[
                  {
                    value: "all",
                    label: "Select Status",
                  },
                  {
                    value: "Pending",
                    label: "Pending",
                  },
                  {
                    value: "InProgress",
                    label: "InProgress",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                  {
                    value: "Reject",
                    label: "Reject",
                  },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Item Status"
              />
            </div>
            <div className="col-lg-2">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
              {/* <input
                type="date"
                className="form-control mb-1"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />{" "}
              <input
                type="date"
                className="form-control"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                /> */}
            </div>

            <div className="col-lg-4 mt-2">
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
                      top: "150px",
                    }}
                    onDateSelect={handleDateSelect}
                    onClose={() => setShowDatePicker(false)}
                  />
                )}
                {selectedDateRange && (
                  <button
                    onClick={() => {
                      setSelectedDateRange("");
                      setDateRange({ start: "", end: "" });
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
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                            .table1 thead tr th {\n                                padding-block: 0.5rem !important;\n                                padding-inline-end: 1rem;\n                            }\n\n                            .table1 tbody tr {\n                                background-color: #f9f9f9 !important;\n                            }\n                        ",
            }}
          />
          <div className="card-datatable">
            <UserCreationProvider>
              <Get_Quote_Table />
            </UserCreationProvider>
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

      {/* ---------------END GET QUOTE LIST------------------ */}
    </>
  );
}
