import React from "react";
import "../../../../public/assets/vendor/css/core.css";
import "../../../../public/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css";

export default function Footer() {
  return (
    <>
      {/* -----------------------START FOOTER--------------------------- */}
      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl">
          <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
            <div className="text-body">
              ©<script>document.write(new Date().getFullYear());</script>
              2025 , made with ❤️ by
              <a
                href="https://tryangletech.com/"
                target="_blank"
                className="footer-link"
              >
                Tryangle Tech
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* -----------------------END FOOTER--------------------------- */}
    </>
  );
}
