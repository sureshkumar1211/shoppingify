export const getAllCategories = async () => {
  const response = await fetch("/api/categories", { method: "GET" });
  if (!response.ok) throw new Error();
  return response.json();
};
