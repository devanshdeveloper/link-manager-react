import { useState } from "react";
import { Navbar, Container, Button, Offcanvas, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBtn({ variant, children, click }) {
  return (
    <Button className="m-2" variant={variant || "primary"} onClick={click}>
      {children}
    </Button>
  );
}

export default function NavBar({ children }) {
  const [ShowSidebar, setShowSidebar] = useState(false);
  function handleSidebarClose() {
    setShowSidebar(false);
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Link to="/categories">
            <Navbar.Brand className="fs-3">Link Manager</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="Global-Navbar" />
          <Navbar.Collapse className="justify-content-end" id="Global-Navbar">
            {children}
            <NavBtn variant="success" click={() => setShowSidebar(true)}>
              {`<---`}
            </NavBtn>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={ShowSidebar} onHide={handleSidebarClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack direction="vertical" gap={2} className="text-center">
            <Link
              to="/categories"
              className="text-decoration-none text-black fs-5"
              onClick={handleSidebarClose}
            >
              Categories
            </Link>
            <Link
              to="/links"
              className="text-decoration-none text-black fs-5"
              onClick={handleSidebarClose}
            >
              Links
            </Link>
            <NavBtn
              click={() =>
                window.open(
                  "https://www.instagram.com/devansh.developer/",
                  "blank"
                )
              }
            >
              Meet Me
            </NavBtn>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
