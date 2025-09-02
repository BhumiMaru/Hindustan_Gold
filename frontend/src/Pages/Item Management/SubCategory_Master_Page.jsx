import React from "react";
import SubCategory_Master_List from "../../components/Item Management/SubCategory_Master/SubCategory_Master_List";
import { SubCategoryProvider } from "../../Context/Item Management/SubCategoryContext";

export default function SubCategory_Master_Page() {
  return (
    <>
      {/* ---------------------START SUB CATEGORY MASTER [PAGE]---------------------- */}
      <SubCategoryProvider>
        <SubCategory_Master_List />
      </SubCategoryProvider>
      {/* ---------------------END SUB CATEGORY MASTER [PAGE]---------------------- */}
    </>
  );
}
