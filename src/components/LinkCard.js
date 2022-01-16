import { Card, Button, ButtonGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLinks } from "../context/ContextProvider";

export default function LinkCard({ linkData }) {
  const { openLink } = useLinks();
  const navigate = useNavigate();
  const { id, title, url, icon, taps, description } = linkData;

  return (
    <Col className="my-3" lg={4} md={6} sm={12}>
      <Card className="rounded">
        <Card.Body>
          <Card.Title
            className="d-flex justify-content-between"
            style={{ height: "25px" }}
          >
            <div>
              <img 
                src={icon}
                alt={title}
                style={{ height: "28px", margin: "4px", width: "28px" }}
              />
              <span>{title}</span>
            </div>
            <small className="text-muted">Taps : {taps}</small>
          </Card.Title>
          <Card.Subtitle
            onClick={() => openLink(id)}
            className="my-1 text-muted text-underline-hover"
            style={{ cursor: "pointer" }}
          >
            {url}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <ButtonGroup>
            {navigator.share && (
              <Button onClick={() => navigator.share({ title, url })}>
                Share
              </Button>
            )}
            <Button
              variant="outline-primary"
              onClick={() => navigate(`/links/${id}`)}
            >
              View
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
