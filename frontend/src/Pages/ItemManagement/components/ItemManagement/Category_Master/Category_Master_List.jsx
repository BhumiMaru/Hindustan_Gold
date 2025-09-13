import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Category_Master_Table from "./Category_Master_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Category_Master_Form from "./Category_Master_Form";

export default function Category_Master_List() {
  const { modal, handleOpen } = useUIContext();
  const { groups, fetchGroupData } = useGroupMasterContext();
  const { fetchCategories, selectedGroup, setSelectedGroup, pagination } =
    useCategoryMaster();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGroupData();
    fetchCategories(
      search,
      selectedGroup,
      pagination.currentPage,
      pagination.perPage
    );
  }, [search, selectedGroup]);

  const handlePageChange = (page) => {
    fetchCategories(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchCategories(search, 1, size); // reset to page 1 when changing size
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
                {/*  <input type="search" className="form-control" placeholder="Search Categorys...">*/}
                <SearchBar
                  placeholder="Enter Category..."
                  value={search}
                  onChange={setSearch} // ✅ update state
                  onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
                />
              </div>
              <div className="d-flex gap-1">
                <div className="position-relative">
                  <CustomSelect
                    options={groups?.map((g) => ({
                      value: g.id,
                      label: g.group_name, // depends on your API
                    }))}
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                    placeholder="Filter by Group"
                    styles={{
                      container: (base) => ({
                        ...base,
                        width: "250px",
                      }),
                    }}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                  onClick={() => handleOpen("addNewCategory")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Category
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <Category_Master_Table />
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
        {modal.addNewCategory && <Category_Master_Form />}
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
