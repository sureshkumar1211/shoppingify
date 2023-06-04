export const addShoppingHistory = (body) =>
  fetch("/api/shoppingHistory", { method: "POST", body: JSON.stringify(body) });
