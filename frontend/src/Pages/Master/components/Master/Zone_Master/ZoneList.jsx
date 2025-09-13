import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import ZoneTable from "./ZoneTable";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ZoneForm from "./ZoneForm";

export default function ZoneList() {
  const { modal, handleOpen } = useUIContext();
  const [search, setSearch] = useState("");
  const { fetchZones, pagination } = useZone();

  useEffect(() => {
    fetchZones(search, pagination.currentPage, pagination.perPage);
  }, [search]); // ✅ re-fetch when search changes

  const handlePageChange = (page) => {
    fetchZones(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchZones(search, 1, size); // reset to page 1 when changing size
  };

  return (
    <>
      {/* --------------------START ZONE LIST---------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Zones...">*/}
                <SearchBar
                  placeholder="Search Zones..."
                  value={search}
                  onChange={setSearch} // ✅ update state
                  onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                  onClick={() => handleOpen("addNewZone")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Zone
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <ZoneTable />
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

        {modal.addNewZone && <ZoneForm />}
      </>
      {/* --------------------END ZONE LIST---------------------- */}
    </>
  );
}
