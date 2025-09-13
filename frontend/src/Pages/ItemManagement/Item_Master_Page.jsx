import React from "react";
import { CategoryMasterProvider } from "../../Context/ItemManagement/CategoryMasterContext";
import { SubCategoryProvider } from "../../Context/ItemManagement/SubCategoryContext";
import Item_Master_List from "./components/ItemManagement/Item_Master/Item_Master_List";
import { useParams } from "react-router-dom";

export default function Item_Master_Page() {
  // const { type } = useParams(); // material | service | asset
  return (
    <>
      {/* --------------START ITEM MASTER [PAGE]---------------- */}

      <CategoryMasterProvider>
        <SubCategoryProvider>
          <Item_Master_List />
        </SubCategoryProvider>
      </CategoryMasterProvider>

      {/* --------------END ITEM MASTER [PAGE]---------------- */}
    </>
  );
}
