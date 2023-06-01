export const getShoppingItem = ([id]) =>
  fetch("/api/shoppingItems/" + id, { method: "GET" });
