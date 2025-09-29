import React, { useEffect, useState } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Vendor_List_Table from "./Vendor_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import Vendor_List_Form from "./Vendor_List_Form";
import { useUIContext } from "../../../../../Context/UIContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

export default function Vendor_List_List() {
  const [status, setStatus] = useState(null);
  const { modal, handleOpen } = useUIContext();
  const { getVendorList, pagination, search, setSearch, setPagination } =
    useVendor();

  useEffect(() => {
    getVendorList({
      search,
      status,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [search, status, pagination.currentPage, pagination.perPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  return (
    <>
      {/* ------------------START VENDOR LIST----------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Vendor..."
                value={search}
                onChange={setSearch} // update typing value
                onSubmit={(val) => setQuery(val)} // trigger API only on submit
              />
            </div>
            <div className="d-flex">
              <div className="row">
                <div className="position-relative">
                  <CustomSelect
                    id="selectStatus"
                    options={[
                      { value: 1, label: "Active" },
                      { value: 0, label: "Deactive" },
                    ]}
                    value={status}
                    onChange={setStatus}
                    placeholder="Select Status"
                    styles={{
                      container: (base) => ({
                        ...base,
                        width: "250px",
                      }),
                    }}
                  />
                </div>
              </div>
              <a
                href="#"
                className="btn btn-primary waves-effect waves-light ms-2"
                data-bs-toggle="modal"
                data-bs-target="#vendorAddModel"
                onClick={() => handleOpen("addNewVendor")}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Create Vendor
              </a>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Vendor_List_Table />
            <Pagination
              currentPage={pagination?.currentPage}
              totalItems={pagination?.total}
              itemsPerPage={pagination?.perPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
      {modal.addNewVendor && <Vendor_List_Form />}
      {/* ------------------END VENDOR LIST----------------------- */}
    </>
  );
}
