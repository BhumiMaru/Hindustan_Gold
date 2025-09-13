import React from "react";
import { CategoryMasterProvider } from "../../Context/ItemManagement/CategoryMasterContext";
import { GroupMasterProvider } from "../../Context/ItemManagement/GroupMasterContext";
import Category_Master_List from "./components/ItemManagement/Category_Master/Category_Master_List";

export default function Category_Master_Page() {
  return (
    <>
      {/* ----------------START CATEGORY MASTER [PAGE]-------------------- */}
      <CategoryMasterProvider>
        <GroupMasterProvider>
          <Category_Master_List />
        </GroupMasterProvider>
      </CategoryMasterProvider>
      {/* ----------------END CATEGORY MASTER [PAGE]-------------------- */}
    </>
  );
}
