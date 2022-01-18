import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLinks } from "../context/ContextProvider";
import Box from "./Box";

export default function LinkCard({ linkData, theme }) {
  const { openLink } = useLinks();
  const navigate = useNavigate();
  const { id, title, url, icon, taps, time } = linkData;
  return (
    <Box
      theme={theme || "primary"}
      title={
        <div>
          <img
            src={icon}
            alt={title}
            style={{ height: "25px", marginRight: "8px", width: "25px" }}
          />
          <span>{title}</span>
        </div>
      }
      sideText={time ? `Taps: ${taps} | ${time}` : `Taps: ${taps}`}
      text={url}
      onTextClick={() => openLink(id)}
      textClasses="text-truncate my-1 text-muted text-underline-hover cursor-pointer"
    >
      {navigator.share && (
        <Button variant={theme} onClick={() => navigator.share({ title, url })}>
          Share
        </Button>
      )}
      <Button
        variant={`outline-${theme}`}
        onClick={() => navigate(`/links/${id}`)}
      >
        View
      </Button>
    </Box>
  );
}
