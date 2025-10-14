import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";

export default function View_Sub_Cat_Owners_Name() {
  const { handleClose } = useUIContext();
  const { subCategoryData } = useSubCategory();
  return (
    <>
      {/* ------------START VIEW SUB CATEGORY DETAILS------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block", paddingLeft: 0 }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div
            className="modal-content"
            style={{ width: "auto", display: "inline-block" }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewSubCatOwnersName")}
              />
            </div>
            <div className="modal-body">
              <h5 className="modal-title mb-3" id="exampleModalLabel2">
                View SubCategory Owners Name
              </h5>
              <label className="form-label">SubCategory Owners </label>
              <p>
                {subCategoryData?.owners?.map((owner, index) => (
                  <span key={owner?.user?.id}>
                    {owner?.user?.name}
                    {index < subCategoryData?.owners?.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>

      {/* ------------END VIEW SUB CATEGORY DETAILS------------- */}
    </>
  );
}

//--------------------------------------------------------//
// import React from "react";
// import { useUIContext } from "../../../../../Context/UIContext";
// import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";

// export default function View_Sub_Cat_Owners_Name() {
//   const { handleClose } = useUIContext();
//   const { subCategoryData } = useSubCategory();

//   return (
//     <>
//       {/* ------------START VIEW SUB CATEGORY DETAILS------------- */}
//       <div
//         className="modal fade show"
//         id="smallModal"
//         tabIndex={-1}
//         aria-modal="true"
//         role="dialog"
//         style={{ display: "block" }}
//       >
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content shadow-lg border-0 rounded-3">
//             <div className="modal-header border-0 pb-0">
//               <h5 className="modal-title fw-semibold text-primary">
//                 View Subcategory Owners
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => handleClose("viewSubCatOwnersName")}
//               />
//             </div>

//             <div className="modal-body pt-2">
//               <label className="form-label fw-medium text-secondary">
//                 Owners List:
//               </label>

//               {subCategoryData?.owners?.length > 0 ? (
//                 <ul className="list-unstyled ps-2 mb-0">
//                   {subCategoryData.owners.map((owner, index) => (
//                     <li key={owner?.user?.id || index} className="mb-1">
//                       <i className="ti ti-user text-primary me-2"></i>
//                       {owner?.user?.name || "—"}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted fst-italic mb-0">
//                   No owners assigned to this subcategory.
//                 </p>
//               )}
//             </div>

//             <div className="modal-footer border-0 pt-0">
//               <button
//                 type="button"
//                 className="btn btn-secondary btn-sm"
//                 data-bs-dismiss="modal"
//                 onClick={() => handleClose("viewSubCatOwnersName")}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="modal-backdrop fade show"></div>
//       {/* ------------END VIEW SUB CATEGORY DETAILS------------- */}
//     </>
//   );
// }
