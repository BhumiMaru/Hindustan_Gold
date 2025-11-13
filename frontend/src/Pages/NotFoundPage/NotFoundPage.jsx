// import React from "react";

// export default function NotFoundPage() {
//   return (
//     <>
//       {/* ----------------START PAGE NOT FOUND------------------- */}
//       <div className="container-xxl container-p-y d-flex align-items-center justify-content-center">
//         <div className="misc-wrapper">
//           <h1
//             className="mb-2 mx-2"
//             style={{ lineHeight: "6rem", fontSize: "6rem" }}
//           >
//             404
//           </h1>
//           <h4 className="mb-2 mx-2">Page Not Found️ ⚠️</h4>
//           <p className="mb-6 mx-2">
//             we couldn't find the page you are looking for
//           </p>
//           <a
//             href="/dashboard"
//             className="btn btn-primary mb-10 waves-effect waves-light"
//           >
//             Back to home
//           </a>
//           {/* <div className="mt-4">
//             <img
//               src="../../assets/img/illustrations/page-misc-error.png"
//               alt="page-misc-error-light"
//               width={225}
//               className="img-fluid"
//             />
//           </div> */}
//         </div>
//       </div>

//       {/* ----------------END PAGE NOT FOUND------------------- */}
//     </>
//   );
// }

//////////////

import React from "react";

export default function NotFoundPage() {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          height: "100vh", // full viewport height
          background: "linear-gradient(135deg, #f9fafc 0%, #ffffff 100%)",
        }}
      >
        <div className="misc-wrapper">
          <h1
            className="mb-2 mx-2"
            style={{ lineHeight: "6rem", fontSize: "6rem" }}
          >
            404
          </h1>
          <h4 className="mb-2 mx-2">Page Not Found️ ⚠️</h4>
          <p className="mb-6 mx-2">
            we couldn't find the page you are looking for
          </p>
          <a
            href="/dashboard"
            className="btn btn-primary mb-10 waves-effect waves-light"
          >
            Back to home
          </a>
        </div>
      </div>
    </>
  );
}
