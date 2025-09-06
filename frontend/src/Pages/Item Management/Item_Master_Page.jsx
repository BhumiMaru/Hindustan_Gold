import React from "react";
import Item_Master_List from "../../components/Item Management/Item_Master/Item_Master_List";
import { ItemMasterProvider } from "../../Context/Item Management/ItemMasterContext";
import { CategoryMasterProvider } from "../../Context/Item Management/CategoryMasterContext";
import { SubCategoryProvider } from "../../Context/Item Management/SubCategoryContext";

export default function Item_Master_Page() {
  return (
    <>
      {/* --------------START ITEM MASTER [PAGE]---------------- */}
      <ItemMasterProvider>
        <CategoryMasterProvider>
          <SubCategoryProvider>
            <Item_Master_List />
          </SubCategoryProvider>
        </CategoryMasterProvider>
      </ItemMasterProvider>
      {/* --------------END ITEM MASTER [PAGE]---------------- */}
    </>
  );
}
