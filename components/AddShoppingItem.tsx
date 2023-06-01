import React, { useContext, useEffect } from "react";
import InputTextField from "./InputTextField";
import InputTextAreaField from "./InputTextAreaField";
import InputDropdownField from "./InputDropdownField";
import { ShoppingContext } from "@/context/shoppingContext";
import { SidebarControlTypes } from "./ShoppingSidebarControls";
import { addShoppingItem } from "@/app/actions/addShoppingItem";
import { getAllCategories } from "@/app/actions/getCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const AddShoppingItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addShoppingItem,
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const { updateSidebarActionType, saveShoppingItem } =
    useContext(ShoppingContext);
  const onClickCancelHandler = () => {
    updateSidebarActionType(SidebarControlTypes.SHOPPING_LIST);
  };
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const formData: any = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const newShoppingItem = {
      ...formData,
    };
    mutation.mutate(newShoppingItem, {
      onSuccess: (response: any) => {
        response.json().then((data) => {
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          saveShoppingItem(data);
          updateSidebarActionType(SidebarControlTypes.SHOPPING_LIST);
        });
      },
    });
  };

  const getCategoryChoices = () => {
    return data?.map((category) => ({
      label: category.name,
      name: category.id,
      id: category.id,
    }));
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="pt-8 pr-6 flex flex-col relative h-screen"
    >
      <h4 className="text-2xl font-medium">Add a new item</h4>
      <div className="mt-6 flex flex-col gap-5">
        <InputTextField
          name="title"
          label="Name"
          placeholder="Enter a name"
          removeTextBtn={false}
          required={true}
        />
        <InputTextAreaField
          name="description"
          label="Note"
          placeholder="Enter a note"
          required={false}
        />
        <InputTextField
          name="image"
          label="Image"
          placeholder="Enter a url"
          inputType="url"
          removeTextBtn={false}
          required={false}
        />
        <InputDropdownField
          name="categoryId"
          label="Category"
          placeholder="Enter a category"
          removeTextBtn={false}
          required={true}
          choices={getCategoryChoices()}
        />
      </div>
      <div className="flex justify-center left-0 gap-8 items-center w-full text-base font-bold absolute bottom-4">
        <button
          onClick={onClickCancelHandler}
          className="outline-none text-[#34333A]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="outline-none bg-primary-theme-color px-6 py-5 rounded-xl text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddShoppingItem;
