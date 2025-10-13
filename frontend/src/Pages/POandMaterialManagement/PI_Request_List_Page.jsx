import React from "react";
import PI_Request_List from "./components/POandMaterialManagement/PI Request List/PI_Request_List";
import { ItemMasterProvider } from "../../Context/ItemManagement/ItemMasterContext";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";
import { GetQuoteProvider } from "../../Context/PIAndPoManagement/GetQuote";
import { postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";

export default function PI_Request_List_Page() {
  // const { itemMaster } = useItemMaster();
  // const { piRequestData } = usePIRequest();

  // // Prefill helper
  // const setItemDetailsFromMaster = (itemId, itemData, itemMaster) => {
  //   const selectedItem = itemMaster.find((itm) => itm.id === Number(itemId));
  //   if (!selectedItem) return itemData;
  //   // console.log("selectedItem selectedItem", selectedItem);

  //   const storage = selectedItem?.storage_locations?.[0];
  //   let serviceLocation1 = "";
  //   let serviceLocation2 = "";
  //   let serviceLocation3 = "";

  //   if (storage) {
  //     serviceLocation1 =
  //       storage?.service_location3?.service_location2?.service_location1
  //         ?.service_location_name || "";
  //     serviceLocation2 =
  //       storage?.service_location3?.service_location2
  //         ?.service_location_2_name || "";
  //     serviceLocation3 =
  //       storage?.service_location3?.service_location_3_name || "";
  //   }

  //   // ✅ extract zone safely
  //   const zoneName =
  //     selectedItem?.zones?.length > 0
  //       ? selectedItem.zones[0]?.zone?.zone_name
  //       : "";

  //   // console.log({
  //   //   ...itemData,
  //   //   item_name: selectedItem?.item_name || "",
  //   //   category: selectedItem?.category?.category_name || "",
  //   //   subcategory: selectedItem?.subcategory?.sub_category_name || "",
  //   //   uom: selectedItem?.uom || "KG",
  //   //   zone: zoneName || "",
  //   //   serviceLocation1,
  //   //   serviceLocation2,
  //   //   serviceLocation3,
  //   // });

  //   return {
  //     ...itemData,
  //     item_name: selectedItem?.item_name || "",
  //     category: selectedItem?.category?.category_name || "",
  //     subcategory: selectedItem?.subcategory?.sub_category_name || "",
  //     uom: selectedItem?.uom || "KG",
  //     zone: zoneName || "",
  //     serviceLocation1,
  //     serviceLocation2,
  //     serviceLocation3,
  //   };
  // };

  // // Fetch by ID
  // const findById = async (id) => {
  //   try {
  //     const res = await postData(ENDPOINTS.PI_REQUEST.DETAILS, { id });
  //     if (res?.status) {
  //       const piRequestData = res.data.piitems;
  //       // console.log("pi request", piRequestData);
  //       setItems(
  //         piRequestData?.map((it, index) =>
  //           setItemDetailsFromMaster(
  //             it.item_id,
  //             {
  //               id: index + 1,
  //               dbId: it.id,
  //               existing: true,
  //               requestedItem: it.item_id,
  //               qty: it.qty,
  //               purpose: it.purpose,
  //               priority: it.priority,
  //               requestDate: it.request_date,
  //               remarks: it.remark,
  //               tentative_consumption_day: it.tentative_consumption_day,
  //               file: null,
  //               status: it.status || "pending",
  //             },
  //             itemMaster
  //           )
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching PI Request for edit");
  //     console.error("Find by id PIRequest error:", error);
  //   }
  // };
  return (
    <>
      {/* ---------------------START PI REQUEST LIST PAGE------------------------- */}
      <ItemRequestProvider>
        <DepartmentProvider>
          <UserCreationProvider>
            <PIRequestProvider>
              <ItemMasterProvider>
                <GetQuoteProvider>
                  <PI_Request_List />
                </GetQuoteProvider>
              </ItemMasterProvider>
            </PIRequestProvider>
          </UserCreationProvider>
        </DepartmentProvider>
      </ItemRequestProvider>
      {/* ---------------------END PI REQUEST LIST PAGE------------------------- */}
    </>
  );
}
