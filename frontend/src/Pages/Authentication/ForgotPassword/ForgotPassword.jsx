import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/Authentication/LoginContext";
import { decryptData } from "../../../utils/decryptData";
import { toast } from "react-toastify";

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function ForgotPassword() {
  const {
    sendOTP,
    sendOTPLoading,
    verifyOTP,
    isVerifyOtp,
    otp,
    setOtp,
    isOtpStep,
    setIsOtpStep,
  } = useAuth();

  const [email, setEmail] = useState("");
  // const [isOtpStep, setIsOtpStep] = useState(false);
  const [timer, setTimer] = useState(60);

  // Load stored encrypted email (if exists)
  useEffect(() => {
    const stored = sessionStorage.getItem("email");
    if (stored) {
      const decrypted = decryptData(stored);
      if (decrypted?.email) {
        setEmail(decrypted.email);
        setIsOtpStep(true);
      }
    }
  }, []);

  // Timer handling
  useEffect(() => {
    if (!isOtpStep || timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isOtpStep]);

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    await sendOTP(email);
    // if (success) {
    //   setIsOtpStep(true);
    //   setTimer(60);
    // }
  };

  // Verify OTP
  const handleVerify = (e) => {
    e.preventDefault();
    verifyOTP({ email, otp });
  };

  // Resend OTP
  const handleResend = () => {
    sendOTP(email);
    setTimer(60);
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

                {/* ---------------------------- */}
                {/* STEP 1 → EMAIL SCREEN */}
                {/* ---------------------------- */}
                {/* {!isOtpStep && ( */}
                <>
                  <h4 className="mb-1">
                    {isOtpStep ? "OTP Verification" : "Forgot Password? 🔒"}{" "}
                  </h4>
                  <p className="mb-6">
                    {isOtpStep ? (
                      <>
                        We have sent an OTP to <strong>{email}</strong>
                      </>
                    ) : (
                      <>
                        Enter your email and we'll send you instructions to
                        reset your password
                      </>
                    )}
                  </p>

                  <form onSubmit={isOtpStep ? handleVerify : handleSendOTP}>
                    <div className="mb-3 form-control-validation">
                      <span className="float-start">
                        <label className="form-label">Email</label>
                      </span>
                      {isOtpStep && (
                        <span className="float-end">
                          <button
                            type="button"
                            className="btn btn-link p-0 text-primary"
                            style={{
                              color: "#696CFF",
                              fontWeight: 500,
                              fontSize: "13px",
                            }}
                            onClick={() => {
                              setIsOtpStep(false);
                              setOtp("");
                              setTimer(60);
                            }}
                          >
                            change Email
                          </button>
                        </span>
                      )}
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isOtpStep}
                      />
                    </div>

                    {isOtpStep && (
                      <div className="mb-6 form-control-validation">
                        <label className="form-label">Enter OTP</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    )}

                    {/* <button
                      className="btn btn-primary d-flex w-100"
                      disabled={
                        isOtpStep ? isVerifyOtp : sendOTPLoading && !email
                      }
                    >
                      {isOtpStep
                        ? isVerifyOtp
                        : sendOTPLoading && (
                            <div className="spinner-border spinner-white me-2" />
                          )}
                      {isOtpStep ? "Verify OTP" : "Send OTP"}
                    </button> */}
                    <button
                      className="btn btn-primary d-flex w-100 justify-content-center align-items-center gap-2"
                      disabled={
                        isOtpStep
                          ? isVerifyOtp || !otp
                          : sendOTPLoading || !email
                      }
                    >
                      {isOtpStep ? (
                        isVerifyOtp ? (
                          <div className="spinner-border spinner-white me-2" />
                        ) : null
                      ) : (
                        sendOTPLoading && (
                          <div className="spinner-border spinner-white me-2" />
                        )
                      )}

                      {isOtpStep ? "Verify OTP" : "Send OTP"}
                    </button>

                    {isOtpStep && (
                      <div className="w-100 text-center mt-2">
                        {timer > 0 ? (
                          <small style={{ color: "#566A7F", fontSize: "13px" }}>
                            Resend OTP in <strong>{timer}</strong>s
                          </small>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-link p-0 text-primary"
                            style={{
                              color: "#FF3E1D",
                              fontWeight: 500,
                              fontSize: "13px",
                            }}
                            onClick={handleResend}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                </>
                {/* )} */}

                {/* Back to login */}
                <div className="text-center mt-4">
                  <a href="/" className="d-flex justify-content-center">
                    <i className="icon-base ti tabler-chevron-left me-1_5" />
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
