import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import { toast } from "react-toastify";

export default function Vendor_Approve_Confirmation_Modal({
  vendorApproveData,
  setNewVendorLoading,
  newVendorLoading,
  setOldVendorLoading,
  oldVendorLoading,
}) {
  const { handleClose } = useUIContext();
  const { vendorApprove, getVendorList } = useVendor();
  const { quoteVendorList } = useGetQuote();

  console.log("vendorApproveData", vendorApproveData);

  // const handleApprove = async () => {
  //   try {
  //     if (vendorApproveData?.vendor_type === "old") {
  //       setOldVendorLoading((prev) => ({
  //         ...prev,
  //         [vendorApproveData.vendor_id]: true,
  //       }));
  //     } else {
  //       setNewVendorLoading((prev) => ({
  //         ...prev,
  //         [vendorApproveData.vendor_id]: true,
  //       }));
  //     }

  //     // ✅ Wait for vendor approval API to finish
  //     const res = await vendorApprove({
  //       vendor_id: vendorApproveData.vendor_id,
  //       pi_get_quate: vendorApproveData.pi_get_quote_id,
  //     });

  //     console.log("Vendor Approve Response:", res);

  //     // ✅ If success, refresh vendor list
  //     if (res?.status && vendorApproveData?.pi_get_quote_id) {
  //       handleClose("vendorApprove");
  //     }
  //     quoteVendorList({
  //       pi_get_quote_id: vendorApproveData.pi_get_quote_id,
  //       vendor_type: vendorApproveData.vendor_type,
  //     });
  //     getVendorList();
  //   } catch (error) {
  //     console.error("Vendor approve error:", error);
  //   } finally {
  //     if (vendorApproveData?.vendor_type === "old") {
  //       setOldVendorLoading((prev) => ({
  //         ...prev,
  //         [vendorApproveData.vendor_id]: false,
  //       }));
  //     } else {
  //       setNewVendorLoading((prev) => ({
  //         ...prev,
  //         [vendorApproveData.vendor_id]: false,
  //       }));
  //     }
  //   }
  // };

  const handleApprove = async () => {
    try {
      console.log("🔍 Starting vendor approval with data:", vendorApproveData);

      // Set loading state
      if (vendorApproveData?.vendor_type === "old") {
        setOldVendorLoading((prev) => ({
          ...prev,
          [vendorApproveData.vendor_id]: true,
        }));
      } else {
        setNewVendorLoading((prev) => ({
          ...prev,
          [vendorApproveData.vendor_id]: true,
        }));
      }

      // Call vendor approve
      const res = await vendorApprove({
        vendor_id: vendorApproveData.vendor_id,
        pi_get_quate: vendorApproveData.pi_get_quote_id,
      });

      console.log("📥 Vendor approve result:", res);

      // Check if approval was successful
      if (res?.success === true) {
        console.log("🎉 Vendor approved successfully, refreshing lists...");

        // ✅ Refresh the quote vendor lists (not getVendorList)
        try {
          // Refresh both vendor lists to ensure UI updates
          await quoteVendorList({
            pi_get_quote_id: vendorApproveData.pi_get_quote_id,
            vendor_type: "old",
          });

          await quoteVendorList({
            pi_get_quote_id: vendorApproveData.pi_get_quote_id,
            vendor_type: "new",
          });

          console.log("✅ Quote vendor lists refreshed");
        } catch (refreshError) {
          console.error("❌ Error refreshing vendor lists:", refreshError);
        }

        handleClose("vendorApprove");
        // toast.success("Vendor approved successfully!"); // Already shown in vendorApprove
      } else {
        console.log("❌ Vendor approval failed");
        toast.error(res?.message || "Failed to approve vendor");
      }
    } catch (error) {
      console.error("💥 Error in handleApprove:", error);
      toast.error("Error approving vendor");
    } finally {
      console.log("🧹 Cleaning up loading states");
      // Reset loading states
      if (vendorApproveData?.vendor_type === "old") {
        setOldVendorLoading((prev) => ({
          ...prev,
          [vendorApproveData.vendor_id]: false,
        }));
      } else {
        setNewVendorLoading((prev) => ({
          ...prev,
          [vendorApproveData.vendor_id]: false,
        }));
      }
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">
                Approve Vendor
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleClose("vendorApprove")}
              />
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Are you sure you want to <strong>approve</strong> this vendor?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary waves-effect"
                onClick={() => handleClose("vendorApprove")}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleApprove}
                disabled={
                  newVendorLoading[vendorApproveData?.vendor_id] ||
                  oldVendorLoading[vendorApproveData?.vendor_id]
                }
              >
                {(newVendorLoading[vendorApproveData?.vendor_id] ||
                  oldVendorLoading[vendorApproveData?.vendor_id]) && (
                  <div
                    className="spinner-border spinner-white me-2"
                    role="status"
                  ></div>
                )}
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
