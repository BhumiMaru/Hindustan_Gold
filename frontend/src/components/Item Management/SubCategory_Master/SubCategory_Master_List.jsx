import React, { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Category_Master_Table from "./SubCategory_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";
import SubCategory_Master_Table from "./SubCategory_Master_Table";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useSubCategory } from "../../../Context/Item Management/SubCategoryContext";
import { useCategoryMaster } from "../../../Context/Item Management/CategoryMasterContext";
import { useGroupMasterContext } from "../../../Context/Item Management/GroupMasterContext";
import { useUserCreation } from "../../../Context/Master/UserCreationContext";
import SubCategory_Master_Form from "./SubCategory_Master_Form";
import { useUIContext } from "../../../Context/UIContext";

export default function SubCategory_Master_List() {
  const { modal, handleOpen } = useUIContext();
  const [type, setType] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [search, setSearch] = useState("");

  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { filterGroup, fetchGroupFilter } = useGroupMasterContext();
  const { filterUser, fetchUserFilter } = useUserCreation();
  const { fetchSubCategoryData } = useSubCategory();

  useEffect(() => {
    fetchCategoryFilter();
    fetchGroupFilter();
    fetchUserFilter();
    fetchSubCategoryData(search);
  }, [search]);

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
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                  onClick={() => handleOpen("addNewSubCategory")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Subcategory
                </button>
              </div>
            </div>
            <div className="row px-3 pb-3">
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectType"
                    label=""
                    options={[
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
                    options={filterGroup.map((group) => ({
                      value: group.id,
                      label: group.group_name,
                    }))}
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
                    options={filterCategory.map((cat) => ({
                      value: cat.id,
                      label: cat.category_name,
                    }))}
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
                    options={filterUser.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                    placeholder="Select User"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card-datatable table-responsive pt-0">
              <SubCategory_Master_Table />
              <Pagination />
            </div>
          </div>
        </div>

        {modal.addNewSubCategory && (
          <>
            <SubCategory_Master_Form />
          </>
        )}
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
