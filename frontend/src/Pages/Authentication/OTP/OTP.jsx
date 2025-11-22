import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/Authentication/LoginContext";
import { decryptData } from "../../../utils/decryptData";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function OTP() {
  const { isVerifyOtp, otp, setOtp, email, verifyOTP, sendOTP } = useAuth();
  const [timer, setTimer] = useState(60);

  const getEmailFromSession = sessionStorage.getItem("email");
  const decryptEmail = decryptData(getEmailFromSession);
  const extractencryptEmail = decryptData(decryptEmail);

  // console.log("extractencryptEmail", extractencryptEmail);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  //   Submit handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    verifyOTP({ email, otp });
  };

  // Resend Otp
  const handleResendOtp = () => {
    sendOTP(extractencryptEmail.email);
    setTimer(60); // restart timer
  };

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}assets/vendor/css/pages/page-auth.css`}
      />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center mb-6">
                  <div className="col-lg-12 text-center">
                    <img
                      src={`${publicUrl}assets/img/logo_vertical.png`}
                      style={{ maxWidth: "52%" }}
                    />
                  </div>
                </div>

                <h4 className="mb-1">OTP Verification</h4>
                <p className="mb-6">
                  We have sent an OTP to
                  <strong>{email || extractencryptEmail.email}</strong>
                </p>

                <form
                  id="formAuthentication"
                  className="mb-6"
                  onSubmit={handleVerifyOtp}
                >
                  <div className="mb-6 form-control-validation">
                    <label htmlFor="otp" className="form-label">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      name="otp"
                      placeholder="Enter your OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {timer > 0 ? (
                      <span
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Resend OTP in <strong>{timer}</strong>s
                      </span>
                    ) : (
                      <button
                        className="btn btn-link p-0 text-primary"
                        type="button"
                        onClick={handleResendOtp}
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    className="btn btn-primary d-flex w-100"
                    disabled={isVerifyOtp}
                  >
                    {isVerifyOtp && (
                      <div
                        className="spinner-border spinner-white me-2"
                        role="status"
                      ></div>
                    )}
                    Verify OTP
                  </button>
                </form>

                <div className="text-center">
                  <a href="/" className="d-flex justify-content-center">
                    <i className="icon-base ti tabler-chevron-left scaleX-n1-rtl me-1_5" />
                    Back to login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
