import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { useLinks, useUtility } from "./ContextProvider";

export const CategoryContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const { showToast } = useUtility();
  const { deleteLinksByCategoryId } = useLinks();
  const [categories, setCategories] = useLocalStorage("categories", [
    {
      id: "29f1e812-e11c-4305-bf38-43a593ab3647",
      name: "General",
      theme: "dark",
      description: "General Links",
    },
    {
      id: "d5c85668-6bc3-43c2-a0e5-180e38a3a616",
      name: "School Ki Katha",
      theme: "primary",
      description: "School Ki Links are here",
    },
    {
      id: "15176173-a174-443b-aa00-3891430c3b3c",
      name: "Coaching ka Rasta",
      theme: "danger",
      description: "Hamara Coaching ka rasta is here",
    },
    {
      id: "57ba9ee8-1066-414f-99d9-54c2afbbc136",
      name: "Bollywood",
      theme: "secondary",
      description: "Hamara Coaching ka rasta is here",
    },
    {
      id: "38e6ee73-9a5f-4d95-a83e-47c4e9a2a24d",
      name: "random",
      theme: "secondary",
      description: "Sabki Coaching ka rasta is here",
    },
  ]);
  const dataValue = {
    categories,
    generalCategoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
    getCategoryById(id) {
      return categories.find((category) => category.id === id);
    },
    addCategory(category) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: uuidV4(), ...category },
      ]);
      showToast("Category Added : " + category.name);
    },
    updateCategory(id, category) {
      setCategories((prevCategories) =>
        prevCategories.map((prevCategory) =>
          prevCategory.id === id
            ? { ...prevCategory, ...category }
            : prevCategory
        )
      );
      showToast("Category Updated : " + category.name);
    },
    deleteCategory(id) {
      setCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory.id !== id)
      );
      deleteLinksByCategoryId(id);
      showToast("Category Deleted");
    },
  };
  return (
    <CategoryContext.Provider value={dataValue}>
      {children}
    </CategoryContext.Provider>
  );
};
