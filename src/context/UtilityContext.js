import { createContext, useState } from "react";
import MessageBox from "../components/MessageBox";
export const UtilityContext = createContext();

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const UtilityProvider = ({ children }) => {
  const [showMessageBox, setShowMessageBox] = useState([false, null]);
  const dataValue = {
    showToast(message) {
      setShowMessageBox([true, message]);
    },
    getIcon(url) {
      if (url.includes("web.zoom.us")) url = "https://zoom.us";
      return `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
    },
    getDomain(url) {
      const host = new URL(url).hostname.split(".");
      return capitalize(host[host.length === 2 ? 0 : 1]);
    },
    isURL(str) {
      return !!new RegExp(
        "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
        "i"
      ).test(str);
    },
    themes: [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
    ],
  };
  return (
    <UtilityContext.Provider value={dataValue}>
      {children}
      <MessageBox
        title="Link Manager"
        message={showMessageBox[1]}
        show={showMessageBox[0]}
        onHide={() => setShowMessageBox([false, null])}
      />
    </UtilityContext.Provider>
  );
};
