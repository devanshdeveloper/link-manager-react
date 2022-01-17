import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { useUtility } from "./ContextProvider";
export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const { getIcon, showToast } = useUtility();
  const [links, setLinks] = useLocalStorage("links", []);
  const dataValue = {
    links,
    openLink(id) {
      const link = links.find((link) => link.id === id);
      if (link) {
        link.taps++;
        setLinks([...links]);
        window.open(link.url, "blank");
      }
    },
    getTextOfLinks(links) {
      return links
        .map((e) => `${e.title}\n${e.url}`)
        .join("\n\n");
    },
    getLinksByCategoryId(id) {
      return links.filter((link) => link.categoryId === id);
    },
    getTapsOfLinks(categoryId) {
      return links
        .filter((link) => link.categoryId === categoryId)
        .reduce((acc, curr) => acc + curr.taps, 0);
    },
    getLinkById(id) {
      return links.find((link) => link.id === id);
    },
    addLink(link) {
      setLinks((prevLinks) => [
        ...prevLinks,
        { id: uuidV4(), taps: 0, icon: getIcon(link.url), ...link },
      ]);
      showToast("Link Added : " + link.title);
    },
    updateLink(id, data) {
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link.id === id ? { ...link, ...data } : link))
      );
      showToast("Link Updated : " + data.title);
    },
    deleteLink(id) {
      showToast("Link Deleted");
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    },
    deleteLinksByCategoryId(id) {
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.categoryId !== id)
      );
    },
  };
  return (
    <LinksContext.Provider value={dataValue}>{children}</LinksContext.Provider>
  );
};
