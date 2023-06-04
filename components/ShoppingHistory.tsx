"use client";
import React, { useState } from "react";
import ShoppingHistoryCard from "./ShoppingHistoryCard";
import ShoppingHistoryDetails from "./ShoppingHistoryDetails";
import { useQuery } from "@tanstack/react-query";
import { getShoppingHistories } from "@/app/actions/getShoppingHistories";
import { sortHistoryByMonth } from "@/utils/sortHistoryByMonth";

const ShoppingHistory: React.FC<any> = () => {
  const [viewShoppingHistoryId, setViewShoppingHistoryId] =
    useState<string>("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["shoppingHistories"],
    queryFn: getShoppingHistories,
  });
  if (isLoading) return <p>Loading</p>;

  const renderShoppingHistory = () => {
    const histories = sortHistoryByMonth(data);
    return Object.keys(histories).map((key, index) => {
      const monthHistories = histories[key];
      return (
        <div key={index} className="flex flex-col gap-4">
          <h5 className="text-xs font-medium">{key}</h5>
          {monthHistories.map((history) => {
            return (
              <ShoppingHistoryCard
                key={history.id}
                {...history}
                setViewShoppingHistoryId={setViewShoppingHistoryId}
              />
            );
          })}
        </div>
      );
    });
  };
  if (!viewShoppingHistoryId) {
    return (
      <section className="px-[80px] overflow-y-auto pt-[38px] basis-[75%]">
        <h4 className="text-2xl font-medium">Shopping history</h4>
        <div className="flex mt-10 flex-col gap-10">
          {renderShoppingHistory()}
        </div>
      </section>
    );
  }
  return (
    <section className="px-[80px] overflow-y-auto pt-[38px] basis-[75%]">
      <ShoppingHistoryDetails
        setViewShoppingHistoryId={setViewShoppingHistoryId}
        id={viewShoppingHistoryId}
      />
    </section>
  );
};

export default ShoppingHistory;
