import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Item_Master_Table from "./Item_Master_Table";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import { decryptData } from "../../../../../utils/decryptData";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";

// export default function Item_Master_List() {
//   const [search, setSearch] = useState(""); // what user types
//   const navigate = useNavigate();
//   // const [type, setType] = useState("");
//   const [selectedType, setSelectedType] = useState("all"); // default from URL
//   const [categoryId, setCategoryId] = useState("all");
//   const [subCategoryId, setSubCategoryId] = useState("all");
//   const [status, setStatus] = useState("all");

//   const { userPermission, fetchUserPermission } = useUserCreation();
//   const { fetchItemMaster, setPagination, pagination, itemMaster } =
//     useItemMaster();
//   const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
//   const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();

//   const location = useLocation();
//   // const searchParams = new URLSearchParams(location.search);
//   // const urlType = searchParams.get("type");

//   // Initialize selectedType from URL parameter
//   // Read the type from URL only once on first load
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const urlTypeValue = params.get("type");

//     if (urlTypeValue) {
//       console.log("urlTypeValue", urlTypeValue);

//       setSelectedType(urlTypeValue);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategoryFilter();
//     fetchSubCategoryFilter();
//     fetchItemMaster({
//       search,
//       type: selectedType === "all" ? "" : selectedType,
//       c_id: categoryId === "all" ? "" : categoryId,
//       sub_c_id: subCategoryId === "all" ? "" : subCategoryId,
//       status: status === "all" ? "" : status,
//       page: pagination.currentPage,
//       perPage: pagination.perPage,
//     }); // fetch only when query changes
//   }, [
//     search,
//     selectedType,
//     categoryId,
//     subCategoryId,
//     status,
//     pagination.currentPage,
//     pagination.perPage,
//   ]);

//   const getAuthData = sessionStorage.getItem("authData");
//   const decryptAuthData = decryptData(getAuthData);
//   const user = decryptAuthData?.user;

//   useEffect(() => {
//     fetchUserPermission(user?.id);
//   }, [user?.id]);

//   const handlePageChange = (page) => {
//     setPagination((prev) => ({ ...prev, currentPage: page }));
//   };

//   const handleItemsPerPageChange = (size) => {
//     setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
//   };

//   // ✅ CLEAR FILTER FUNCTIONALITY
//   const handleClearFilters = () => {
//     setSelectedType("all");
//     setSearch("");
//     setCategoryId("all");
//     setSubCategoryId("all");
//     setStatus("all");
//     setPagination((prev) => ({ ...prev, currentPage: 1 }));

//     // Re-fetch full list
//     fetchItemMaster({
//       search: "",
//       type: "",
//       c_id: null,
//       sub_c_id: null,
//       status: null,
//       page: 1,
//       perPage: pagination.perPage,
//     });

//     // Clear the ?type=service from URL
//     navigate("/item/item-master", { replace: true });
//   };
export default function Item_Master_List() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [subCategoryId, setSubCategoryId] = useState("all");
  const [status, setStatus] = useState("all");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { userPermission, fetchUserPermission } = useUserCreation();
  const { fetchItemMaster, setPagination, pagination, itemMaster } =
    useItemMaster();
  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();

  const location = useLocation();

  // ✅ FIX 1: Handle URL parameters only once on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlType = params.get("type");

    console.log("URL Type from dashboard:", urlType);

    if (urlType) {
      setSelectedType(urlType);
    }

    // Fetch static data (categories, subcategories, permissions)
    fetchCategoryFilter();
    fetchSubCategoryFilter();

    const getAuthData = sessionStorage.getItem("authData");
    const decryptAuthData = decryptData(getAuthData);
    const user = decryptAuthData?.user;

    if (user?.id) {
      fetchUserPermission(user.id);
    }

    setIsInitialLoad(false);
  }, []); //  Empty dependency array - runs only once

  //  FIX 2: Single useEffect for data fetching with proper dependencies
  useEffect(() => {
    // Don't fetch on initial render if we're still setting up from URL
    if (isInitialLoad) return;

    const fetchData = setTimeout(() => {
      fetchItemMaster({
        search,
        type: selectedType === "all" ? "" : selectedType,
        c_id: categoryId === "all" ? "" : categoryId,
        sub_c_id: subCategoryId === "all" ? "" : subCategoryId,
        status: status === "all" ? "" : status,
        page: pagination.currentPage,
        perPage: pagination.perPage,
      });
    }, 100); // Small delay to batch state updates

    return () => clearTimeout(fetchData);
  }, [
    search,
    selectedType,
    categoryId,
    subCategoryId,
    status,
    pagination.currentPage,
    pagination.perPage,
    isInitialLoad, //  Add this to control when fetching starts
  ]);

  //  FIX 3: Handle URL synchronization separately
  useEffect(() => {
    if (isInitialLoad) return;

    const params = new URLSearchParams();
    if (selectedType !== "all") {
      params.set("type", selectedType);
    }

    // Replace the URL without causing a re-render
    navigate(`/item/item-master?${params.toString()}`, { replace: true });
  }, [selectedType, isInitialLoad]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  // ✅ FIX 4: Optimized clear filters
  const handleClearFilters = () => {
    setSelectedType("all");
    setSearch("");
    setCategoryId("all");
    setSubCategoryId("all");
    setStatus("all");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));

    // Navigate without triggering re-fetch until next render
    navigate("/item/item-master", { replace: true });
  };

  // console.log("Current selectedType:", selectedType);
  // console.log("Current URL search:", location.search);

  console.log("selectedType", selectedType);

  return (
    <>
      {/* -----------------START ITEM MASTER LIST----------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          {/* ---------- Filters ---------- */}
          <div className="row px-3 pt-2">
            <div className="col-lg-3">
              <CustomSelect
                id="selectType"
                options={[
                  { value: "all", label: "Select Type" },
                  { value: "material", label: "Material" },
                  { value: "service", label: "Service" },
                  { value: "asset", label: "Asset" },
                ]}
                value={selectedType}
                onChange={setSelectedType}
                placeholder="Select Type"
              />

              {/* <CustomSelect
                id="selectType"
                options={filterRole.map((role) => ({
                  value: role.id,
                  label: role.role_name,
                }))}
                value={type}
                onChange={setType}
                placeholder="Select Role"
              /> */}
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectCategory"
                // options={filterCategory?.map((cat) => ({
                //   value: cat.id,
                //   label: cat.category_name,
                // }))}
                options={[
                  { value: "all", label: "Select Categories" },
                  ...(filterCategory || []).map((cat) => ({
                    value: cat.id,
                    label: cat.category_name,
                  })),
                ]}
                value={categoryId}
                onChange={setCategoryId}
                placeholder="Select Category"
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectSubCategory"
                // options={filterSubCategory?.map((subcat) => ({
                //   value: subcat.id,
                //   label: subcat.sub_category_name,
                // }))}
                options={[
                  { value: "all", label: "Select SubCategories" },
                  ...(filterSubCategory || []).map((subcat) => ({
                    value: subcat.id,
                    label: subcat.sub_category_name,
                  })),
                ]}
                value={subCategoryId}
                onChange={setSubCategoryId}
                placeholder="Select SubCategory"
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectStatus"
                options={[
                  { value: "all", label: "Select Status" }, // ✅ Added "All" option
                  { value: 1, label: "Active" },
                  { value: 0, label: "Deactive" },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Status"
              />
            </div>
          </div>

          {/* ---------- Search + Buttons ---------- */}
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex flex-wrap gap-1">
              <div className="d-flex align-items-center">
                <SearchBar
                  placeholder="Search Items..."
                  value={search}
                  onChange={setSearch} // update typing value
                  onSubmit={(val) => setQuery(val)} // trigger API only on submit
                />
              </div>
              {(selectedType != "all" ||
                categoryId != "all" ||
                subCategoryId != "all" ||
                status != "all") && (
                <div className="d-flex align-items-center">
                  <div>
                    <button
                      className="btn text-danger waves-effect btn-sm"
                      onClick={handleClearFilters}
                    >
                      {/* <i className="ti ti-refresh me-1"></i> */}✕ Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex flex-wrap gap-1">
              {userPermission?.some(
                (perm) =>
                  perm.type === "Material Code" &&
                  perm.permission === "allrights"
              ) && (
                <div>
                  <Link
                    to="/item/item-create/material"
                    className="btn btn-primary waves-effect waves-light text-decoration-none btn-sm"
                  >
                    <span className="icon-xs icon-base ti tabler-plus me-2" />
                    Add Material
                  </Link>
                </div>
              )}

              {userPermission?.some(
                (perm) =>
                  perm.type === "Service Code" &&
                  perm.permission === "allrights"
              ) && (
                <div>
                  <Link
                    to="/item/item-create/service"
                    className="btn btn-info waves-effect waves-light text-decoration-none btn-sm"
                  >
                    <span className="icon-xs icon-base ti tabler-plus me-2" />
                    Add Service
                  </Link>
                </div>
              )}

              {userPermission?.some(
                (perm) =>
                  perm.type === "Asset Code" && perm.permission === "allrights"
              ) && (
                <div>
                  <Link
                    to="/item/item-create/asset"
                    className="btn btn-success waves-effect waves-light text-decoration-none btn-sm"
                  >
                    <span className="icon-xs icon-base ti tabler-plus me-2" />
                    Add Asset
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ---------- Table ---------- */}
          <div className="card-datatable table-responsive pt-0">
            <Item_Master_Table search={search} />
            {/* {itemMaster.length > 0 && ( */}
            <Pagination
              currentPage={pagination.currentPage}
              totalItems={pagination.total}
              itemsPerPage={pagination.perPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
            {/* )} */}
          </div>
        </div>
      </div>
      {/* -----------------END ITEM MASTER LIST----------------- */}
    </>
  );
}
