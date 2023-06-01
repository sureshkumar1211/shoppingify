"use client";
import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SelectedShoppingList from "./SelectedShoppingList";
import { ShoppingContext } from "@/context/shoppingContext";
import { SidebarControlTypes } from "./ShoppingSidebarControls";

const ShoppingCartList = () => {
  const { purchaseItems, updateSidebarActionType } =
    useContext(ShoppingContext);
  const onclickAddItemHandler = () => {
    updateSidebarActionType(SidebarControlTypes.ADD_ITEM);
  };
  return (
    <aside className="pt-10 pl-8 pr-6 bg-secondary-bg-color h-screen overflow-y-auto fixed">
      <div className="bg-[#80485B] rounded-3xl flex">
        <img
          src="/source.svg"
          alt="add item"
          className="relative top-[-20px]"
        />
        <div className="mx-5 my-4 flex flex-col">
          <span className="text-white text-base font-bold">
            Didn’t find what you need?
          </span>
          <button
            onClick={onclickAddItemHandler}
            className="mt-2 text-sm font-bold bg-white outline-none py-[11px] px-[30px] shadow-sm rounded-xl"
          >
            Add item
          </button>
        </div>
      </div>
      {/* Selected shopping list */}
      {!purchaseItems.length ? (
        <div className="h-[50vh] relative justify-center flex items-center">
          <h5 className="z-10 text-lg font-bold">No items</h5>
          <img
            src="./undraw_shopping_app_flsj 1.svg"
            className="absolute bottom-0"
            alt="empty cart"
          />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between mt-8 items-center text-[#34333A]">
            <h4 className="text-2xl font-bold ">Shopping list</h4>
            <EditIcon className="text-lg cursor-pointer" />
          </div>
          <SelectedShoppingList title="Fruit and vegetables" />
        </>
      )}
    </aside>
  );
};

export default ShoppingCartList;
