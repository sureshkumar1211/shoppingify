"use client";
import React, { useCallback, useContext } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlined from "@mui/icons-material/CheckBoxOutlined";
import { ShoppingContext } from "@/context/shoppingContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export interface SelectedShoppingListItemProps {
  id: string;
  title: string;
  quantity: number;
  purchased: boolean;
}

const SelectedShoppingListItem: React.FC<SelectedShoppingListItemProps> = ({
  id,
  title,
  quantity = 1,
  purchased = false,
}) => {
  const { updatePurchaseItemStatus, updatePurchaseItemQuantity } =
    useContext(ShoppingContext);
  const renderCheckbox = useCallback(() => {
    switch (purchased) {
      case false:
        return (
          <CheckBoxOutlineBlankIcon className="rounded-[4px] text-primary-theme-color" />
        );
      default:
        return (
          <CheckBoxOutlined className="rounded-[4px] text-primary-theme-color" />
        );
    }
  }, [purchased]);

  const onClickHandler = (e: any) => {
    e.preventDefault();
    updatePurchaseItemStatus(id, !purchased);
  };
  const onClickRemoveQuantityHandler = (e: any) => {
    e.stopPropagation();
    updatePurchaseItemQuantity(id, quantity > 1 ? quantity - 1 : quantity);
  };
  const onClickAddQuantityHandler = (e: any) => {
    e.stopPropagation();
    updatePurchaseItemQuantity(id, quantity + 1);
  };
  return (
    <div
      onClick={onClickHandler}
      className="mt-6 flex justify-start cursor-pointer items-center"
    >
      {renderCheckbox()}
      <span
        className={`text-lg font-medium px-2 ${
          purchased ? "line-through" : ""
        }`}
      >
        {title}
      </span>
      <div className="group hover:transition-all rounded-xl bg-white flex items-center justify-center gap-2">
        <div className="group-hover:block hidden px-3 py-2 bg-primary-theme-color rounded-xl text-white">
          <DeleteOutlineOutlinedIcon className="text-sm" />
        </div>
        <RemoveOutlinedIcon
          onClick={onClickRemoveQuantityHandler}
          className="cursor-pointer group-hover:block hidden"
        />
        <div className="w-16 h-8 rounded-3xl bg-secondary-bg-color justify-center items-center flex text-primary-theme-color border-primary-theme-color border-2 border-solid">
          <span className="text-xs font-medium">{quantity} pcs</span>
        </div>
        <AddOutlinedIcon
          className="cursor-pointer group-hover:block hidden"
          onClick={onClickAddQuantityHandler}
        />
      </div>
    </div>
  );
};

export default SelectedShoppingListItem;
