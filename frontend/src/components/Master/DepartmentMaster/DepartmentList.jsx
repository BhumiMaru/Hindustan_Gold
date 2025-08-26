import React, { useEffect, useState } from "react";
import DepartmentTable from "./DepartmentTable";
import Pagination from "../../Common/Pagination/Pagination";
import SearchBar from "../../Common/SearchBar/SearchBar";
import DepartmentForm from "./DepartmentForm";
import { useUIContext } from "../../../Context/UIContext";
import { toast } from "react-toastify";
import { getData } from "../../../utils/api";

export default function DepartmentList() {
  const { modal, handleOpen } = useUIContext();
  const [departments, setDepartments] = useState([]);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const data = await getData("/departments");
      setDepartments(data);
    } catch (error) {
      toast.error("Failed to fetch departments", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  return (
    <>
      {/* ---------------------Start DepartmentList --------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search departments...">*/}
                <SearchBar placeholder="Search departments..." />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                  onClick={() => handleOpen("addNewDepartment")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Department
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <DepartmentTable departments={departments} />
              <Pagination />
            </div>
          </div>
          {modal.addNewDepartment && <DepartmentForm />}
        </div>
      </>
      {/* ---------------------End DepartmentList --------------------- */}
    </>
  );
}
