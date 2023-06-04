"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { ShoppingContext } from "@/context/shoppingContext";

const ShoppingCartList = dynamic(() => import("./ShoppingCartList"), {
  loading: () => (
    <div className="flex h-screen justify-center items-center">Loading...</div>
  ),
});
const AddShoppingItem = dynamic(() => import("./AddShoppingItem"), {
  loading: () => (
    <div className="flex h-screen justify-center items-center">Loading...</div>
  ),
});
const ShoppingItemDetails = dynamic(() => import("./ShoppingItemDetails"), {
  loading: () => (
    <div className="flex h-screen justify-center items-center">Loading...</div>
  ),
});

export enum SidebarControlTypes {
  ADD_ITEM = "add-item",
  SHOPPING_LIST = "shopping-list",
  ITEM_SUMMARY = "item-summary",
}

const ShoppingSidebarControls: React.FC = ({}) => {
  const { currentShoppingItemDetails, sidebarActionType } =
    useContext(ShoppingContext);
  const renderSidebarAction = () => {
    switch (sidebarActionType) {
      case SidebarControlTypes.ADD_ITEM:
        return <AddShoppingItem />;
      case SidebarControlTypes.ITEM_SUMMARY:
        return (
          <ShoppingItemDetails
            id={currentShoppingItemDetails?.id as string}
            name={currentShoppingItemDetails?.title as string}
            category={currentShoppingItemDetails?.category as string}
            categoryId={currentShoppingItemDetails?.categoryId as string}
            imageSrc={currentShoppingItemDetails?.image as string}
            note={currentShoppingItemDetails?.description}
          />
        );
      case SidebarControlTypes.SHOPPING_LIST:
        return <ShoppingCartList />;
      default:
        return <ShoppingCartList />;
    }
  };
  return <section className="w-[25%]">{renderSidebarAction()}</section>;
};

export default ShoppingSidebarControls;
