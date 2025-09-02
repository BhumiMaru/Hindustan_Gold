import React, { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Category_Master_Table from "./SubCategory_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";
import SubCategory_Master_Table from "./SubCategory_Master_Table";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useSubCategory } from "../../../Context/Item Management/SubCategoryContext";

export default function SubCategory_Master_List() {
  const [type, setType] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [search, setSearch] = useState("");

  const { fetchSubCategoryData } = useSubCategory();
  useEffect(() => {
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
                    options={[
                      { value: "g1", label: "Group 1" },
                      { value: "g2", label: "Group 2" },
                    ]}
                    value={group}
                    onChange={setGroup}
                    placeholder="Select Group"
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectCategory"
                    label=""
                    options={[
                      { value: "c1", label: "Category 1" },
                      { value: "c2", label: "Category 2" },
                    ]}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select Category"
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectOwner"
                    label=""
                    options={[
                      { value: "o1", label: "Owner 1" },
                      { value: "o2", label: "Owner 2" },
                    ]}
                    value={owner}
                    onChange={setOwner}
                    placeholder="Select Owner"
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
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
