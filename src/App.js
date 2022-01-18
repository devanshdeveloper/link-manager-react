import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLinks } from "./context/ContextProvider";
import AllLinksPage from "./pages/AllLinksPage";
import CategoriesPage from "./pages/CategoriesPage";
import LinkPage from "./pages/LinkPage";
import LinksPage from "./pages/LinksPage";
import { getMilliSeconds } from "./utility";

export default function App() {
  const { links, openLink } = useLinks();
  useEffect(() => {
    let timeoutArr = [];
    links.forEach((e) => {
      if (!e.timeAsNumbers) return;
      const ms = getMilliSeconds(e.timeAsNumbers);
      if (ms > 0) timeoutArr.push(setTimeout(() => openLink(e.id), ms));
    });
    return () => timeoutArr.forEach(clearTimeout);
  }, [links, openLink]);

  return (
    <Routes>
      <Route path="/categories" exact element={<CategoriesPage />} />
      <Route path="/categories/:id" exact element={<LinksPage />} />
      <Route path="/links" exact element={<AllLinksPage />} />
      <Route path="/links/:id" exact element={<LinkPage />} />
      <Route path="*" exact element={<Navigate to="/links" />} />
    </Routes>
  );
}
