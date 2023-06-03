"use client";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Badge from "./Badge";
import { getDateFromDateTime } from "@/utils/dateTimeConverter";
const ShoppingHistoryCard = ({
  id,
  title,
  createdAt,
  status,
  setViewShoppingHistoryId,
}) => {
  return (
    <div
      className="rounded-xl cursor-pointer bg-white flex items-center p-5"
      onClick={() => setViewShoppingHistoryId(id)}
    >
      <h5 className="text-base font-medium">{title}</h5>
      <div className="ml-auto flex items-center justify-around gap-2">
        <div className="text-xs font-medium text-[#C1C1C4]">
          <EventNoteIcon />
          <span className="ml-3">
            {getDateFromDateTime(createdAt).localeString}
          </span>
        </div>
        <Badge text={status} variant="blue" />
        <ChevronRightIcon className="text-primary-theme-color font-medium" />
      </div>
    </div>
  );
};

export default ShoppingHistoryCard;
