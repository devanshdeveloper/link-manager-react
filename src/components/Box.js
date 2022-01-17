import { ButtonGroup, Card, Col } from "react-bootstrap";

export default function Box({
  theme,
  textClasses,
  onTextClick,
  title,
  text,
  sideText,
  children,
}) {
  return (
    <Col className="my-3" lg={4} md={6} sm={12}>
      <Card className="rounded" border={theme}>
        <Card.Header
          className={`bg-${theme} justify-content-between d-flex text-white`}
          style={{ height: "40px" }}
        >
          <Card.Title>{title}</Card.Title>
          <small>{sideText}</small>
        </Card.Header>
        <Card.Body>
          <Card.Text
            className={textClasses + " fs-5 mb-2"}
            onClick={onTextClick}
          >
            {text}
          </Card.Text>
          <ButtonGroup>{children}</ButtonGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
