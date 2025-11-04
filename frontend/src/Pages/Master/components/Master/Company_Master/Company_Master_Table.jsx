import React from "react";
import { useCompanyMaster } from "../../../../../Context/Master/CompanyMasterContext";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Company_Master_Table() {
  const { companies, deleteCompany, startEditing, pagination, loading } =
    useCompanyMaster();
  const { handleOpen } = useUIContext();
  return (
    <>
      {/* ---------------------START COMPANY MASTER TABLE------------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Company</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            companies.map((company, index) => {
              return (
                <tr key={company.id}>
                  <td>
                    <div className="ms-4">
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{company.company_name}</td>

                  <td>
                    <div className="d-inline-flex gap-2">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                      </a>
                      <div className="d-inline-block">
                        <div className="dropdown-menu dropdown-menu-end m-0">
                          <button
                            // key={user.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleOpen("addNewCompany");
                              startEditing(company.id, company.company_name);
                            }}
                          >
                            Edit
                          </button>

                          {/* <div className="dropdown-divider"></div> */}
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteCompany(company.id)}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* ---------------------END COMPANY MASTER TABLE------------------------- */}
    </>
  );
}
