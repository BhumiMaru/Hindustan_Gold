import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import SubCategory_Master_Form from "./SubCategory_Master_Form";
import SubCategory_Master_Table from "./SubCategory_Master_Table";
import View_Sub_Category_Details from "./View_Sub_Category_Details";
import View_Sub_Cat_Owners_Name from "./View_Sub_Cat_Owners_Name";

export default function SubCategory_Master_List() {
  const { modal, handleOpen } = useUIContext();
  const [type, setType] = useState("all");
  const [group, setGroup] = useState("all");
  const [category, setCategory] = useState("all");
  const [owner, setOwner] = useState("all");
  const [search, setSearch] = useState("");

  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { filterGroup, fetchGroupFilter } = useGroupMasterContext();
  const { filterUser, fetchUserFilter } = useUserCreation();
  const { fetchSubCategoryData, pagination, setPagination } = useSubCategory();

  useEffect(() => {
    fetchCategoryFilter();
    fetchGroupFilter();
    fetchUserFilter();
    fetchSubCategoryData({
      search,
      type: type === "all" ? "" : type,
      group_id: group === "all" ? "" : group,
      category_id: category === "all" ? "" : category,
      user_id: owner === "all" ? "" : owner,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    type,
    group,
    category,
    owner,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handleClearFilters = () => {
    setType("all");
    setGroup("all");
    setCategory("all");
    setOwner("all");
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  return (
    <>
      {/* ---------------START CATEGORY MASTER LIST----------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Subcategorys...">*/}
                <SearchBar
                  placeholder="Enter Category..."
                  value={search}
                  onChange={setSearch} // ✅ update state
                  onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
                />
              </div>

              <div className="d-flex gap-1 align-items-center">
                {(type != "all" ||
                  group != "all" ||
                  category != "all" ||
                  owner != "all") && (
                  <div className="d-flex align-items-center">
                    <div>
                      <button
                        className="btn text-danger waves-effect btn-sm"
                        onClick={handleClearFilters}
                      >
                        {/* <i className="ti ti-refresh me-1"></i> */}✕ Clear
                        All
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#smallModal"
                    onClick={() => handleOpen("addNewSubCategory")}
                  >
                    <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                    Add New Subcategory
                  </button>
                </div>
              </div>
            </div>
            <div className="row px-3 pb-3">
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectType"
                    label=""
                    options={[
                      {
                        value: "all",
                        label: "Select Type",
                      },
                      { value: "material", label: "Material" },
                      { value: "service", label: "Service" },
                      { value: "asset", label: "Asset" },
                    ]}
                    value={type}
                    onChange={setType}
                    placeholder="Select Type"
                    required
                  />
                  {/* <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="1"
                    style={{ width: "240.5px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select6Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select6Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Type"
                        >
                          Select Type
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation"></b>
                        </span>
                      </span>
                    </span>
                    <span
                      className="dropdown-wrapper"
                      aria-hidden="true"
                    ></span>
                  </span> */}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectGroup"
                    label=""
                    options={[
                      { value: "all", label: "Select Groups" },
                      ...filterGroup.map((group) => ({
                        value: group.id,
                        label: group.group_name,
                      })),
                    ]}
                    value={group}
                    onChange={setGroup}
                    placeholder="Select Group"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectCategory"
                    label=""
                    options={[
                      { value: "all", label: "Select Categories" },
                      ...(filterCategory || []).map((cat) => ({
                        value: cat.id,
                        label: cat.category_name,
                      })),
                    ]}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select Category"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectUser"
                    label=""
                    options={[
                      { value: "all", label: "Select SubCategory Owners" },
                      ...filterUser.map((user) => ({
                        value: user.id,
                        label: user.name,
                      })),
                    ]}
                    value={owner}
                    onChange={setOwner}
                    placeholder="Select SubCategory Owners"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card-datatable table-responsive pt-0">
              <SubCategory_Master_Table />
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

        {modal.addNewSubCategory && (
          <>
            <SubCategory_Master_Form />
          </>
        )}
        {modal.viewSubCategory && (
          <>
            <View_Sub_Category_Details />
          </>
        )}

        {modal.viewSubCatOwnersName && (
          <>
            <View_Sub_Cat_Owners_Name />
          </>
        )}
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
