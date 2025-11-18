import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Link, useLocation } from "react-router-dom";
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
import { ENDPOINTS } from "../../../../../constants/endpoints";
import { getData, postData } from "../../../../../utils/api";
import { toast } from "react-toastify";

export default function PI_Request_List() {
  const [exporting, setExporting] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [urlStatusApplied, setUrlStatusApplied] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchItemFilter();
    fetchDeptFilter();
    fetchUserFilter();
  }, []);

  // ✅ Get saved auth data
  const savedAuth = sessionStorage.getItem("authData");
  let user = null;

  if (savedAuth) {
    try {
      const decrypted = decryptData(savedAuth);
      user = decrypted?.user || null;
    } catch (error) {
      console.error("Error decrypting auth data", error);
    }
  }

  // ✅ Handle URL parameters for filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusFromUrl = params.get("status");

    if (statusFromUrl && !urlStatusApplied) {
      console.log("Setting status from URL:", statusFromUrl);
      setStatus(statusFromUrl);
      setUrlStatusApplied(true);

      // Reset to first page when applying URL filter
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [location.search, urlStatusApplied]);

  // ✅ Main data fetching effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Only fetch if URL status has been applied (if present) or if no URL status
      if (!location.search || (location.search && urlStatusApplied)) {
        await getPIRequest({
          type: activeTab,
          page: pagination.currentPage,
          perPage: pagination.perPage,
        });
      }

      setLoading(false);
    };

    fetchData();
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
    urlStatusApplied, // Add this dependency
  ]);

  // ✅ Fetch user permissions
  useEffect(() => {
    if (user?.id) {
      fetchUserPermission(user.id);
    }
  }, [user?.id]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  const handleDateSelect = (range) => {
    setSelectedDateRange(range);

    if (!range) {
      setStartDate("");
      setEndDate("");
      return;
    }

    const [start, end] = range.split(" - ");
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

  //  Export to Excel
  const handleExportPIExcel = async () => {
    try {
      setExporting(true);

      const payload = {
        type: activeTab,
        pi_type: selectedType !== "all" ? selectedType : undefined,
        item_id: itemName !== "all" ? itemName : undefined,
        departmant_id: department !== "all" ? department : undefined,
        order_by: orderBy !== "all" ? orderBy : undefined,
        status: status !== "all" ? status : undefined,
        search: search || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        per_page: 100,
        page: 1,
      };

      const res = await postData(ENDPOINTS.PI_REQUEST.LIST, payload);
      const data = res?.data?.data || [];

      if (!data.length) {
        toast.info("No records found to export.");
        return;
      }

      const exportData = data.map((pi, i) => ({
        "Sr No": i + 1,
        "PI Date": pi?.pi_date || "",
        "PI Type": pi?.pi_type || "",
        "Order By": pi?.order_by?.name || "",
        Department: pi?.department_by?.department_name || "",
        "Total Items": pi?.total_item || 0,
        "Total Quotes": pi?.totalquate_count || 0,
        "Total POs": pi?.totalpo_count || 0,
        Status: pi?.final_approve_status || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "PI List");

      XLSX.writeFile(
        workbook,
        `PI_List_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
      );

      toast.success("PI list exported successfully!");
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Failed to export PI list.");
    } finally {
      setExporting(false);
    }
  };

  // ✅ Clear all filters including URL status
  const handleClearFilters = () => {
    setSelectedType("all");
    setItemName("all");
    setDepartment("all");
    setOrderBy("all");
    setStatus("all");
    setSearch("");
    setSelectedDateRange("");
    setStartDate("");
    setEndDate("");
    setUrlStatusApplied(false); // Reset URL status flag
    setPagination((prev) => ({ ...prev, currentPage: 1 }));

    // Remove status from URL without page reload
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);

    // Refetch unfiltered data
    getPIRequest({
      type: activeTab,
      page: 1,
      perPage: pagination.perPage,
    });
  };

  // Check if any filter is active (including URL status)
  const isAnyFilterActive =
    selectedType !== "all" ||
    itemName !== "all" ||
    department !== "all" ||
    orderBy !== "all" ||
    status !== "all" ||
    startDate !== "" ||
    endDate !== "" ||
    search !== "" ||
    (location.search && location.search.includes("status"));

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
                    <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                      {piRequest[0]?.approvel_count}
                    </span>
                    <i className="icon-base ti tabler-user icon-sm d-sm-none" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between px-3 pb-2">
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                <SearchBar
                  placeholder="Search Request..."
                  value={search}
                  onChange={setSearch}
                  onSubmit={(val) => setSearch(val)}
                />
              </div>
              {/* Clear Filter */}
              {isAnyFilterActive && (
                <button
                  className="btn text-danger waves-effect btn-sm"
                  onClick={handleClearFilters}
                >
                  ✕ Clear All
                </button>
              )}
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
                className="btn buttons-collection btn-label-secondary waves-effect"
                type="button"
                onClick={handleExportPIExcel}
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
                    { value: "all", label: "All Items" },
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
                    { value: "all", label: "All Departments" },
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
                    { value: "all", label: "All Users" },
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
                      value: "InProgress",
                      label: "InProgress",
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

// export default function PI_Request_List() {
//   const [exporting, setExporting] = useState(false);
//   const {
//     search,
//     setSearch,
//     getPIRequest,
//     activeTab,
//     pagination,
//     setPagination,
//     setActiveTab,
//     piRequest,
//     selectedType,
//     setSelectedType,
//     itemName,
//     setItemName,
//     department,
//     setDepartment,
//     orderBy,
//     setOrderBy,
//     status,
//     setStatus,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//   } = usePIRequest();
//   const { setFilterItem, fetchItemFilter, filterItem } = useItemRequest();
//   const { deptFilter, setDeptFilter, fetchDeptFilter } = useDepartment();
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDateRange, setSelectedDateRange] = useState("");
//   const {
//     filterUser,
//     fetchUserFilter,
//     setFilterUser,
//     fetchUserPermission,
//     userPermission,
//   } = useUserCreation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchItemFilter();
//     fetchDeptFilter();
//     fetchUserFilter();
//   }, []);

//   // useEffect(() => {
//   //   getPIRequest({
//   //     type: activeTab,
//   //     page: pagination.currentPage,
//   //     perPage: pagination.perPage,
//   //   });
//   // }, [
//   //   activeTab,
//   //   selectedType,
//   //   itemName,
//   //   department,
//   //   orderBy,
//   //   search,
//   //   status,
//   //   startDate,
//   //   endDate,
//   //   pagination.currentPage,
//   //   pagination.perPage,
//   // ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await getPIRequest({
//         type: activeTab,
//         page: pagination.currentPage,
//         perPage: pagination.perPage,
//       });
//       setLoading(false);
//     };

//     fetchData();
//   }, [
//     activeTab,
//     selectedType,
//     itemName,
//     department,
//     orderBy,
//     search,
//     status,
//     startDate,
//     endDate,
//     pagination.currentPage,
//     pagination.perPage,
//   ]);

//   const handlePageChange = (page) => {
//     setPagination((prev) => ({ ...prev, currentPage: page }));
//   };

//   const handleItemsPerPageChange = (size) => {
//     setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
//   };

//   // ✅ Get saved auth data
//   const savedAuth = sessionStorage.getItem("authData");
//   let user = null;

//   if (savedAuth) {
//     try {
//       const decrypted = decryptData(savedAuth);
//       user = decrypted?.user || null;
//       // console.log("user", user);
//     } catch (error) {
//       console.error("Error decrypting auth data", error);
//     }
//   }

//   useEffect(() => {
//     fetchUserPermission(user.id);
//   }, [user.id]);

//   // console.log(userPermission);

//   const handleDateSelect = (range) => {
//     setSelectedDateRange(range);

//     if (!range) {
//       setStartDate("");
//       setEndDate("");
//       return;
//     }

//     // Split "DD/MM/YYYY - DD/MM/YYYY"
//     const [start, end] = range.split(" - ");

//     // ✅ Convert to YYYY-MM-DD for API
//     const formattedStart = start
//       ? moment(start, "DD/MM/YYYY").format("YYYY-MM-DD")
//       : "";
//     const formattedEnd = end
//       ? moment(end, "DD/MM/YYYY").format("YYYY-MM-DD")
//       : "";

//     setStartDate(formattedStart);
//     setEndDate(formattedEnd);

//     setShowDatePicker(false);
//   };

//   //  Export to Excel
//   const handleExportPIExcel = async () => {
//     try {
//       setExporting(true);

//       // ✅ Match all filters used in getPIRequest
//       const payload = {
//         type: activeTab,
//         pi_type: selectedType !== "all" ? selectedType : undefined,
//         item_id: itemName !== "all" ? itemName : undefined,
//         departmant_id: department !== "all" ? department : undefined,
//         order_by: orderBy !== "all" ? orderBy : undefined,
//         status: status !== "all" ? status : undefined,
//         search: search || undefined,
//         start_date: startDate || undefined,
//         end_date: endDate || undefined,
//         per_page: 100, // as per your API limit
//         page: 1,
//       };

//       // ✅ Fetch filtered data directly from backend
//       const res = await postData(ENDPOINTS.PI_REQUEST.LIST, payload);
//       const data = res?.data?.data || [];

//       if (!data.length) {
//         toast.info("No records found to export.");
//         return;
//       }

//       // ✅ Map data properly from PI request table
//       const exportData = data.map((pi, i) => ({
//         "Sr No": i + 1,
//         "PI Date": pi?.pi_date || "",
//         "PI Type": pi?.pi_type || "",
//         "Order By": pi?.order_by?.name || "",
//         Department: pi?.department_by?.department_name || "",
//         "Total Items": pi?.total_item || 0,
//         "Total Quotes": pi?.totalquate_count || 0,
//         "Total POs": pi?.totalpo_count || 0,
//         Status: pi?.final_approve_status || "",
//       }));

//       // ✅ Create Excel workbook
//       const worksheet = XLSX.utils.json_to_sheet(exportData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "PI List");

//       // ✅ Save file
//       XLSX.writeFile(
//         workbook,
//         `PI_List_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
//       );

//       toast.success("PI list exported successfully!");
//     } catch (error) {
//       console.error("Export Error:", error);
//       toast.error("Failed to export PI list.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   // ✅ Clear all filters
//   const handleClearFilters = () => {
//     setSelectedType("all");
//     setItemName("all");
//     setDepartment("all");
//     setOrderBy("all");
//     setStatus("all");
//     setSearch("");
//     setSelectedDateRange("");
//     setStartDate("");
//     setEndDate("");
//     setPagination((prev) => ({ ...prev, currentPage: 1 }));

//     // Refetch unfiltered data
//     getPIRequest({
//       type: activeTab,
//       page: 1,
//       perPage: pagination.perPage,
//     });
//   };

//   return (
//     <>
//       {/* ------------------START PI REUEST LIST-------------------- */}
//       <div className="container-xxl flex-grow-1 container-p-y">
//         {/* DataTable with Buttons */}
//         <div className="card">
//           <div className="row px-3 pt-2 pb-2">
//             <div className="col-lg-6 mb-1 ">
//               <ul
//                 className="nav nav-pills nav-fill border rounded bg-label-primary"
//                 role="tablist"
//               >
//                 {userPermission.some(
//                   (prem) =>
//                     prem.type === "Get Quotation" &&
//                     (prem.permission === "add" || prem.permission === "view")
//                 ) && (
//                   <li className="nav-item mb-1 mb-sm-0" role="presentation">
//                     <button
//                       type="button"
//                       className={`nav-link waves-effect waves-light ${
//                         activeTab === "all_request" ? "active" : ""
//                       }`}
//                       role="tab"
//                       data-bs-toggle="tab"
//                       data-bs-target="#navs-pills-justified-home"
//                       aria-controls="navs-pills-justified-home"
//                       aria-selected="true"
//                       onClick={() => setActiveTab("all_request")}
//                     >
//                       <span className="d-none d-sm-inline-flex align-items-center">
//                         <i className="icon-base ti tabler-home icon-sm me-1_5" />
//                         All Request
//                       </span>
//                       <i className="icon-base ti tabler-home icon-sm d-sm-none" />
//                     </button>
//                   </li>
//                 )}

//                 <li className="nav-item mb-1 mb-sm-0" role="presentation">
//                   <button
//                     type="button"
//                     className={`nav-link waves-effect waves-light ${
//                       activeTab === "my_request" ? "active" : ""
//                     }`}
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-pills-justified-home"
//                     aria-controls="navs-pills-justified-home"
//                     aria-selected="true"
//                     onClick={() => setActiveTab("my_request")}
//                   >
//                     <span className="d-none d-sm-inline-flex align-items-center">
//                       <i className="icon-base ti tabler-home icon-sm me-1_5" />
//                       My Request
//                     </span>
//                     <i className="icon-base ti tabler-home icon-sm d-sm-none" />
//                   </button>
//                 </li>
//                 <li className="nav-item mb-1 mb-sm-0" role="presentation">
//                   <button
//                     type="button"
//                     className={`nav-link waves-effect waves-light ${
//                       activeTab === "approval_request" ? "active" : ""
//                     }`}
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-pills-justified-profile"
//                     aria-controls="navs-pills-justified-profile"
//                     aria-selected="false"
//                     tabIndex={-1}
//                     onClick={() => setActiveTab("approval_request")}
//                   >
//                     <span className="d-none d-sm-inline-flex align-items-center">
//                       <i className="icon-base ti tabler-user icon-sm me-1_5" />
//                       Approval Request
//                     </span>
//                     {/* {activeTab === "approval_request" && ( */}
//                     <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
//                       {piRequest[0]?.approvel_count}
//                     </span>
//                     {/* )} */}
//                     <i className="icon-base ti tabler-user icon-sm d-sm-none" />
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="d-flex justify-content-between px-3 pb-2">
//             <div className="d-flex align-items-center flex-wrap">
//               <div className="d-flex align-items-center">
//                 {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
//                 <SearchBar
//                   placeholder="Search Request..."
//                   value={search}
//                   onChange={setSearch}
//                   onSubmit={(val) => setSearch(val)}
//                 />
//               </div>
//               {/* clear Filter */}
//               {(selectedType !== "all" ||
//                 itemName !== "all" ||
//                 department !== "all" ||
//                 orderBy !== "all" ||
//                 status !== "all" ||
//                 startDate !== "" ||
//                 endDate !== "" ||
//                 search !== "") && (
//                 // <div className="d-flex align-items-center">
//                 <button
//                   className="btn text-danger waves-effect btn-sm"
//                   onClick={handleClearFilters}
//                 >
//                   ✕ Clear All
//                 </button>
//                 // </div>
//               )}
//             </div>

//             <div className="d-flex gap-2">
//               <Link
//                 to="/po-material/pi-request-create/material"
//                 className="btn btn-primary waves-effect waves-light text-decoration-none"
//               >
//                 <span className="icon-xs icon-base ti tabler-plus me-2" />
//                 Material PI
//               </Link>
//               <Link
//                 to="/po-material/pi-request-create/service"
//                 className="btn btn-info waves-effect waves-light text-decoration-none"
//               >
//                 <span className="icon-xs icon-base ti tabler-plus me-2" />
//                 Services PI
//               </Link>
//               <button
//                 className="btn buttons-collection btn-label-secondary waves-effect"
//                 type="button"
//                 onClick={handleExportPIExcel}
//                 disabled={exporting}
//               >
//                 {exporting ? (
//                   <>
//                     <div
//                       className="spinner-border spinner-white me-2"
//                       role="status"
//                     ></div>
//                     Exporting...
//                   </>
//                 ) : (
//                   <span>
//                     <i className="icon-base ti tabler-upload icon-xs me-1" />
//                     Export
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//           <div className="row px-3 pb-2 ">
//             <div className="col-lg-3">
//               <div className="position-relative">
//                 <CustomSelect
//                   id="selectItemType"
//                   options={[
//                     {
//                       value: "all",
//                       label: "Select Item Type",
//                     },
//                     {
//                       value: "material",
//                       label: "Material",
//                     },
//                     {
//                       value: "service",
//                       label: "Service",
//                     },
//                     {
//                       value: "asset",
//                       label: "Asset",
//                     },
//                   ]}
//                   value={selectedType}
//                   onChange={setSelectedType}
//                   placeholder="Select Item"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-3">
//               <div className="position-relative">
//                 <CustomSelect
//                   id="selectItemName"
//                   options={[
//                     { value: "all", label: "All Items" }, // ✅ All option first
//                     ...(filterItem?.map((item) => ({
//                       value: item.item_id,
//                       label: item.item_name,
//                     })) || []),
//                   ]}
//                   value={itemName}
//                   onChange={setItemName}
//                   placeholder="Select Item"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-3">
//               <div className="position-relative">
//                 <CustomSelect
//                   id="selectDept"
//                   options={[
//                     { value: "all", label: "All Departments" }, // ✅ All option first
//                     ...(deptFilter?.map((dept) => ({
//                       value: dept.id,
//                       label: dept.department_name,
//                     })) || []),
//                   ]}
//                   value={department}
//                   onChange={setDepartment}
//                   placeholder="Select Department"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-3 ">
//               <div className="position-relative">
//                 <CustomSelect
//                   id="selectUser"
//                   options={[
//                     { value: "all", label: "All Users" }, // ✅ All option first
//                     ...(filterUser?.map((user) => ({
//                       value: user.id,
//                       label: user.name,
//                     })) || []),
//                   ]}
//                   value={orderBy}
//                   onChange={setOrderBy}
//                   placeholder="Select Created By"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-3 mt-2">
//               <div className="position-relative">
//                 <CustomSelect
//                   id="selectItemStatus"
//                   options={[
//                     {
//                       value: "all",
//                       label: "Select Status",
//                     },
//                     {
//                       value: "pending",
//                       label: "Pending",
//                     },
//                     {
//                       value: "approved",
//                       label: "Approved",
//                     },
//                     {
//                       value: "InProgress",
//                       label: "InProgress",
//                     },
//                     {
//                       value: "completed",
//                       label: "Completed",
//                     },
//                     {
//                       value: "reject",
//                       label: "Reject",
//                     },
//                   ]}
//                   value={status}
//                   onChange={setStatus}
//                   placeholder="Select Item Status"
//                 />
//               </div>
//             </div>
//             {/* <div className="col-lg-3 mt-2">
//               <input
//                 type="date"
//                 id="bs-rangepicker-range"
//                 className="form-control"
//               />
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />

//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div> */}

//             <div className="col-lg-3 mt-2">
//               <div className="d-flex items-center">
//                 <input
//                   type="text"
//                   id="filterFilesByDate"
//                   placeholder="Filter by Date"
//                   className="form-control cursor-pointer"
//                   autoComplete="off"
//                   readOnly
//                   value={selectedDateRange}
//                   onClick={() => setShowDatePicker(!showDatePicker)}
//                 />
//                 {showDatePicker && (
//                   <Date_Range_Model
//                     style={{
//                       top: "193px",
//                     }}
//                     onDateSelect={handleDateSelect}
//                     onClose={() => setShowDatePicker(false)}
//                   />
//                 )}
//                 {selectedDateRange && (
//                   <button
//                     onClick={() => {
//                       setSelectedDateRange("");
//                       setStartDate("");
//                       setEndDate("");
//                       setShowDatePicker(false);
//                     }}
//                     className="btn btn-sm text-danger ms-2"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="card-datatable">
//             <PI_Request_Table userPermission={userPermission} />
//             <Pagination
//               currentPage={pagination.currentPage}
//               totalItems={pagination.total}
//               itemsPerPage={pagination.perPage}
//               onPageChange={handlePageChange}
//               onItemsPerPageChange={handleItemsPerPageChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ------------------END PI REUEST LIST-------------------- */}
//     </>
//   );
// }
