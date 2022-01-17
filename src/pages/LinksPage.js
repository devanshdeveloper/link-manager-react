import { Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import { useCategories, useLinks, useModal } from "../context/ContextProvider";
import NavBar, { NavBtn } from "../components/Navbar";
import useClipboard from "../hooks/useClipboard";
import { useEffect } from "react";
export default function LinksPage() {
  const { id } = useParams();
  const { getCategoryById, deleteCategory, generalCategoryId } =
    useCategories();
  const { getLinksByCategoryId, getTextOfLinks } = useLinks();
  const { showAddLink, confirmModal, showAddCategory } = useModal();
  const links = getLinksByCategoryId(id);
  const category = getCategoryById(id);
  const navigate = useNavigate();
  const { status, copy } = useClipboard(5000);
  function handleDeleteCategory() {
    confirmModal({
      title: "Delete Category",
      body: "Are you sure you want to delete this category?",
      btnText: "Delete",
      btnVariant: "danger",
      onSuccess() {
        navigate(-1);
        deleteCategory(id);
      },
    });
  }

  useEffect(() => {
    if (!category) navigate(-1);
  }, [category, navigate]);

  if (!category) {
    return null;
  } else
    return (
      <>
        <NavBar>
          <NavBtn click={() => showAddLink({ categoryId: id })}>
            Add Link
          </NavBtn>
          {links.length && (
            <NavBtn click={() => copy(getTextOfLinks(links))}>
              {status ? "Copied!" : "Copy Links"}
            </NavBtn>
          )}
          {id !== generalCategoryId && (
            <>
              <NavBtn click={() => showAddCategory(category)}>
                Edit Category
              </NavBtn>
              <NavBtn variant="danger" click={handleDeleteCategory}>
                Delete Category
              </NavBtn>
            </>
          )}
        </NavBar>
        <Container className="my-3">
          <h3>Links : {category.name}</h3>
          <Row>
            {links.length ? (
              links.map((link) => (
                <LinkCard
                  theme={category.theme}
                  key={link.id}
                  linkData={link}
                />
              ))
            ) : (
              <h4>No Links</h4>
            )}
          </Row>
        </Container>
      </>
    );
}
