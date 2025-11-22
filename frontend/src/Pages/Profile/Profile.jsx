import React, { useEffect, useState } from "react";
import { decryptData } from "../../utils/decryptData";
import { useAuth } from "../../Context/Authentication/LoginContext";
import { toast } from "react-toastify";
import { strongPasswordRegex } from "../../utils/validators";
const fileUrl = import.meta.env.VITE_FILE_URL;
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Profile() {
  const {
    resetPassword,
    newPassword,
    setNewPassword,
    isResetPassword,
    setIsResetPassword,
    confirmPassword,
    setConfirmPassword,
    email,
  } = useAuth();
  // console.log("email", email);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Show Alert
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   if (newPassword && !strongPasswordRegex.test(newPassword)) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [newPassword]);

  //   Submit handler
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // 6 digit validation
    if (newPassword.length !== 6) {
      toast.error("Password must be exactly 6 digits");
      return;
    }

    if (!strongPasswordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and special character"
      );
      setShowAlert(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword({ email, newPassword });
  };

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
                    src={
                      userData?.profile_photo
                        ? `${fileUrl}/storage/users/${userData?.profile_photo}`
                        : `${publicUrl}assets/img/avatars/user.png`
                    }
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
                          {/* <span className="fw-medium"> Joined April 2021</span> */}
                          <span className="fw-medium">
                            {" "}
                            Joined{" "}
                            {new Date(userData?.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <a className="btn btn-primary mb-1 waves-effect waves-light">
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
                  className="fv-plugins-bootstrap5 fv-plugins-framework"
                  onSubmit={handleResetPassword}
                >
                  {showAlert && (
                    <div
                      className="alert alert-warning alert-dismissible py-3"
                      role="alert"
                    >
                      <h5 className="alert-heading mb-1">
                        Ensure that these requirements are met
                      </h5>
                      <span>
                        Password must be at least 6 characters, include
                        uppercase, lowercase, number, and special character
                      </span>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                      />
                    </div>
                  )}

                  <div className="row gy-4 gx-6">
                    <div className="col-12 col-sm-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                      <label className="form-label" htmlFor="newPassword">
                        New Password
                      </label>
                      <div className="input-group input-group-merge has-validation">
                        <input
                          className="form-control"
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          placeholder="············"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span className="input-group-text cursor-pointer">
                          <i
                            className={`icon-base ti tabler-${
                              showNewPassword ? "eye" : "eye-off"
                            }`}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          />
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
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="············"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="input-group-text cursor-pointer">
                          <i
                            className={`icon-base ti tabler-${
                              showConfirmPassword ? "eye" : "eye-off"
                            }`}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        </span>
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary me-2 waves-effect waves-light"
                        disabled={
                          isResetPassword || !newPassword || !confirmPassword
                        }
                      >
                        {isResetPassword && (
                          <div
                            className="spinner-border spinner-white me-2"
                            role="status"
                          ></div>
                        )}
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
