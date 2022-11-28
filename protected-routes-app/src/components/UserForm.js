import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

function UserForm({ user, handleChange, handleSubmit, btnTxt = "Submit" }) {
  const [toast, setToast] = useState("");

  const onSubmitFunction = (event) => {
    setToast("");
    try {
      handleSubmit(event);
    } catch (err) {
      setToast(err.message || "Oops! Something went wrong.");
    }
  };

  return (
    <div className="container mt-4">
      <Toast
        onClose={() => setToast("")}
        show={toast.length > 0}
        delay={3000}
        autohide
      >
        <Toast.Header className="d-flex justify-content-between">
          <strong>:(</strong>
        </Toast.Header>
        <Toast.Body>{toast}</Toast.Body>
      </Toast>

      <Form onSubmit={onSubmitFunction}>
        <Form.Group className="mb-3 text-left" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            {btnTxt}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserForm;
