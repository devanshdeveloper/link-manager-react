import { Toast, ToastContainer } from "react-bootstrap";

export default function MessageBox({ title, message, show, onHide }) {
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast onClose={onHide} bg="dark" show={show} delay={8000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
          <small className="text-muted">Just Now</small>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
