import { Button, ButtonGroup, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLinks, useModal } from "../context/ContextProvider";

export default function Category({ categoryData }) {
  const { showAddLink } = useModal();
  const { getTapsOfLinks } = useLinks();
  const navigate = useNavigate();
  const { name, id, theme, description } = categoryData;
  return (
    <Col className="my-3" lg={4} md={6} sm={12}>
      <Card border={theme}>
        <Card.Header
          className={`bg-${theme} justify-content-between d-flex text-white`}
          style={{ height: "40px" }}
        >
          <p>{name}</p>
          <small>Taps: {getTapsOfLinks(id)}</small>
        </Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <ButtonGroup>
            <Button
              onClick={() => navigate(`/categories/${id}`)}
              variant={theme}
            >
              View Links
            </Button>
            <Button
              onClick={() => showAddLink({ categoryId: id })}
              variant={theme}
            >
              Add Link
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
