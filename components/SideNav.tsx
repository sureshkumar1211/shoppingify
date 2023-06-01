"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReplayIcon from "@mui/icons-material/Replay";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const SideNav = () => {
  return (
    <div className="w-[93px] bg-white h-screen flex flex-col justify-between">
      {/* logo */}
      <div className="w-full flex justify-center pt-[54px]">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            width={39}
            height={100}
            alt="Shoppi"
            title="Shoppi"
          ></Image>
        </Link>
      </div>
      {/* navlinks */}
      <nav className="flex flex-col gap-5">
        <Link
          href={"/items"}
          className="before:absolute before:left-0 before:w-[6px] before:h-full relative before:rounded-tr-[4px] before:rounded-br-[4px] before:bg-primary-theme-color w-full h-[45px] flex justify-center items-center cursor-pointer"
          title="items"
        >
          <FormatListBulletedIcon className="text-xl" />
        </Link>
        <Link
          href={"/history"}
          className="w-full h-[45px] flex justify-center items-center cursor-pointer"
          title="history"
        >
          <ReplayIcon className="text-xl" />
        </Link>
        <Link
          href={"/statistics"}
          className="w-full h-[45px] flex justify-center items-center cursor-pointer"
          title="statistics"
        >
          <AssessmentOutlinedIcon className="text-xl" />
        </Link>
      </nav>

      {/* cart icon */}
      <div className="w-full flex justify-center mb-10">
        <button className="relative w-[42px] h-[42px] cursor-pointer rounded-full bg-primary-theme-color text-white flex items-center justify-center">
          <ShoppingCartOutlinedIcon className="text-xl" />
          <span className="absolute rounded-[4px] top-[-5px] right-[-8px] leading-[15px] text-xs bg-[#EB5757] py-[2.5px] px-[6.86px]">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
