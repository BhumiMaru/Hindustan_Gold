import React from "react";
import { SubCategoryProvider } from "../../Context/ItemManagement/SubCategoryContext";
import { CategoryMasterProvider } from "../../Context/ItemManagement/CategoryMasterContext";
import { GroupMasterProvider } from "../../Context/ItemManagement/GroupMasterContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";
import SubCategory_Master_List from "./components/ItemManagement/SubCategory_Master/SubCategory_Master_List";

export default function SubCategory_Master_Page() {
  return (
    <>
      {/* ---------------------START SUB CATEGORY MASTER [PAGE]---------------------- */}
      <SubCategoryProvider>
        <CategoryMasterProvider>
          <GroupMasterProvider>
            <UserCreationProvider>
              <SubCategory_Master_List />
            </UserCreationProvider>
          </GroupMasterProvider>
        </CategoryMasterProvider>
      </SubCategoryProvider>
      {/* ---------------------END SUB CATEGORY MASTER [PAGE]---------------------- */}
    </>
  );
}
