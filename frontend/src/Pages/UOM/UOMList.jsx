import React, { useEffect } from "react";
import UOMForm from "./UOMForm";
import UOMTable from "./UOMTable";
import Pagination from "../../components/Common/Pagination/Pagination";
import SearchBar from "../../components/Common/SearchBar/SearchBar";
import { useUOM } from "../../Context/UomContext";
import { useUIContext } from "../../Context/UIContext";

export default function UOMList() {
  const { search, setSearch, pagination, setPagination, getUOMList } = useUOM();
  const { modal, handleOpen } = useUIContext();

  useEffect(() => {
    getUOMList({
      page: pagination.currentPage,
      perPage: pagination.perPage,
      search,
    });
  }, [pagination.currentPage, pagination.perPage, search]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  return (
    <>
      {/* ----------------START UOM LIST----------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* <!-- DataTable with Buttons --> */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/* <!--  <input type="search" className="form-control" placeholder="Search Groups...">--> */}
              {/* <SearchBar
                placeholder="Search Groups..."
                value={search}
                onChange={setSearch} // ✅ update state
                onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
              /> */}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#smallModal"
                onClick={() => handleOpen("addNewUOM")}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                Add New UOM
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <UOMTable />
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
      {modal.addNewUOM && <UOMForm />}
      {/* ----------------END UOM LIST----------------- */}
    </>
  );
}
