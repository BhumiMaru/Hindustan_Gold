import React, { useEffect, useState } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import GRN_List_Table from "./GRN_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import UpdateGRN from "./UpdateGRN";
import { useUIContext } from "../../../../../Context/UIContext";
import Date_Range_Model from "../../../../../components/Date Range/Date_Range_Model";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";

export default function GRN_List_List() {
  const {
    GRNList,
    search,
    setSearch,
    status,
    setStatus,
    itemName,
    setItemName,
    vendorName,
    setVendorName,
    dateRange,
    setDateRange,
    pagination,
    setPagination,
  } = useGRN();
  const { modal } = useUIContext();
  const { vendorFilter, setVendorFilter, getVendorFilter } = useVendor();
  const { fetchItemFilter, filterItem } = useItemRequest();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  useEffect(() => {
    getVendorFilter();
    fetchItemFilter();
  }, []);

  useEffect(() => {
    GRNList({
      status,
      search,
      item_name: itemName,
      vendor_name: vendorName,
      pi_date_start_date: dateRange.start,
      pi_date_end_date: dateRange.end,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    status,
    itemName,
    vendorName,
    dateRange,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // GRNList({ page, perPage: pagination.perPage });
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
    // GRNList({ page: 1, perPage: size });
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
      {/* -------------START GRN LIST --------------- */}
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
          <div className="row px-3 pb-2">
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
                value={vendorName}
                onChange={setVendorName}
                placeholder="Select Vendor"
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectItemStatus"
                options={[
                  { value: "all", label: "Select Status" },
                  { value: "Pending", label: "Pending" },
                  // { value: "InProgress", label: "InProgress" },
                  { value: "Approve", label: "Approve" },
                  { value: "Reject", label: "Reject" },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Item Status"
              />
            </div>
            <div className="col-lg-3">
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
          <div className="card-datatable table-responsive pt-0">
            <GRN_List_Table />
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

      {/* -------------END GRN LIST --------------- */}
    </>
  );
}
