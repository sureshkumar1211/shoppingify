import React from "react";
import PrivateLayout from "../PrivateLayout";

const layout = ({ children }) => {
  return <PrivateLayout>{children}</PrivateLayout>;
};

export default layout;
