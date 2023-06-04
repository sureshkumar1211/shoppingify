"use client";
import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SelectedShoppingList from "./SelectedShoppingList";
import { ShoppingContext } from "@/context/shoppingContext";
import { SidebarControlTypes } from "./ShoppingSidebarControls";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addShoppingHistory } from "@/app/actions/addShoppingHistory";

const ShoppingCartList = () => {
  const { purchaseItems, updateSidebarActionType } =
    useContext(ShoppingContext);
  const [submitStep, setSubmitStep] = useState<number>(0);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [shoppingHistoryTitle, setShoppingHistoryTitle] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addShoppingHistory,
  });
  const onclickAddItemHandler = () => {
    updateSidebarActionType(SidebarControlTypes.ADD_ITEM);
  };

  const onCloseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowCancelModal(false);
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShoppingHistoryTitle(value);
  };

  const createShoppingHistory = (status: string) => {
    const shoppingPurchaseItems = purchaseItems.map((item) => {
      return { shoppingId: item.id, quantity: item.quantity };
    });
    const newShoppingHistory = {
      title: shoppingHistoryTitle,
      purchaseItems: shoppingPurchaseItems,
      status: status,
    };
    mutation.mutate(newShoppingHistory, {
      onSuccess: (response: any) => {
        response.json().then((data) => {
          queryClient.invalidateQueries({ queryKey: ["shoppingHistories"] });
          updateSidebarActionType(SidebarControlTypes.SHOPPING_LIST);
        });
      },
      onSettled: () => {
        setShowCancelModal(false);
      },
    });
  };
  const onSubmitModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createShoppingHistory("cancelled");
  };

  const onClickCompleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createShoppingHistory("completed");
  };

  const renderFooter = () => {
    if (submitStep === 0) {
      return (
        <>
          <input
            className="rounded-xl w-full focus:outline-primary-theme-color py-4 pr-[70px] pl-4 placeholder:text-[#BDBDBD] border-2 border-solid border-[#BDBDBD]"
            type={"text"}
            name={"title"}
            onChange={onChangeInputHandler}
            value={shoppingHistoryTitle}
            placeholder={"Enter a name"}
          />
          <button
            type="button"
            onClick={() => setSubmitStep(1)}
            className="outline-none absolute top-0 bottom-0 right-0 bg-primary-theme-color px-4 py-4 rounded-xl text-white"
          >
            Save
          </button>
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => setShowCancelModal(true)}
          className="outline-none text-[#34333A]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClickCompleteHandler}
          className="outline-none bg-[#56CCF2] px-3 py-4 rounded-lg text-white"
        >
          Complete
        </button>
      </>
    );
  };

  return (
    <aside className="pt-10 pl-8 pr-6 relative bg-secondary-bg-color h-screen">
      <div className="bg-[#80485B] rounded-3xl flex">
        <img
          src="/source.svg"
          alt="add item"
          className="relative top-[-20px]"
        />
        <div className="mx-5 my-4 flex flex-col">
          <span className="text-white text-base font-bold">
            Didn’t find what you need?
          </span>
          <button
            onClick={onclickAddItemHandler}
            className="mt-2 text-sm font-bold bg-white outline-none py-[11px] px-[30px] shadow-sm rounded-xl"
          >
            Add item
          </button>
        </div>
      </div>
      {/* Selected shopping list */}
      {!purchaseItems.length ? (
        <div className="h-[50vh] relative justify-center flex items-center">
          <h5 className="z-10 text-lg font-bold">No items</h5>
          <img
            src="./undraw_shopping_app_flsj 1.svg"
            className="absolute bottom-0"
            alt="empty cart"
          />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between mt-8 items-center text-[#34333A]">
            <h4 className="text-2xl font-bold ">Shopping list</h4>
            <EditIcon className="text-lg cursor-pointer" />
          </div>
          <div className="overflow-y-scroll h-[250px] table">
            <SelectedShoppingList title="Fruit and vegetables" />
          </div>
          <footer className="absolute left-0 right-0 bottom-0 px-10 py-8 bg-white w-full">
            <div className="relative w-full flex justify-around">
              {renderFooter()}
            </div>
          </footer>
        </>
      )}
      <Modal
        title="Are you sure that you want to cancel this list?"
        isOpen={showCancelModal}
        actionLabel="Yes"
        secondaryActionLabel="cancel"
        secondaryAction={(e) => onCloseModalHandler(e)}
        onClose={(e) => onCloseModalHandler(e)}
        onSubmit={(e) => onSubmitModalHandler(e)}
      />
    </aside>
  );
};

export default ShoppingCartList;
