import React from "react";
import { decryptData } from "../../utils/decryptData";
const fileUrl = import.meta.env.VITE_FILE_URL;

export default function Profile() {
  const getAuthData = sessionStorage.getItem("authData");
  const decryptAuthData = decryptData(getAuthData);
  const userData = decryptAuthData?.user;
  // console.log("userData", userData);
  return (
    <>
      {/* --------------------START PROFILE PAGE--------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* Header */}
        <div className="row">
          <div className="col-12">
            <div className="card mb-6">
              <div className="user-profile-header-banner">
                <img
                  src="assets/img/pages/profile-banner.png"
                  alt="Banner image"
                  className="rounded-top"
                />
              </div>
              <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-5">
                <div className="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                  <img
                    src={`${fileUrl}/storage/users/${userData?.profile_photo}`}
                    alt="user image"
                    className="d-block h-auto ms-0 ms-sm-6 rounded user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 mt-3 mt-lg-5">
                  <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                    <div className="user-profile-info">
                      <h4 className="mb-2 mt-lg-6">{userData?.name}</h4>
                      <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 my-2">
                        <li className="list-inline-item d-flex gap-2 align-items-center">
                          <i className="icon-base ti tabler-map-pin icon-lg" />
                          <span className="fw-medium">Vatican City</span>
                        </li>
                        <li className="list-inline-item d-flex gap-2 align-items-center">
                          <i className="icon-base ti tabler-calendar icon-lg" />
                          <span className="fw-medium"> Joined April 2021</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="javascript:void(0)"
                      className="btn btn-primary mb-1 waves-effect waves-light"
                    >
                      <i className="icon-base ti tabler-edit icon-xs me-2" />
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ Header */}
        {/* User Profile Content */}
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-5">
            {/* About User */}
            <div className="card mb-6">
              <div className="card-body">
                <p className="card-text text-uppercase text-body-secondary small mb-0">
                  About
                </p>
                <ul className="list-unstyled my-3 py-1">
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-user icon-lg" />
                    <span className="fw-medium mx-2">Full Name:</span>{" "}
                    <span>{userData?.name}</span>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-check icon-lg" />
                    <span className="fw-medium mx-2">Status:</span>
                    <span>
                      {userData?.status === 1 ? "Active" : "Deactive"}
                    </span>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-crown icon-lg" />
                    <span className="fw-medium mx-2">Role:</span>
                    <span>{userData?.name}</span>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-flag icon-lg" />
                    <span className="fw-medium mx-2">Country:</span>
                    <span>{userData?.name}</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <i className="icon-base ti tabler-language icon-lg" />
                    <span className="fw-medium mx-2">Languages:</span>{" "}
                    <span>{userData?.name}</span>
                  </li>
                </ul>
                <p className="card-text text-uppercase text-body-secondary small mb-0">
                  Contacts
                </p>
                <ul className="list-unstyled my-3 py-1">
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-phone-call icon-lg" />
                    <span className="fw-medium mx-2">Contact:</span>
                    <span>{userData?.mobileno}</span>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-messages icon-lg" />
                    <span className="fw-medium mx-2">Skype:</span>{" "}
                    <span>john.doe</span>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <i className="icon-base ti tabler-mail icon-lg" />
                    <span className="fw-medium mx-2">Email:</span>
                    <span>{userData?.email}</span>
                  </li>
                </ul>
              </div>
            </div>
            {/*/ About User */}
          </div>
          <div className="col-xl-8 col-lg-7 col-md-7">
            {/* Change Password */}
            <div className="card mb-6">
              <h5 className="card-header">Change Password</h5>
              <div className="card-body">
                <form
                  id="formChangePassword"
                  method="GET"
                  onsubmit="return false"
                  className="fv-plugins-bootstrap5 fv-plugins-framework"
                  noValidate="novalidate"
                >
                  <div
                    className="alert alert-warning alert-dismissible py-3"
                    role="alert"
                  >
                    <h5 className="alert-heading mb-1">
                      Ensure that these requirements are met
                    </h5>
                    <span>
                      Minimum 8 characters long, uppercase &amp; symbol
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    />
                  </div>
                  <div className="row gy-4 gx-6">
                    <div className="col-12 col-sm-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                      <label className="form-label" htmlFor="newPassword">
                        New Password
                      </label>
                      <div className="input-group input-group-merge has-validation">
                        <input
                          className="form-control"
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          placeholder="············"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i className="icon-base ti tabler-eye icon-xs" />
                        </span>
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                    </div>
                    <div className="col-12 col-sm-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <div className="input-group input-group-merge has-validation">
                        <input
                          className="form-control"
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="············"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i className="icon-base ti tabler-eye icon-xs" />
                        </span>
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary me-2 waves-effect waves-light"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                  <input type="hidden" />
                </form>
              </div>
            </div>
            {/*/ Change Password */}
          </div>
        </div>
        {/*/ User Profile Content */}
      </div>

      {/* --------------------END PROFILE PAGE--------------------- */}
    </>
  );
}
