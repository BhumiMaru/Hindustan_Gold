import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Item_Master_Table from "./Item_Master_Table";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";

export default function Item_Master_List() {
  const [selectedType, setSelectedType] = useState(""); // default from URL

  const [search, setSearch] = useState(""); // what user types
  // const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [status, setStatus] = useState(null);

  const { fetchItemMaster } = useItemMaster();
  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();

  useEffect(() => {
    fetchCategoryFilter();
    fetchSubCategoryFilter();
    fetchItemMaster({
      search,
      type: selectedType,
      c_id: categoryId,
      sub_c_id: subCategoryId,
      status,
    }); // fetch only when query changes
  }, [search, selectedType, categoryId, subCategoryId, status]);

  return (
    <>
      {/* -----------------START ITEM MASTER LIST----------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          {/* ---------- Filters ---------- */}
          <div className="row px-3 pt-2">
            <div className="col-lg-3">
              <select id="select10Basic" className="select2 form-select">
                <option value="">Select&nbsp;Type</option>
                <option value="item">Item</option>
                <option value="service">Services</option>
                <option value="asset">Asset</option>
              </select>

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
                options={filterCategory?.map((cat) => ({
                  value: cat.id,
                  label: cat.category_name,
                }))}
                value={categoryId}
                onChange={setCategoryId}
                placeholder="Select Category"
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectSubCategory"
                options={filterSubCategory?.map((subcat) => ({
                  value: subcat.id,
                  label: subcat.sub_category_name,
                }))}
                value={subCategoryId}
                onChange={setSubCategoryId}
                placeholder="Select SubCategory"
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectStatus"
                options={[
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
            <div className="d-flex align-items-center">
              <SearchBar
                placeholder="Search Items..."
                value={search}
                onChange={setSearch} // update typing value
                onSubmit={(val) => setQuery(val)} // trigger API only on submit
              />
            </div>
            <div className="d-flex flex-wrap gap-1">
              <Link
                to="/item/item-create/material"
                className="btn btn-primary waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Material
              </Link>
              <Link
                to="/item/item-create/service"
                className="btn btn-info waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Service
              </Link>
              <Link
                to="/item/item-create/asset"
                className="btn btn-success waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Asset
              </Link>
            </div>
          </div>

          {/* ---------- Table ---------- */}
          <div className="card-datatable table-responsive pt-0">
            <Item_Master_Table search={search} />
            <Pagination />
          </div>
        </div>
      </div>
      {/* -----------------END ITEM MASTER LIST----------------- */}
    </>
  );
}
