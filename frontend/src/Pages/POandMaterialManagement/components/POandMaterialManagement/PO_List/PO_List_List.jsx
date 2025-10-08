import React, { useEffect, useState } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import PO_List_Table from "./PO_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { decryptData } from "../../../../../utils/decryptData";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import Date_Range_Model from "../../../../../components/Date Range/Date_Range_Model";

export default function PO_List_List() {
  const {
    PoList,
    getPoList,
    pagination,
    setPagination,
    search,
    setSearch,
    status,
    setStatus,
    itemName,
    setItemName,
    selectedType,
    setSelectedType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    vendor,
    setVendor,
  } = usePOCreate();
  const { vendorFilter, setVendorFilter, getVendorFilter } = useVendor();
  const { fetchItemFilter, filterItem } = useItemRequest();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  

  useEffect(() => {
    getVendorFilter();
    fetchItemFilter();
  }, []);

  useEffect(() => {
    getPoList({
      search,
      status,
      poType: selectedType,
      item: itemName,
      vendor,
      start_date: startDate,
      end_date: endDate,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    status,
    selectedType,
    itemName,
    vendor,
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

  const handleDateSelect = (range) => {
    setSelectedDateRange(range);

    // Split "DD/MM/YYYY - DD/MM/YYYY"
    const [start, end] = range.split(" - ");
    setStartDate(start);
    setEndDate(end);
    setShowDatePicker(false);
  };

  return (
    <>
      {/* -----------------START PO LIST ------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          {/* <div className="row px-3 pt-2">
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
                      <i className="icon-base ti tabler-home icon-sm me-1_5" />
                      My Request
                    </span>
                    <i className="icon-base ti tabler-home icon-sm d-sm-none" />
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
                    tabIndex={-1}
                  >
                    <span className="d-none d-sm-inline-flex align-items-center">
                      <i className="icon-base ti tabler-user icon-sm me-1_5" />
                      Approvel Request
                    </span>
                    <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                      3
                    </span>
                    <i className="icon-base ti tabler-user icon-sm d-sm-none" />
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="d-flex justify-content-between px-3 pt-1">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search PO..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div>
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
              {/*  <a href="request-list.html" className="btn btn-primary waves-effect waves-light"
                            >
                                <span className="icon-xs icon-base ti tabler-plus me-2"></span>Create Request
                            </a>*/}
            </div>
          </div>
          <div className="row px-3 pb-2 pt-2">
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
                value={selectedType}
                onChange={setSelectedType}
                placeholder="Select Item"
              />
            </div>
            <div className="col-lg-3">
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
            <div className="col-lg-3">
              <CustomSelect
                id="selectVendorName"
                options={[
                  { value: "all", label: "All Vendors" }, // ✅ All option first
                  ...(vendorFilter?.map((item) => ({
                    value: item.id,
                    label: item.vendor_name,
                  })) || []),
                ]}
                value={vendor}
                onChange={setVendor}
                placeholder="Select Vendor"
              />
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
                      top: "137px",
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
          <div className="card-datatable table-responsive pt-0">
            <PO_List_Table />
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

      {/* -----------------END PO LIST ------------------- */}
    </>
  );
}
