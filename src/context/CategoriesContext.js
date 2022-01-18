import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getRandomId } from "../utility";
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
        { id: getRandomId(30), ...category },
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
