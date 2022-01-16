import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import LinkPage from "./pages/LinkPage";
import LinksPage from "./pages/LinksPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/categories" />} />
      <Route path="/categories" exact element={<CategoriesPage />} />
      <Route path="/categories/:id" exact element={<LinksPage />} />
      <Route path="/links/:id" exact element={<LinkPage />} />
    </Routes>
  );
}
