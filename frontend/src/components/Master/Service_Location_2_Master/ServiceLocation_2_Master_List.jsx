import React, { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Pagination from "../../Common/Pagination/Pagination";
import ServiceLocation_2_Master_Table from "./ServiceLocation_2_Master_Table";
import ServiceLocation_2_Master_Form from "./ServiceLocation_2_Master_Form";
import { useUIContext } from "../../../Context/UIContext";
import { useServiceLocation2Master } from "../../../Context/Master/ServiceLocation2MasterContext";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useServiceLocation1Master } from "../../../Context/Master/ServiceLocation1MasterContext";

export default function ServiceLocation_2_Master_List() {
  const { handleOpen, modal } = useUIContext();
  const { fetchServiceLocations2, selectedOption, setSelectedOption } =
    useServiceLocation2Master();
  const { serviceLocation, fetchServiceLocations } =
    useServiceLocation1Master();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServiceLocations();
    fetchServiceLocations2(search, selectedOption?.value);
  }, [search, selectedOption]);
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
                  options={serviceLocation?.map((loc) => ({
                    value: loc.id,
                    label: loc.service_location_name,
                  }))}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Service Location 1"
                  required
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: "250px", // 👈 fixed width here
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
            <Pagination />
          </div>
        </div>
      </div>
      {modal.addNewServiceLocation2 && <ServiceLocation_2_Master_Form />}
      {/* -----------------END SERVICE LOCATION 2 MASTER List-------------------- */}
    </>
  );
}
