"use client";
import React, { useContext } from "react";
import SelectedShoppingListItem from "./SelectedShoppingListItem";
import { ShoppingContext } from "@/context/shoppingContext";

interface SelectedShoppingListProps {
  id?: string;
  title: string;
}

const SelectedShoppingList: React.FC<SelectedShoppingListProps> = ({
  title,
}) => {
  const { purchaseItems } = useContext(ShoppingContext);
  const renderItems = () => {
    return purchaseItems?.map((item, index) => (
      <SelectedShoppingListItem key={index} {...item} />
    ));
  };
  return (
    <div className="mt-8 flex flex-col w-full">
      <h5 className="text-[#828282] text-sm font-medium">{title}</h5>
      {renderItems()}
    </div>
  );
};

export default SelectedShoppingList;
