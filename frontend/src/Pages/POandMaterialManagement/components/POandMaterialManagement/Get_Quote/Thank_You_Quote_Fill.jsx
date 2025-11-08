import React from "react";
import { Link } from "react-router-dom";

export default function Thank_You_Quote_Fill() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      {/* Logo Section */}
      <div className="mb-4">
        <img
          src="/assets/img/logo_vertical.png"
          alt="Company Logo"
          style={{ height: 100 }}
        />
      </div>

      {/* Thank You Message */}
      <div className="p-4 rounded-4" style={{ maxWidth: 600, width: "100%" }}>
        <h3 className="text-muted fw-bold mb-3">
          Thank You for Submitting Your Quotation!
        </h3>

        <p className="fs-5 text-muted">
          We’ve successfully received your quotation details. Our procurement
          team will review it and get back to you soon.
        </p>

        {/* Optional info */}
        <div className="mt-4">
          <p className="text-secondary mb-1">
            For any assistance, please contact:
          </p>
          <a
            href="mailto:support@hindustangold.com"
            className="text-decoration-none fw-semibold"
          >
            support@hindustangold.com
          </a>
        </div>

        {/* Go back or home button */}
        {/* <div className="mt-5">
          <Link
            to="/"
            className="btn btn-primary rounded-pill px-4 py-2"
            style={{ fontWeight: 500 }}
          >
            Go to Homepage
          </Link>
        </div> */}
      </div>

      {/* Footer */}
      <div className="mt-5 text-muted small">
        © {new Date().getFullYear()} Hindustan Gold Pvt. Ltd. All Rights
        Reserved.
      </div>
    </div>
  );
}
