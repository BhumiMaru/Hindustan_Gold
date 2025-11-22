import React, { useState } from "react";
import { strongPasswordRegex } from "../../../utils/validators";
import { useAuth } from "../../../Context/Authentication/LoginContext";
import { toast } from "react-toastify";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function ResetPassword() {
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
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword({ email, newPassword });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}assets/vendor/css/pages/page-auth.css`}
      />
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
                    {/*<span className="app-brand-logo demo">
              <span className="text-primary">
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
            <span className="app-brand-text demo text-heading fw-bold">Vuexy</span>*/}
                    <img
                      src={`${publicUrl}assets/img/logo_vertical.png`}
                      // className="img-fluid"
                      style={{
                        maxWidth: "52%",
                      }}
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
                  className="fv-plugins-bootstrap5 fv-plugins-framework"
                  onSubmit={handleResetPassword}
                >
                  <div className="mb-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="············"
                        aria-describedby="password"
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
                  <div className="mb-6 form-password-toggle form-control-validation fv-plugins-icon-container">
                    <label className="form-label" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        className="form-control"
                        name="confirm-password"
                        placeholder="············"
                        aria-describedby="password"
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
                  <button
                    className="btn btn-primary d-flex w-100 mb-6 waves-effect waves-light"
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
                    Set new password
                  </button>
                  <div className="text-center">
                    <a
                      href="auth-login-basic"
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
