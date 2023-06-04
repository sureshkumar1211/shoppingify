export const getShoppingHistories = async () => {
  const response = await fetch("/api/shoppingHistory", {
    method: "GET",
  });
  if (!response.ok) throw new Error();
  return response.json();
};
