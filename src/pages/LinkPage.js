import { useCategories, useLinks, useModal } from "../context/ContextProvider";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar, { NavBtn } from "../components/Navbar";
import useClipboard from "../hooks/useClipboard";

export default function LinkPage() {
  // hooks
  const { id } = useParams();
  const { getCategoryById } = useCategories();
  const { getLinkById, deleteLink, openLink } = useLinks();
  const { confirmModal, showAddLink } = useModal();
  const navigate = useNavigate();
  const { copy, status } = useClipboard(5000);
  const link = getLinkById(id);
  const { title, taps, url, description, categoryId } = link;
  const category = getCategoryById(categoryId);
  function handleDeleteLink() {
    confirmModal({
      title: "Delete Link",
      body: "Are you sure you want to delete this link?",
      onSuccess() {
        navigate(`/categories/${category.id}`);
        deleteLink(id);
      },
      btnVariant: "danger",
      btnText: "Delete",
    });
  }
  return (
    <>
      <NavBar>
        <NavBtn click={() => copy(url)}>
          {status ? "Copied!" : "Copy Link"}
        </NavBtn>
        <NavBtn click={() => showAddLink(link)}>Edit</NavBtn>
        {navigator.share && (
          <NavBtn click={() => navigator.share({ title, url })}>Share</NavBtn>
        )}
        <NavBtn click={handleDeleteLink} variant="danger">
          Delete
        </NavBtn>
      </NavBar>
      <Container>
        <div className="d-flex justify-content-between mt-3">
          <h2>Category : {category.name}</h2>
          <h5 className="my-1">Taps : {taps}</h5>
        </div>
        <h3>{title}</h3>
        <span
          className="fs-5 text-underline-hover"
          onClick={() => openLink(id)}
        >
          {url}
        </span>
        <p className="fs-4">{description}</p>
      </Container>
    </>
  );
}
