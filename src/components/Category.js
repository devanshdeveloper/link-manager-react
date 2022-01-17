import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLinks, useModal } from "../context/ContextProvider";
import Box from "./Box";

export default function Category({ categoryData }) {
  const { getTapsOfLinks } = useLinks();
  const navigate = useNavigate();
  const { name, id, theme, description } = categoryData;
  const { showAddLink } = useModal();
  return (
    <Box
      theme={theme}
      title={name}
      text={description}
      sideText={`Taps: ${getTapsOfLinks(id)}`}
      textClasses=""
    >
      <Button onClick={() => showAddLink({ categoryId: id })} variant={theme}>
        Add Link
      </Button>
      <Button
        onClick={() => navigate(`/categories/${id}`)}
        variant={`outline-${theme}`}
      >
        View Links
      </Button>
    </Box>
  );
}
