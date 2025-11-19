import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
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
import { getData } from "../../../../../utils/api";
import { ENDPOINTS } from "../../../../../constants/endpoints";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function PO_List_List() {
  const [exporting, setExporting] = useState(false);
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
    poPendingGenerate,
    setPoPendingGenerate,
  } = usePOCreate();
  const { vendorFilter, setVendorFilter, getVendorFilter } = useVendor();
  const { fetchItemFilter, filterItem } = useItemRequest();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  // Location for search filter by url
  const location = useLocation();
  const navigate = useNavigate();
  const [urlParamsApplied, setUrlParamsApplied] = useState(false);

  useEffect(() => {
    getVendorFilter();
    fetchItemFilter();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusUrl = params.get("status");

    // Apply only if exists + not applied yet
    if (statusUrl && !urlParamsApplied) {
      setStatus(statusUrl);
      setUrlParamsApplied(true);
    }

    // If no URL param, mark it applied so fetch can start normally
    if (!statusUrl && !urlParamsApplied) {
      setUrlParamsApplied(true);
    }
  }, [location.search, urlParamsApplied]);

  useEffect(() => {
    if (!urlParamsApplied) return;
    getPoList({
      search,
      status,
      poPendingGenerate,
      poType: selectedType,
      item_id: itemName,
      vendor,
      start_date: startDate,
      end_date: endDate,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    urlParamsApplied,
    search,
    status,
    poPendingGenerate,
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

  // Date Filter
  const handleDateSelect = (range) => {
    setSelectedDateRange(range);

    // Split "DD/MM/YYYY - DD/MM/YYYY"
    const [start, end] = range.split(" - ");

    // ✅ Convert to YYYY/MM/DD
    const formattedStart = moment(start, "DD/MM/YYYY").format("YYYY/MM/DD");
    const formattedEnd = moment(end, "DD/MM/YYYY").format("YYYY/MM/DD");

    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    setShowDatePicker(false);
  };

  //  Export to Excel
  const handleExportPOExcel = async () => {
    try {
      setExporting(true);

      const params = {
        search: search || undefined,
        poPendingGenerate:
          poPendingGenerate !== "all" ? poPendingGenerate : undefined,
        status: status !== "all" ? status : undefined,
        po_type: selectedType !== "all" ? selectedType : undefined,
        item_id: itemName && itemName !== "all" ? itemName : undefined,
        vendor: vendor !== "all" ? vendor : undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        page: 1,
        per_page: 100, // ✅ as per backend limit
      };

      const res = await getData(ENDPOINTS.POCREATE.LIST, params);
      const data = res?.data?.data || [];

      if (!data.length) {
        toast.info("No records found to export.");
        return;
      }

      // ✅ Map data for Excel export
      const exportData = data.map((po, index) => ({
        "Sr No": index + 1,
        "PO ID": po.po_number || "",
        "PO Date": po.po_date || "",
        "PI ID": po.pi_request_id || "",
        Type: po.po_type || "",
        Vendor: po?.venderdetail?.vendor_name || "",
        "Total Items": po.total_item || "",
        "Total Amount": po.final_total ? `₹${po.final_total}` : "",
        Status: po.status || "",
      }));

      // ✅ Generate and download Excel
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "PO List");

      XLSX.writeFile(
        workbook,
        `PO_List_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
      );

      toast.success("PO list exported successfully!");
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Failed to export PO list.");
    } finally {
      setExporting(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    // First navigate to clear URL parameters
    navigate(location.pathname, { replace: true });

    // Reset all filter states
    setSearch("");
    setStatus("all");
    setPoPendingGenerate("all");
    setSelectedType("all");
    setItemName("all");
    setVendor("all");
    setStartDate("");
    setEndDate("");
    setSelectedDateRange("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));

    // ✅ Refetch unfiltered PO list
    getPoList({
      search: "",
      status: "all",
      poPendingGenerate: "all",
      poType: "all",
      item_id: "all",
      vendor: "all",
      start_date: "",
      end_date: "",
      page: 1,
      perPage: pagination.perPage,
    });
  };

  const isAnyFilterActive =
    status !== "all" ||
    poPendingGenerate !== "all" ||
    selectedType !== "all" ||
    itemName !== "all" ||
    vendor !== "all" ||
    startDate !== "" ||
    endDate !== "" ||
    (location.search && location.search !== "?");

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
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
                <SearchBar
                  placeholder="Search PO..."
                  value={search}
                  onChange={setSearch}
                  onSubmit={(val) => setSearch(val)}
                />
              </div>

              {isAnyFilterActive && (
                <div className="d-flex align-items-center">
                  <button
                    className="btn text-danger waves-effect btn-sm"
                    onClick={handleClearFilters}
                  >
                    ✕ Clear All
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                className="btn buttons-collection btn-label-secondary waves-effect"
                type="button"
                onClick={handleExportPOExcel}
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
              {console.log("itemName", itemName)}
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
            {/* {console.log("vendor", vendor)} */}
            {/* Status */}
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
                    value: "Complete",
                    label: "Complete",
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
            {/* PO Pending Generate */}
            <div className="col-lg-3 mt-2">
              <CustomSelect
                id="selectPoPendingGenerate"
                options={[
                  {
                    value: "all",
                    label: "Select Pending Po Generate",
                  },
                  {
                    value: 0,
                    label: "Pending",
                  },
                  {
                    value: 1,
                    label: "Generate",
                  },
                ]}
                value={poPendingGenerate}
                onChange={setPoPendingGenerate}
                placeholder="Select Pending Po Generate"
              />
            </div>
            {/* Date Range */}
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
