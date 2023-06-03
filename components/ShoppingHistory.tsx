"use client";
import React, { useState } from "react";
import ShoppingHistoryCard from "./ShoppingHistoryCard";
import ShoppingHistoryDetails from "./ShoppingHistoryDetails";
import { useQuery } from "@tanstack/react-query";
import { getShoppingHistories } from "@/app/actions/getShoppingHistories";

const ShoppingHistory: React.FC<any> = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["shoppingHistories"],
    queryFn: getShoppingHistories,
  });
  const [viewShoppingHistoryId, setViewShoppingHistoryId] =
    useState<string>("");
  if (isLoading) return <p>Loading</p>;
  const renderShoppingHistory = () => {
    return data.map((item) => {
      return (
        <div key={item.id} className="flex flex-col gap-4">
          <h5 className="text-xs font-medium">August 2020</h5>
          <ShoppingHistoryCard
            {...item}
            setViewShoppingHistoryId={setViewShoppingHistoryId}
          />
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
