import React from "react";

export default function ResetPassword() {
  return (
    <>
      {/* ---------------------START RESET PASSWORD------------------- */}
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            {/* Forgot Password */}
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center mb-6">
                  <div className=" col-lg-12 text-center">
                    {/*<span class="app-brand-logo demo">
              <span class="text-primary">
                <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                    fill="currentColor" />
                  <path
                    opacity="0.06"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                    fill="#161616" />
                  <path
                    opacity="0.06"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                    fill="#161616" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                    fill="currentColor" />
                </svg>
              </span>
            </span>
            <span class="app-brand-text demo text-heading fw-bold">Vuexy</span>*/}
                    <img
                      src="assets/img/logo_vertical.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
                {/* /Logo */}
                <h4 className="mb-1">Reset Password 🔒</h4>
                <p className="mb-6">
                  <span className="fw-medium">
                    Your new password must be different from previously used
                    passwords
                  </span>
                </p>
                <form
                  id="formAuthentication"
                  action="login.html"
                  method="GET"
                  className="fv-plugins-bootstrap5 fv-plugins-framework"
                  noValidate="novalidate"
                >
                  <div className="mb-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="············"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="icon-base ti tabler-eye-off" />
                      </span>
                    </div>
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                  </div>
                  <div className="mb-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                    <label className="form-label" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        type="password"
                        id="confirm-password"
                        className="form-control"
                        name="confirm-password"
                        placeholder="············"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="icon-base ti tabler-eye-off" />
                      </span>
                    </div>
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                  </div>
                  <button className="btn btn-primary d-grid w-100 mb-6 waves-effect waves-light">
                    Set new password
                  </button>
                  <div className="text-center">
                    <a
                      href="auth-login-basic.html"
                      className="d-flex justify-content-center"
                    >
                      <i className="icon-base ti tabler-chevron-left scaleX-n1-rtl me-1_5" />
                      Back to login
                    </a>
                  </div>
                  <input type="hidden" />
                </form>
              </div>
            </div>
            {/* /Forgot Password */}
          </div>
        </div>
      </div>

      {/* ---------------------END RESET PASSWORD------------------- */}
    </>
  );
}
