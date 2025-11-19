import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Invoice_List_Table from "./Invoice_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
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
import { decryptData } from "../../../../../utils/decryptData";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { getData } from "../../../../../utils/api";
import { ENDPOINTS } from "../../../../../constants/endpoints";
import { useLocation, useNavigate } from "react-router-dom";

export default function Invoice_List_List() {
  const { modal, handleOpen, handleClose } = useUIContext();
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

  const { fetchUserPermission, userPermission } = useUserCreation();
  const { vendorFilter, getVendorFilter } = useVendor();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [exporting, setExporting] = useState(false); // ✅ for loader on Export

  // Location for search filter by url
  const location = useLocation();
  const navigate = useNavigate();
  const [urlParamsApplied, setUrlParamsApplied] = useState(false);

  const getAuthData = sessionStorage.getItem("authData");
  const decryptAuthData = decryptData(getAuthData);
  const user = decryptAuthData?.user;

  // Read URL params only ONCE when page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusUrl = params.get("status");

    if (statusUrl) {
      setStatus(statusUrl);
    }

    // Mark URL params applied
    setUrlParamsApplied(true);
  }, []); // runs only once

  useEffect(() => {
    fetchUserPermission(user.id);
  }, [user.id]);

  useEffect(() => {
    getVendorFilter();
  }, []);

  useEffect(() => {
    if (!urlParamsApplied) return;
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
    urlParamsApplied,
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

  // Date Filter
  const handleDateSelect = (range) => {
    setSelectedDateRange(range);
    const [start, end] = range.split(" - ");
    setDateRange({
      start: start ? moment(start, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
      end: end ? moment(end, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
    });
    setShowDatePicker(false);
  };

  // Clear Filter
  // ✅ Clear Filter Function
  const handleClearFilters = () => {
    // Reset all filter states
    setSearch("");
    setSelectedType("all");
    setStatus("all");
    setVendorName("all");
    setDateRange({ start: "", end: "" });
    setSelectedDateRange(""); // also clears visible date input
    setShowDatePicker(false);

    // Reset pagination to first page
    setPagination((prev) => ({ ...prev, currentPage: 1 }));

    navigate(location.pathname, { replace: true });

    // ✅ Refresh list after clearing filters
    invoiceList({
      search: "",
      status: "all",
      selectedType: "all",
      vendorName: "all",
      startDate: "",
      endDate: "",
      page: 1,
      perPage: pagination.perPage,
    });
  };

  // ✅ Step 3: Excel Export Function
  const handleExportExcel = async () => {
    try {
      setExporting(true);

      const perPageLimit = 100;
      let allInvoices = [];
      let currentPage = 1;
      let totalPages = 1;

      // ✅ Loop until all pages fetched
      do {
        const res = await getData(ENDPOINTS.INVOICE.LIST, {
          status: status !== "all" ? status : undefined,
          search: search || undefined,
          type: selectedType !== "all" ? selectedType : undefined,
          vendor_id: vendorName !== "all" ? vendorName : undefined,
          start_date: dateRange.start || undefined,
          end_date: dateRange.end || undefined,
          page: currentPage,
          per_page: perPageLimit,
        });

        const apiData = res?.data?.data || res?.data || [];
        const total = res?.data?.total || apiData?.length || 0;
        totalPages = Math.ceil(total / perPageLimit);

        allInvoices = [...allInvoices, ...apiData];
        currentPage++;
      } while (currentPage <= totalPages);

      if (!allInvoices.length) {
        alert("No data available for export.");
        return;
      }

      // ✅ Format data for Excel
      const exportData = allInvoices.map((item, i) => ({
        "S.No": i + 1,
        "Invoice No": item.invoice_no || "",
        "Vendor Name": item.vendor_name || "",
        Type: item.invoice_type || "",
        "Invoice Date": item.invoice_date
          ? moment(item.invoice_date).format("DD-MM-YYYY")
          : "",
        "Taxable Amount": item.taxable_amount || "",
        "TDS Amount": item.tds_amount || "",
        "Paid Amount": item.paid_amount || "",
        Status: item.status || "",
      }));

      // ✅ Generate Excel file
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice List");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Invoice_List_${moment().format("YYYYMMDD_HHmmss")}.xlsx`);
    } catch (err) {
      console.error("Export Error:", err);
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const isAnyFilterActive =
    selectedType !== "all" ||
    status !== "all" ||
    vendorName !== "all" ||
    dateRange.start !== "" ||
    dateRange.end !== "" ||
    (location.search && location.search !== "?");

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                <SearchBar
                  placeholder="Search Invoice..."
                  value={search}
                  onChange={setSearch}
                  onSubmit={(val) => setSearch(val)}
                />
              </div>

              {/* Clear Filter */}
              {/* ✅ Correct Clear Filter Button */}
              {isAnyFilterActive && (
                <div className="d-flex align-items-center ms-2">
                  <button
                    className="btn text-danger waves-effect btn-sm"
                    onClick={handleClearFilters}
                  >
                    ✕ Clear All
                  </button>
                </div>
              )}
            </div>

            <div className="d-flex gap-2">
              <a
                className={`btn btn-primary waves-effect waves-light ${
                  userPermission.some(
                    (perm) =>
                      perm.type === "Payment Request" &&
                      (perm.permission === "add" || perm.permission === "view")
                  )
                    ? "d-block"
                    : "d-none"
                }`}
                data-bs-toggle="modal"
                data-bs-target="#InvoiceModel"
                onClick={() => {
                  handleOpen("addInvoice");
                  setType(0);
                }}
                style={{
                  color: "black",
                }}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Payment Request
              </a>

              {userPermission.some(
                (perm) =>
                  perm.type === "Payment Request" &&
                  perm.permission === "download"
              ) && (
                <button
                  className="btn buttons-collection btn-label-secondary waves-effect"
                  type="button"
                  onClick={handleExportExcel}
                  disabled={exporting}
                >
                  {exporting ? (
                    <>
                      <div
                        className="spinner-border spinner-white me-2"
                        role="status"
                      ></div>
                      Exporting...
                    </>
                  ) : (
                    <span>
                      <i className="icon-base ti tabler-upload icon-xs me-1" />
                      Export
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Filters and table remain same */}
          <div className="row px-3 pb-2">
            {/* Type Filter */}
            <div className="col-lg-3">
              <CustomSelect
                id="selectType"
                options={[
                  { value: "all", label: "Select Type" },
                  { value: "material", label: "Material" },
                  { value: "service", label: "Services" },
                  { value: "asset", label: "Asset" },
                ]}
                value={selectedType}
                onChange={setSelectedType}
              />
            </div>

            {/* Vendor Filter */}
            <div className="col-lg-3">
              <CustomSelect
                id="Vendor_Name"
                options={[
                  { value: "all", label: "All Vendors" },
                  ...(vendorFilter?.map((item) => ({
                    value: item.id,
                    label: item.vendor_name,
                  })) || []),
                ]}
                value={vendorName}
                onChange={setVendorName}
              />
            </div>

            {/* Status Filter */}
            <div className="col-lg-3">
              <CustomSelect
                id="selectItemStatus"
                options={[
                  { value: "all", label: "Select Status" },
                  { value: "Pending", label: "Pending" },
                  { value: "Approve", label: "Approve" },
                  { value: "Reject", label: "Reject" },
                  { value: "InProgress", label: "In Progress" },
                  { value: "Paid", label: "Paid" },
                ]}
                value={status}
                onChange={setStatus}
              />
            </div>

            {/* Date Range Filter */}
            <div className="col-lg-3">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Filter by Date"
                  className="form-control cursor-pointer"
                  readOnly
                  value={selectedDateRange}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                />
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
                {showDatePicker && (
                  <Date_Range_Model
                    style={{ top: "137px" }}
                    onDateSelect={handleDateSelect}
                    onClose={() => setShowDatePicker(false)}
                  />
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
        <VendorProvider>
          <SubCategoryProvider>
            <ItemRequestProvider>
              <Invoice_List_Form
                onClose={() => {
                  invoiceList();
                  handleClose("addInvoice");
                }}
                type={0}
              />
            </ItemRequestProvider>
          </SubCategoryProvider>
        </VendorProvider>
      )}
    </>
  );
}
