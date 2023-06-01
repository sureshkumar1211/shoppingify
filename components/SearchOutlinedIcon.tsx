"use client";
import dynamic from "next/dynamic";
import React from "react";
const MUISearchOutlinedIcon = dynamic(
  () => import("@mui/icons-material/SearchOutlined"),
  { ssr: false }
);
const SearchOutlinedIcon: React.FC<any> = ({ styleClasses }) => {
  return <MUISearchOutlinedIcon className={styleClasses} />;
};

export default SearchOutlinedIcon;
