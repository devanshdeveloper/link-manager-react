import { Button, Modal } from "react-bootstrap";

export default function ConfirmationModal({ data }) {
  const { show, handleClose, btnText, btnVariant, onSuccess, title, body } =
    data;
  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={btnVariant || "primary"}
          onClick={() => {
            onSuccess();
            handleClose();
          }}
        >
          {btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
