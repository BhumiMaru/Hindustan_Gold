import React, { useEffect } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Get_Quote_Table from "./Get_Quote_Table";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";

export default function Get_Quote_List() {
  const { search, getQuoteList, setPagination, pagination, setSearch } =
    useGetQuote();

  useEffect(() => {
    getQuoteList({
      search,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [search, pagination.currentPage, pagination.perPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  return (
    <>
      {/* ---------------START GET QUOTE LIST------------------ */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Request..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div>
              {/*<a href="request-list.html" className="btn btn-primary waves-effect waves-light"
                          >
                              <span className="icon-xs icon-base ti tabler-plus me-2"></span>Create Request Quote
                          </a>*/}
            </div>
          </div>
          <div className="row px-3 pb-2">
            <div className="col-lg-3">
              <select id="select10Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Type</option>
                <option value="HI">Item</option>
                <option value="CA">Services</option>
                <option value="NV">Asset</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select7Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Department</option>
                <option value="HI">Category</option>
                <option value="CA">Category</option>
                <option value="NV">Category</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select id="select11Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Created By</option>
                <option value="HI">Created</option>
                <option value="CA">Created</option>
                <option value="NV">Created</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select id="select9Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Status</option>
                <option value="HI">Active</option>
                <option value="CA">Deactive</option>
              </select>
            </div>
            <div className="col-lg-2">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                            .table1 thead tr th {\n                                padding-block: 0.5rem !important;\n                                padding-inline-end: 1rem;\n                            }\n\n                            .table1 tbody tr {\n                                background-color: #f9f9f9 !important;\n                            }\n                        ",
            }}
          />
          <div className="card-datatable">
            <Get_Quote_Table />
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

      {/* ---------------END GET QUOTE LIST------------------ */}
    </>
  );
}
