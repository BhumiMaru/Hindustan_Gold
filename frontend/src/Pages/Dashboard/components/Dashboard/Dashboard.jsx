import React from "react";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Dashboard() {
  return (
    <>
      {/* -------------------------------STRAT DASHBOARD--------------------------------- */}
      <>
        <link
          rel="stylesheet"
          href={`${publicUrl}assets/vendor/css/core.css`}
        />
        <link
          rel="stylesheet"
          href={`${publicUrl}assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css`}
        />
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row g-6">
            {/* Card Border Shadow */}
            <div className="col-lg-3 col-sm-6">
              <div className="card card-border-shadow-primary h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <div className="avatar me-4">
                      <span className="avatar-initial rounded bg-label-primary">
                        <i className="icon-base ti tabler-truck icon-28px"></i>
                      </span>
                    </div>
                    <h4 className="mb-0">42</h4>
                  </div>
                  <p className="mb-1">Total Department</p>
                  {/* <!--  <p className="mb-0">
                                        <span className="text-heading fw-medium me-2">+18.2%</span>
                                        <small className="text-body-secondary">than last week</small>
                                      </p>--> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card card-border-shadow-warning h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <div className="avatar me-4">
                      <span className="avatar-initial rounded bg-label-warning">
                        <i className="icon-base ti tabler-alert-triangle icon-28px"></i>
                      </span>
                    </div>
                    <h4 className="mb-0">8</h4>
                  </div>
                  <p className="mb-1">Total Zone</p>
                  {/* <!-- <p className="mb-0">
                                       <span className="text-heading fw-medium me-2">-8.7%</span>
                                       <small className="text-body-secondary">than last week</small>
                                     </p>--> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card card-border-shadow-danger h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <div className="avatar me-4">
                      <span className="avatar-initial rounded bg-label-danger">
                        <i className="icon-base ti tabler-git-fork icon-28px"></i>
                      </span>
                    </div>
                    <h4 className="mb-0">27</h4>
                  </div>
                  <p className="mb-1">Total Service Location</p>
                  {/* <!-- <p className="mb-0">
                                       <span className="text-heading fw-medium me-2">+4.3%</span>
                                       <small className="text-body-secondary">than last week</small>
                                     </p>--> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card card-border-shadow-info h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <div className="avatar me-4">
                      <span className="avatar-initial rounded bg-label-info">
                        <i className="icon-base ti tabler-clock icon-28px"></i>
                      </span>
                    </div>
                    <h4 className="mb-0">13</h4>
                  </div>
                  <p className="mb-1">Total User</p>
                  {/* <!--<p className="mb-0">
                                      <span className="text-heading fw-medium me-2">-2.5%</span>
                                      <small className="text-body-secondary">than last week</small>
                                    </p>--> */}
                </div>
              </div>
            </div>
            {/*/ Card Border Shadow */}
          </div>
        </div>
      </>
      {/* -------------------------------END DASHBOARD--------------------------------- */}
    </>
  );
}
