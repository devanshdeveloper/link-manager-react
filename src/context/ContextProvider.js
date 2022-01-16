import { useContext } from "react";
import { CategoriesProvider, CategoryContext } from "./CategoriesContext";
import { LinksContext, LinksProvider } from "./LinksContext";
import { ModalContext, ModalProvider } from "./ModalContext";
import { UtilityProvider, UtilityContext } from "./UtilityContext";

// context hooks
export function useUtility() {
  return useContext(UtilityContext);
}
export function useCategories() {
  return useContext(CategoryContext);
}
export function useLinks() {
  return useContext(LinksContext);
}
export function useModal() {
  return useContext(ModalContext);
}
export default function ContextProvider({ children }) {
  return (
    <UtilityProvider>
      <LinksProvider>
        <CategoriesProvider>
          <ModalProvider>{children}</ModalProvider>
        </CategoriesProvider>
      </LinksProvider>
    </UtilityProvider>
  );
}
