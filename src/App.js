import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AllLinksPage from "./pages/AllLinksPage";
import CategoriesPage from "./pages/CategoriesPage";
import LinkPage from "./pages/LinkPage";
import LinksPage from "./pages/LinksPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/links" />} />
      <Route path="/categories" exact element={<CategoriesPage />} />
      <Route path="/categories/:id" exact element={<LinksPage />} />
      <Route path="/links" exact element={<AllLinksPage />} />
      <Route path="/links/:id" exact element={<LinkPage />} />
    </Routes>
  );
}
