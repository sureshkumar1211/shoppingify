"use client";
import React, { useCallback, useContext } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IShoppingItem, ShoppingContext } from "@/context/shoppingContext";
interface ShoppingListItemProps extends IShoppingItem {
  type: "history" | "list";
  quantity?: number;
}
const ShoppingListItem: React.FC<ShoppingListItemProps> = (item) => {
  const { updateShoppingItemDetails } = useContext(ShoppingContext);
  const handleOnClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (item.type === "list") {
        updateShoppingItemDetails(item);
      }
    },
    [item]
  );
  return (
    <div
      onClick={handleOnClick}
      className="bg-white cursor-pointer rounded-2xl py-[15px] text-base font-medium px-[17px] flex justify-between shadow-sm"
    >
      <span>{item.title}</span>
      {item.type === "list" ? (
        <AddOutlinedIcon className="text-[#C1C1C4]" />
      ) : (
        <span className="text-primary-theme-color text-sm font-medium">
          {item.quantity} pcs
        </span>
      )}
    </div>
  );
};

export default ShoppingListItem;
