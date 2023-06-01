import React, { useContext } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { ShoppingContext } from "@/context/shoppingContext";
import { SidebarControlTypes } from "./ShoppingSidebarControls";

interface ShoppingItemDetailsProps {
  id: string;
  name: string;
  note?: string;
  category: string;
  imageSrc: string;
}

const ShoppingItemDetails: React.FC<ShoppingItemDetailsProps> = ({
  id,
  name,
  category,
  imageSrc,
  note,
}) => {
  const { updateSidebarActionType, savePurchaseItem } =
    useContext(ShoppingContext);
  const onClickBackHandler = () => {
    updateSidebarActionType(SidebarControlTypes.SHOPPING_LIST);
  };
  const onClickAddListHandler = (e: any) => {
    e.preventDefault();
    savePurchaseItem(id, name);
  };

  return (
    <div className="px-11 bg-white pt-5 flex flex-col h-screen relative">
      <button
        onClick={onClickBackHandler}
        className="flex items-center gap-2 text-primary-theme-color text-sm font-bold"
      >
        <KeyboardBackspaceOutlinedIcon className="text-sm" />
        <span>back</span>
      </button>
      <section className="h-[80vh] overflow-y-auto">
        <img className="rounded-2xl" src={imageSrc} alt="" />
        <div className="mt-8 flex flex-col gap-3">
          <h6 className="text-[#C1C1C4] text-xs font-medium">name</h6>
          <h3 className="text-xl font-medium">{name}</h3>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <h6 className="text-[#C1C1C4] text-xs font-medium">category</h6>
          <h3 className="text-xl font-medium">{category}</h3>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <h6 className="text-[#C1C1C4] text-xs font-medium">note</h6>
          <h3 className="text-xl font-medium">{note}</h3>
        </div>
      </section>
      <footer className="flex justify-center gap-8 items-center w-full text-base font-bold absolute left-0 bottom-4">
        <button className="outline-none text-[#34333A]">Delete</button>
        <button
          onClick={onClickAddListHandler}
          className="outline-none bg-primary-theme-color px-4 py-3 rounded-xl text-white"
        >
          Add to list
        </button>
      </footer>
    </div>
  );
};

export default ShoppingItemDetails;
