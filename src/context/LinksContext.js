import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useUtility } from "./ContextProvider";
import { getRandomId, timeToArray } from "../utility";
export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const { getIcon, showToast } = useUtility();
  const [links, setLinks] = useLocalStorage("links", [
    {
      id: getRandomId(30),
      title: "Google",
      timeAsNumbers: null,
      time: "",
      url: "http://google.com/",
      taps: 0,
      icon: "",
      categoryId: "29f1e812-e11c-4305-bf38-43a593ab3647",
    },
  ]);
  const dataValue = {
    links,
    openLink(id) {
      const link = links.find((link) => link.id === id);
      if (link) {
        link.taps++;
        setLinks([...links]);
        console.log(id);
        window.open(link.url, "blank");
      }
    },
    getTextOfLinks(links) {
      return links.map((e) => `${e.title}\n${e.url}`).join("\n\n");
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
        {
          ...link,
          id: getRandomId(30),
          taps: 0,
          icon: getIcon(link.url),
          timeAsNumbers: timeToArray(link.time),
        },
      ]);
      showToast("Link Added : " + link.title);
    },
    updateLink(id, data) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id
            ? {
                ...link,
                ...data,
                timeAsNumbers: timeToArray(data.time),
                icon: getIcon(data.url),
                taps: link.url === data.url ? link.taps : 0,
              }
            : link
        )
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
// [{"id":"29f1e812-e11c-4305-bf38-43a593ab3647","name":"General","theme":"dark","description":"General Links"},{"id":"CwvdTOKBy8h6d1emWUNZqI2IkOmvzB","name":"School Ka Rasta ","description":"Me school yaha se jaata hu","theme":"success"}]
// [{"id":"zalxY7YIfUmXJTEyXOE5WHESxmQVCv","title":"Google","timeAsNumbers":null,"time":"","url":"http://google.com/","taps":1,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=http://google.com/","categoryId":"29f1e812-e11c-4305-bf38-43a593ab3647"},{"title":"Instagram","url":"https://www.instagram.com","time":"","categoryId":"29f1e812-e11c-4305-bf38-43a593ab3647","id":"R5RvyIsD6SFPb5lFe25UFfzcYeGLWZ","taps":0,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.instagram.com","timeAsNumbers":null},{"title":"Youtube","url":"https://www.youtube.com","time":"","categoryId":"29f1e812-e11c-4305-bf38-43a593ab3647","id":"amyBgBaoMl49sg0bH4KF33wa5Bk55d","taps":0,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.youtube.com","timeAsNumbers":null},{"title":"Economics","url":"https://us04web.zoom.us/j/4595213059?pwd=ZEppK3YwUU5UN2JYVnNmWGMySXcwZz09","time":"09:00","categoryId":"CwvdTOKBy8h6d1emWUNZqI2IkOmvzB","id":"Oc82K6lgNd6piAiZuSCKrhjQzYNcjd","taps":0,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=https://zoom.us","timeAsNumbers":[9,0]},{"title":"Maths","url":"https://us05web.zoom.us/j/86002445511?pwd=MloyQ0lGUTBUejBTcWpUVlQzSWdOUT09","time":"09:50","categoryId":"CwvdTOKBy8h6d1emWUNZqI2IkOmvzB","id":"tYKGBbA5i4kA5XEA5SvNeuICAreE9l","taps":2,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=https://zoom.us","timeAsNumbers":[9,50]},{"title":"English","url":"https://us04web.zoom.us/j/77295357372?pwd=MFVCcXpTUDlXSHpmYmNmSEtwWGdhZz09","time":"10:40","categoryId":"CwvdTOKBy8h6d1emWUNZqI2IkOmvzB","id":"6etFtinKj1y3o2ZycCYjdgfum5ILnE","taps":0,"icon":"https://s2.googleusercontent.com/s2/favicons?domain_url=https://zoom.us","timeAsNumbers":[10,40]}]
