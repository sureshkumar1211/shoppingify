"use client";

import { SidebarControlTypes } from "@/components/ShoppingSidebarControls";
import React from "react";

export interface IShoppingItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  categoryId?: string;
}
export interface ICategories {
  id: string;
  name: string;
  ShoppingItems: IShoppingItem[];
}
export interface IPurchaseItem {
  id: string;
  title: string;
  purchased: boolean;
  quantity: number;
}
export type ShoppingContextActions = {
  savePurchaseItem: (id: string, title: string) => void;
  updatePurchaseItemQuantity: (id: string, quantity: number) => void;
  updatePurchaseItemStatus: (id: string, purchased: boolean) => void;
  updateSidebarActionType: (type: SidebarControlTypes) => void;
  saveShoppingItem: (item: IShoppingItem) => void;
  updateShoppingItemDetails: (item: IShoppingItem) => void;
};

export type ShoppingContextState = {
  items: ICategories[];
  sidebarActionType: SidebarControlTypes;
  purchaseItems: IPurchaseItem[] | [];
  currentShoppingItemDetails: IShoppingItem | null;
};
export type ShoppingContextType = ShoppingContextState & ShoppingContextActions;
export const ShoppingContext = React.createContext<ShoppingContextType>({
  items: [],
  purchaseItems: [],
  currentShoppingItemDetails: null,
  sidebarActionType: SidebarControlTypes.SHOPPING_LIST,
  savePurchaseItem: (id: string, title: string) => {},
  updateSidebarActionType: (type: SidebarControlTypes) => {},
  updatePurchaseItemQuantity: (id: string, quantity: number) => {},
  updatePurchaseItemStatus: (id: string, purchased: boolean) => {},
  saveShoppingItem: (item: IShoppingItem) => {},
  updateShoppingItemDetails: (item: IShoppingItem) => {},
});

const ShoppingContextProvider: React.FC<any> = ({ children }) => {
  const [shoppingState, setShoppingState] =
    React.useState<ShoppingContextState>({
      sidebarActionType: SidebarControlTypes.SHOPPING_LIST,
      currentShoppingItemDetails: null,
      items: [],
      purchaseItems: [],
    });

  const savePurchaseItem = (id: string, title: string) => {
    const purchaseItem: IPurchaseItem = {
      id,
      title,
      purchased: false,
      quantity: 1,
    };
    setShoppingState((prevState) => ({
      ...prevState,
      purchaseItems: [...prevState.purchaseItems, purchaseItem],
      sidebarActionType: SidebarControlTypes.SHOPPING_LIST,
    }));
  };
  const updateShoppingItemDetails = (item: IShoppingItem) => {
    setShoppingState((prevState) => ({
      ...prevState,
      currentShoppingItemDetails: item,
      sidebarActionType: SidebarControlTypes.ITEM_SUMMARY,
    }));
  };

  const updatePurchaseItemQuantity = (id: string, quantity: number) => {
    const updatePurchaseItems = shoppingState.purchaseItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
        };
      }
      return item;
    });
    setShoppingState((prevState) => ({
      ...prevState,
      purchaseItems: updatePurchaseItems,
    }));
  };

  const updatePurchaseItemStatus = (id: string, purchased: boolean) => {
    const updatePurchaseItems = shoppingState?.purchaseItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          purchased,
        };
      }
      return item;
    });
    setShoppingState((prevState) => ({
      ...prevState,
      purchaseItems: updatePurchaseItems,
    }));
  };

  const updateSidebarActionType = (type: SidebarControlTypes) => {
    setShoppingState((prevState) => ({
      ...prevState,
      sidebarActionType: type,
    }));
  };

  const saveShoppingItem = (item: IShoppingItem) => {
    const newPurchaseItem: IPurchaseItem = {
      id: item.id,
      title: item.title,
      purchased: false,
      quantity: 1,
    };
    setShoppingState((prevState) => ({
      ...prevState,
      purchaseItems: [...prevState.purchaseItems, newPurchaseItem],
    }));
  };
  return (
    <ShoppingContext.Provider
      value={{
        updateShoppingItemDetails,
        saveShoppingItem,
        updateSidebarActionType,
        updatePurchaseItemQuantity,
        updatePurchaseItemStatus,
        savePurchaseItem,
        ...shoppingState,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
