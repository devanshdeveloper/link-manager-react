import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { useUtility } from "./ContextProvider";
export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const { showToast } = useUtility();
  const [links, setLinks] = useLocalStorage("links", [
    {
      id: "e4eab3bd-80d7-4d3a-af13-0a29508b6ff8",
      title: "Google",
      url: "https://google.com",
      description: "Search Engine",
      categoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
      taps: 0,
    },
    {
      id: "ec1d5074-a7e7-43bf-9094-530cc440082e",
      title: "Google",
      url: "https://google.com",
      description: "Search Engine",
      categoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
      taps: 0,
    },
    {
      id: "31c1a0e4-7f81-4aff-b635-d8a07596c42c",
      title: "Google",
      url: "https://google.com",
      description: "Search Engine",
      categoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
      taps: 0,
    },
    {
      id: "c719daa5-2cbe-47ba-bf4a-2478ee2a7c6b",
      title: "Google",
      url: "https://google.com",
      description: "Search Engine",
      categoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
      taps: 0,
    },
  ]);
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
        .map((e) => `${e.title}\n${e.url}\n${e.description}`)
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
      setLinks((prevLinks) => [...prevLinks, { id: uuidV4(), ...link }]);
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
