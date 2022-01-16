import { useCategories, useLinks, useModal } from "../context/ContextProvider";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavBar, { NavBtn } from "../components/Navbar";
import useClipboard from "../hooks/useClipboard";

export default function LinkPage() {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLinkById, deleteLink, openLink } = useLinks();
  const { getCategoryById } = useCategories();
  const { copy, status } = useClipboard(5000);
  const { confirmModal, showAddLink } = useModal();
  const link = getLinkById(id);
  // const { title, taps, url, description, categoryId } = link;
  function handleDeleteLink() {
    confirmModal({
      title: "Delete Link",
      body: "Are you sure you want to delete this link?",
      onSuccess() {
        navigate(`/categories/${link?.categoryId || ""}`);
        deleteLink(id);
      },
      btnVariant: "danger",
      btnText: "Delete",
    });
  }
  if (!link) {
    return <Navigate to="/categories" />;
  } else
    return (
      <>
        <NavBar>
          <NavBtn click={() => copy(link.url)}>
            {status ? "Copied!" : "Copy Link"}
          </NavBtn>
          <NavBtn click={() => showAddLink(link)}>Edit</NavBtn>
          {navigator.share && (
            <NavBtn
              click={() =>
                navigator.share({ title: link.title, url: link.url })
              }
            >
              Share
            </NavBtn>
          )}
          <NavBtn click={handleDeleteLink} variant="danger">
            Delete
          </NavBtn>
        </NavBar>
        <Container>
          <div className="d-flex justify-content-between mt-3">
            <h2>Category : {getCategoryById(link.categoryId).name}</h2>
            <h5 className="my-1">Taps : {link.taps}</h5>
          </div>
          <h3>{link.title}</h3>
          <span
            className="fs-5 text-underline-hover"
            onClick={() => openLink(id)}
          >
            {link.url}
          </span>
          <p className="fs-4">{link.description}</p>
        </Container>
      </>
    );
}
