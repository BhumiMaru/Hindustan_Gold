import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import ServiceLocation_2_Master_Table from "./ServiceLocation_2_Master_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ServiceLocation_2_Master_Form from "./ServiceLocation_2_Master_Form";

export default function ServiceLocation_2_Master_List() {
  const { handleOpen, modal } = useUIContext();
  const {
    fetchServiceLocations2,
    selectedOption,
    setSelectedOption,
    filterSelectedOption,
    setFilterSelectedOption,
    pagination,
    setPagination,
  } = useServiceLocation2Master();
  const { serviceLocation, fetchServiceLocations } =
    useServiceLocation1Master();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServiceLocations();
    fetchServiceLocations2({
      search,
      serviceLocation1Id: filterSelectedOption,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    filterSelectedOption,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  // Create options with "All" option
  const locationOptions = [
    { value: "all", label: "All" },
    ...(serviceLocation?.map((loc) => ({
      value: loc.id,
      label: loc.service_location_name,
    })) || []),
  ];
  return (
    <>
      {/* -----------------START SERVICE LOCATION 2 MASTER List-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center">
              {/*  <input type="search" className="form-control" placeholder="Search Service Location 2s...">*/}
              <SearchBar
                placeholder="Search Service Location 2..."
                value={search}
                onChange={setSearch} // ✅ update state
                onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
              />
            </div>
            <div className="d-flex gap-1">
              <div className="position-relative">
                <CustomSelect
                  options={locationOptions}
                  value={filterSelectedOption}
                  onChange={(value) => {
                    // If "all" is selected, pass null to show all records
                    setFilterSelectedOption(value === "all" ? null : value);
                  }}
                  placeholder="Service Location 1"
                  required
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
                onClick={() => handleOpen("addNewServiceLocation2")}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                Add New Service Location 2
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <ServiceLocation_2_Master_Table />
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
      {modal.addNewServiceLocation2 && <ServiceLocation_2_Master_Form />}
      {/* -----------------END SERVICE LOCATION 2 MASTER List-------------------- */}
    </>
  );
}
