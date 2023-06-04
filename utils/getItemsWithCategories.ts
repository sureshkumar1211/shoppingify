export const getItemsWithCategories = (shoppingItems) => {
  const categories = {};
  shoppingItems.map((item) => {
    if (categories[item.shoppingItem.category.name]) {
      categories[item.shoppingItem.category.name].push({
        ...item.shoppingItem,
        quantity: item.quantity,
      });
    } else {
      categories[item.shoppingItem.category.name] = [
        { ...item.shoppingItem, quantity: item.quantity },
      ];
    }
  });
  return categories;
};
