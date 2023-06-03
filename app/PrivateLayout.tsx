import SideNav from "@/components/SideNav";
import React from "react";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <SideNav />
      <main className="flex flex-grow-[1] w-full">{children}</main>
    </>
  );
};

export default PrivateLayout;
