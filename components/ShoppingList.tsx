"use client";
import React, { useEffect } from "react";
import ShoppingListItem from "./ShoppingListItem";
import { ShoppingItem } from "@prisma/client";
import { getAllCategories } from "@/app/actions/getCategories";
import { useQuery } from "@tanstack/react-query";

interface ShoppingListProps {
  title: string;
  items: ShoppingItem[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ title, items }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const renderShoppingListItems = (shoppingItems) => {
    return shoppingItems?.map((item, index) => (
      <ShoppingListItem key={index} {...item} />
    ));
  };
  const renderShoppingList = () => {
    return data?.map((category) => {
      return (
        <article className="mt-10" key={category.id}>
          <h5 className="text-lg font-medium">{category.name}</h5>
          <div className="mt-4 grid grid-cols-4 items-start gap-y-6 gap-x-4">
            {renderShoppingListItems(category.ShoppingItems)}
          </div>
        </article>
      );
    });
  };

  return <>{renderShoppingList()}</>;
};

export default ShoppingList;
