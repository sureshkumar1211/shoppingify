export const addShoppingItem = (body) =>
  fetch("/api/shoppingItems", { method: "POST", body: JSON.stringify(body) });
