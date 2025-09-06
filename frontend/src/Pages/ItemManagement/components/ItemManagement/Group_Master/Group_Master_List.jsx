import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Group_Master_Table from "./Group_Master_Table";
import Group_Master_Form from "./Group_Master_Form";

export default function Group_Master_List() {
  const { handleOpen, modal } = useUIContext();
  const [search, setSearch] = useState("");
  const { fetchGroupData } = useGroupMasterContext();

  useEffect(() => {
    fetchGroupData(search);
  }, [search]);

  return (
    <>
      {/* -------------------START GROUP MASTER LIST---------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* <!-- DataTable with Buttons --> */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/* <!--  <input type="search" className="form-control" placeholder="Search Groups...">--> */}
              <SearchBar
                placeholder="Search Groups..."
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
                onClick={() => handleOpen("addNewGroup")}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                Add New Group
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Group_Master_Table />
            <Pagination />
          </div>
        </div>
      </div>

      {modal.addNewGroup && <Group_Master_Form />}
      {/* -------------------END GROUP MASTER LIST---------------------- */}
    </>
  );
}
