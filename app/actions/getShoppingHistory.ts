export const getShoppingHistory = async (id) => {
  const response = await fetch("/api/shoppingHistory/" + id, {
    method: "GET",
  });
  if (!response.ok) throw new Error();
  return response.json();
};
