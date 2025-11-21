import React, { useState } from "react";
import { useAuth } from "../../../Context/Authentication/LoginContext";
import { toast } from "react-toastify";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function ForgotPassword() {
  // const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  const {
    sendOTP,
    sendOTPLoading,
    isSendOTP,
    setIsSendOTP,
    isVerifyOtp,
    setIsVerifyOtp,
    email,
    setEmail,
  } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    await sendOTP(email);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}assets/vendor/css/pages/page-auth.css`}
      />
      {/* ------------------START FORGOT PASSWORD ----------------- */}
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            {/* Forgot Password */}
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center mb-6">
                  <div className=" col-lg-12 text-center">
                    <img
                      src="assets/img/logo_vertical.png"
                      // className="img-fluid"
                      style={{
                        maxWidth: "52%",
                      }}
                    />
                  </div>
                </div>
                {/* /Logo */}
                <h4 className="mb-1">Forgot Password? 🔒</h4>
                <p className="mb-6">
                  Enter your email and we'll send you instructions to reset your
                  password
                </p>
                <form
                  id="formAuthentication"
                  className="mb-6"
                  onSubmit={handleSendOTP}
                >
                  <div className="mb-6 form-control-validation">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      autoFocus=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary d-flex w-100"
                    disabled={sendOTPLoading}
                  >
                    {sendOTPLoading && (
                      <div
                        className="spinner-border spinner-white me-2"
                        role="status"
                      ></div>
                    )}
                    Send Reset Link
                  </button>
                  {/* <a href="/auth-otp">OTP</a> */}
                </form>
                <div className="text-center">
                  <a href="login" className="d-flex justify-content-center">
                    <i className="icon-base ti tabler-chevron-left scaleX-n1-rtl me-1_5" />
                    Back to login
                  </a>
                </div>
              </div>{" "}
              {/* /Forgot Password */}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------END FORGOT PASSWORD ----------------- */}
    </>
  );
}
