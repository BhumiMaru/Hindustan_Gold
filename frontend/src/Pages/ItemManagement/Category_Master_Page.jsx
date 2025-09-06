import React from "react";

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
