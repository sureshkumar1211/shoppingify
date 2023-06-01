"use client";
import React, { useCallback, useContext } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IShoppingItem, ShoppingContext } from "@/context/shoppingContext";
const ShoppingListItem: React.FC<IShoppingItem> = (item) => {
  const { updateShoppingItemDetails } = useContext(ShoppingContext);
  const handleOnClick = useCallback(
    (e: any) => {
      e.preventDefault();
      updateShoppingItemDetails(item);
    },
    [item]
  );
  return (
    <div
      onClick={handleOnClick}
      className="bg-white cursor-pointer rounded-2xl py-[15px] text-base font-medium px-[17px] flex justify-between shadow-sm"
    >
      <span>{item.title}</span>
      <AddOutlinedIcon className="text-[#C1C1C4]" />
    </div>
  );
};

export default ShoppingListItem;
