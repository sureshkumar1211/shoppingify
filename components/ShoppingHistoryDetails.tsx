"use client";
import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShoppingListItem from "./ShoppingListItem";
import { useQuery } from "@tanstack/react-query";
import { getShoppingHistory } from "@/app/actions/getShoppingHistory";
import { getDateFromDateTime } from "@/utils/dateTimeConverter";
import { getItemsWithCategories } from "@/utils/getItemsWithCategories";

const ShoppingHistoryDetails: React.FC<any> = ({
  id,
  setViewShoppingHistoryId,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["shoppingHistory", id],
    queryFn: () => getShoppingHistory(id),
  });

  if (isLoading) return <p>Loading...</p>;

  const renderShoppingListItems = (shoppingItems) => {
    return shoppingItems?.map((item, index) => (
      <ShoppingListItem key={index} {...item} type="history" />
    ));
  };

  const renderCategoriesWithItems = () => {
    const categories = getItemsWithCategories(data?.purchaseItems);
    return Object.keys(categories).map((category, index) => {
      const shoppingItems = categories[category];
      return (
        <article className="mt-10" key={index}>
          <h5 className="text-lg font-medium">{category}</h5>
          <div
            key={index}
            className="mt-4 grid grid-cols-4 items-start gap-y-6 gap-x-4"
          >
            {renderShoppingListItems(shoppingItems)}
          </div>
        </article>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => setViewShoppingHistoryId("")}
        className="flex items-center gap-2 text-primary-theme-color text-sm font-bold"
      >
        <KeyboardBackspaceOutlinedIcon className="text-sm" />
        <span>back</span>
      </button>
      <header className="flex flex-col gap-5 mt-10">
        <h4 className="text-2xl font-medium">{data?.title}</h4>
        <div className="text-xs font-medium text-[#C1C1C4]">
          <EventNoteIcon />
          <span className="ml-3">
            {getDateFromDateTime(data?.createdAt).localeString}
          </span>
        </div>
      </header>
      <section>{renderCategoriesWithItems()}</section>
    </>
  );
};

export default ShoppingHistoryDetails;
