import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import useClipboard from "../../hooks/useClipboard";
import {
  useLinks,
  useCategories,
  useUtility,
} from "../../context/ContextProvider";

export default function AddLinkModal({ show, handleClose, defaultValues }) {
  const titleRef = useRef();
  const urlRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const isEdit = !!defaultValues?.id;
  const { categories, generalCategoryId } = useCategories();
  const { readClipboard, value } = useClipboard();
  const { addLink, updateLink } = useLinks();
  const { isURL, showToast } = useUtility();
  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value,
      url = urlRef.current.value,
      description = descriptionRef.current.value,
      categoryId = categoryRef.current.value;
    if (!isURL(url)) return showToast("invalid URL");
    const data = { title, url, description, categoryId };
    isEdit ? updateLink(defaultValues.id, data) : addLink(data);
    handleClose();
  }

  return (
    <Modal show={show}>
      <Modal.Header>{isEdit ? "Edit" : "Add"} Link</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="linkTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              autoComplete="off"
              ref={titleRef}
              type="text"
              placeholder="Enter Title"
              defaultValue={defaultValues?.title || ""}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="linkURL">
            <Form.Label>URL</Form.Label>
            <Form.Control
              autoComplete="off"
              ref={urlRef}
              type="text"
              onFocus={() =>
                isURL(readClipboard()) && (urlRef.current.value = value)
              }
              defaultValue={defaultValues?.url || ""}
              placeholder="Enter URL"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="linkDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              defaultValue={defaultValues?.description || ""}
              ref={descriptionRef}
              placeholder="Enter Description"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="linkCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              ref={categoryRef}
              defaultValue={defaultValues?.categoryId || generalCategoryId}
              aria-label="Default select example"
              required
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button onClick={handleClose} variant="outline-secondary">
              Close
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Edit" : "Add"} Link
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
