import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import NavBar, { NavBtn } from "../components/Navbar";
import { useCategories, useLinks, useModal } from "../context/ContextProvider";
import useClipboard from "../hooks/useClipboard";

export default function AllLinksPage() {
  const { links, getTextOfLinks, getLinksByCategoryId } = useLinks();
  const { categories } = useCategories();
  const { status, copy } = useClipboard(5000);
  const navigate = useNavigate();
  const { showAddLink, showAddCategory } = useModal();
  return (
    <>
      <NavBar>
        <NavBtn click={showAddLink}>Add Link</NavBtn>
        <NavBtn variant="outline-light" click={showAddCategory}>
          Add Category
        </NavBtn>
        {links.length && (
          <NavBtn click={() => copy(getTextOfLinks(links))}>
            {status ? "Copied!" : "Copy Links"}
          </NavBtn>
        )}
      </NavBar>
      <Container className="my-3">
        {categories.map(({ name, id, theme }) => {
          const links = getLinksByCategoryId(id);
          return (
            <div key={id}>
              <div className="d-flex justify-content-between">
                <h3 className="m-0">{name}</h3>
                <ButtonGroup>
                  <Button
                    variant={theme}
                    onClick={() => showAddLink({ categoryId: id })}
                  >
                    Add Link
                  </Button>
                  <Button
                    variant={`outline-${theme}`}
                    onClick={() => navigate(`/categories/${id}`)}
                  >
                    View
                  </Button>
                </ButtonGroup>
              </div>
              <hr className="m-2" />
              {links.length ? (
                <Row>
                  {links.map((link) => {
                    return (
                      <LinkCard key={link.id} theme={theme} linkData={link} />
                    );
                  })}
                </Row>
              ) : (
                <h4>No Links</h4>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
}
