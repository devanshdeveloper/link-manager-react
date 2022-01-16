import { useState } from "react";

export default function useClipboard(timeout) {
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState();
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus(true))
      .catch((error) => {
        setStatus(false);
        console.error(error);
      });
    if (timeout) setTimeout(() => setStatus(false), timeout);
  }
  function readClipboard() {
    navigator.clipboard
      .readText()
      .then((text) => setValue(text))
      .catch((e) => {
        setValue(false);
        console.error(e);
      });
    if (timeout) setTimeout(() => setValue(false), timeout);
    return value;
  }
  return {
    readClipboard,
    copy: copyToClipboard,
    status,
    value,
  };
}
