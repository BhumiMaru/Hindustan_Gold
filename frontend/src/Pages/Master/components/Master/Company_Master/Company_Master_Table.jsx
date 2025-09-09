import React from "react";
import { useCompanyMaster } from "../../../../../Context/Master/CompanyMasterContext";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Company_Master_Table() {
  const { companies, deleteCompany, startEditing, pagination } =
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
          {companies.map((company, index) => {
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
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewCompany");
                        startEditing(company.id, company.company_name);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteCompany(company.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* ---------------------END COMPANY MASTER TABLE------------------------- */}
    </>
  );
}
