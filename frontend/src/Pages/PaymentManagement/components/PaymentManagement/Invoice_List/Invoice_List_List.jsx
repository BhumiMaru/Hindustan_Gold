import React, { useEffect, useState } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Invoice_List_Table from "./Invoice_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import {
  InvoiceProvider,
  useInvoice,
} from "../../../../../Context/PIAndPoManagement/Invoice";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Date_Range_Model from "../../../../../components/Date Range/Date_Range_Model";
import {
  useVendor,
  VendorProvider,
} from "../../../../../Context/PaymentManagement/Vendor";
import moment from "moment";
import { useUIContext } from "../../../../../Context/UIContext";
import Invoice_List_Form from "./Invoice_List_Form";
import { SubCategoryProvider } from "../../../../../Context/ItemManagement/SubCategoryContext";
import { ItemRequestProvider } from "../../../../../Context/Request Management/Item_Request";

export default function Invoice_List_List() {
  const { modal, handleOpen } = useUIContext();
  const {
    invoiceList,
    selectedType,
    setSelectedType,
    vendorName,
    setVendorName,
    status,
    setStatus,
    dateRange,
    setDateRange,
    search,
    setSearch,
    pagination,
    setPagination,
    setType,
  } = useInvoice();
  const { vendorFilter, setVendorFilter, getVendorFilter } = useVendor();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  useEffect(() => {
    getVendorFilter();
  }, []);

  useEffect(() => {
    invoiceList({
      search,
      status,
      vendorName,
      selectedType,
      startDate: dateRange.start,
      endDate: dateRange.end,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    status,
    selectedType,
    vendorName,
    dateRange.start,
    dateRange.end,
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

    const [start, end] = range.split(" - ");
    setDateRange({
      start: start ? moment(start, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
      end: end ? moment(end, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
    });

    setShowDatePicker(false);
  };

  return (
    <>
      {/* ------------START INVOICE LIST----------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Invoice..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div className="d-flex gap-2">
              {/* <button className="btn btn-info  waves-effect waves-light">
                Payment Request
              </button> */}
              <a
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#InvoiceModel"
                onClick={() => {
                  handleOpen("addInvoice");
                  setType(0);
                }}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Payment Request
              </a>
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
              <div className="position-relative">
                <CustomSelect
                  id="selectType"
                  options={[
                    { value: "material", label: "Material" },
                    { value: "service", label: "Services" },
                    { value: "asset", label: "Asset" },
                  ]}
                  value={selectedType}
                  onChange={setSelectedType}
                  placeholder="Select Type"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
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
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
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
            <Invoice_List_Table />
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
      {modal.addInvoice && (
        <InvoiceProvider>
          <VendorProvider>
            <SubCategoryProvider>
              <ItemRequestProvider>
                <Invoice_List_Form type={0} />
              </ItemRequestProvider>
            </SubCategoryProvider>
          </VendorProvider>
        </InvoiceProvider>
      )}
      {/* ------------END INVOICE LIST----------- */}
    </>
  );
}
