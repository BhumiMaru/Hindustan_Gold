import React from "react";
import Category_Master_List from "../../components/Item Management/Category_Master/Category_Master_List";
import { CategoryMasterProvider } from "../../Context/Item Management/CategoryMasterContext";
import { GroupMasterProvider } from "../../Context/Item Management/GroupMasterContext";

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
