import { useState } from "react";

export default function Modal({ title, onClose, onConfirm, ...rest }) {
  const [message, setMessage] = useState("");

  const confirmFunction = (event) => {
    try {
      onConfirm(event);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div
      className="container-child"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid var(--tertiary)",
        boxShadow: "var(--muted) 0 0 1em 1em",
      }}
    >
      {message.length > 0 ? (
        <div className="error-message">{message}</div>
      ) : (
        <></>
      )}
      <div className="container-child">
        <div className="list-item">
          <span
            style={{
              fontSize: "1.1rem",
              padding: "0.5em 1em",
              borderBottom: "1px solid var(--muted)",
            }}
          >
            {title}
          </span>
          <button className="danger-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="container-child">
          {rest?.children && rest.children}
          <button onClick={confirmFunction}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
