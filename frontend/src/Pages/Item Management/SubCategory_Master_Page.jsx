import React from "react";
import SubCategory_Master_List from "../../components/Item Management/SubCategory_Master/SubCategory_Master_List";
import { SubCategoryProvider } from "../../Context/Item Management/SubCategoryContext";
import { CategoryMasterProvider } from "../../Context/Item Management/CategoryMasterContext";
import { GroupMasterProvider } from "../../Context/Item Management/GroupMasterContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";

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
