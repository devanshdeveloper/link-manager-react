import { Container, Row } from "react-bootstrap";
import Category from "../components/Category";
import { useModal, useCategories } from "../context/ContextProvider";
import NavBar, { NavBtn } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const { categories } = useCategories();
  const navigate = useNavigate();
  const { showAddLink, showAddCategory } = useModal();
  return (
    <>
      <NavBar>
        <NavBtn click={showAddLink}>Add Link</NavBtn>
        <NavBtn variant="outline-light" click={showAddCategory}>
          Add Category
        </NavBtn>
        <NavBtn click={() => navigate("/links")}>All links</NavBtn>
      </NavBar>
      <Container className="my-3">
        <h1>Categories</h1>
        <Row>
          {categories.map((category) => (
            <Category key={category.id} categoryData={category} />
          ))}
        </Row>
      </Container>
    </>
  );
}
