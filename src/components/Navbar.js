import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBtn({ variant, children, click }) {
  return (
    <Button className="m-2" variant={variant || "primary"} onClick={click}>
      {children}
    </Button>
  );
}

export default function NavBar({ children }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to="/categories">
          <Navbar.Brand className="fs-3">Link Manager</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="Global-Navbar" />
        <Navbar.Collapse className="justify-content-end" id="Global-Navbar">
          {children}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
