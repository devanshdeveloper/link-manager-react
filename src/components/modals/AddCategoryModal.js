import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useCategories, useUtility } from "../../context/ContextProvider";

export default function AddCategoryModal({ show, handleClose, defaultValues }) {
  const nameRef = useRef();
  const themeRef = useRef();
  const descriptionRef = useRef();
  const { addCategory, updateCategory, generalCategoryId } = useCategories();
  const { themes } = useUtility();
  const isEdit = !!defaultValues?.id;
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      theme: themeRef.current.value,
    };
    isEdit ? updateCategory(defaultValues.id, data) : addCategory(data);
    handleClose();
  }
  return (
    <Modal show={show}>
      <Modal.Header>{isEdit ? "Edit" : "Add"} Category</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="categoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoComplete="off"
              ref={nameRef}
              type="text"
              placeholder="Enter Name"
              defaultValue={defaultValues?.name || ""}
              required
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              ref={descriptionRef}
              type="text"
              defaultValue={defaultValues?.description || ""}
              placeholder="Enter Description"
              required
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryTheme">
            <Form.Label>Theme</Form.Label>
            <Form.Select
              ref={themeRef}
              defaultValue={defaultValues?.theme || generalCategoryId}
              aria-label="Default select example"
              required
            >
              {themes.map((theme, i) => {
                return (
                  <option key={i} value={theme}>
                    {theme}
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
              {isEdit ? "Edit" : "Add"} Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
