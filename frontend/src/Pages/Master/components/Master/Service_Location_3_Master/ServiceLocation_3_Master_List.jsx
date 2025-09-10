import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import ServiceLocation_3_Master_Table from "./ServiceLocation_3_Master_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ServiceLocation_3_Master_Form from "./ServiceLocation_3_Master_Form";

export default function ServiceLocation_3_Master_List() {
  const { modal, handleOpen } = useUIContext();
  const [search, setSearch] = useState("");
  const {
    fetchServiceLocations3,
    serviceLocation3Data,
    setServiceLocation3Data,
    pagination,
    filterSelectedSl1,
    setFilterSelectedSl1,
    filterSelectedSl2,
    setFilterSelectedSl2,
  } = useServiceLocation3Master();
  const { serviceLocation, fetchServiceLocations } =
    useServiceLocation1Master();
  const { serviceLocation2, fetchServiceLocations2 } =
    useServiceLocation2Master();

  // 🔹 Load dropdown data
  useEffect(() => {
    fetchServiceLocations();
    fetchServiceLocations2();
    fetchServiceLocations3(
      search,
      filterSelectedSl1,
      filterSelectedSl2,
      pagination.currentPage,
      pagination.perPage
    );
  }, [search, filterSelectedSl1, filterSelectedSl2]);

  const handlePageChange = (page) => {
    fetchServiceLocations3(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchServiceLocations3(search, 1, size); // reset to page 1 when changing size
  };

  // Create options with "All" option
  const locationOptions1 = [
    { value: "all", label: "All" },
    ...(serviceLocation?.map((loc) => ({
      value: loc.id,
      label: loc.service_location_name,
    })) || []),
  ];

  // Create options with "All" option
  const locationOptions2 = [
    { value: "all", label: "All" },
    ...(serviceLocation2?.map((loc) => ({
      value: loc.id,
      label: loc.service_location_2_name,
    })) || []),
  ];

  return (
    <>
      {/* -----------------START SERVICE LOCATION 3 MASTER List-------------------- */}

      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Service Location 3s...">*/}
              <SearchBar
                placeholder="Search Service Location 3..."
                value={search}
                onChange={setSearch} // ✅ update state
                onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
              />
            </div>
            <div className="d-flex gap-1">
              <div className="position-relative">
                {/* ✅ Service Location 1 filter */}
                <CustomSelect
                  options={locationOptions1}
                  value={filterSelectedSl1}
                  onChange={(option) =>
                    setFilterSelectedSl1(option === "all" ? null : option)
                  }
                  placeholder="Service Location 1"
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: "250px",
                    }),
                  }}
                />
              </div>
              <div className="position-relative">
                {/* ✅ Service Location 2 filter */}
                <CustomSelect
                  options={locationOptions2}
                  value={filterSelectedSl2}
                  onChange={(option) =>
                    setFilterSelectedSl2(option === "all" ? null : option)
                  }
                  placeholder="Service Location 2"
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
                onClick={() => handleOpen("addNewServiceLocation3")}
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                Add New Service Location 3
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <ServiceLocation_3_Master_Table />
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
      {modal.addNewServiceLocation3 && <ServiceLocation_3_Master_Form />}
      {/* -----------------END SERVICE LOCATION 3 MASTER List-------------------- */}
    </>
  );
}
