import React, { forwardRef } from "react";

export const LabeledInput = forwardRef(({ id, label, value }, ref) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input name={id} id={id} value={value} ref={ref} />
  </div>
));

export const IconButton = ({ text, icon, onClick }) => (
  <button className="icon-btn" onClick={onClick}>
    <img src={icon} />
    <span>{text}</span>
  </button>
);

const ModalTitle = ({ title, closeModal }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>{title}</span>
    <button onClick={closeModal}>❌</button>
  </div>
);

const ModalButton = ({ onConfirm }) => (
  <button
    onClick={() => {
      onConfirm();
    }}
  >
    Confirm
  </button>
);

export const Modal = ({
  title,
  description,
  onConfirm,
  closeModal,
  ...rest
}) => (
  <div
    style={{
      position: "absolute",
      top: "0",
      left: "0",
      height: "100vh",
      width: "100%",
      backdropFilter: "blur(12px)",
    }}
  >
    <ModalTitle title={title} closeModal={closeModal} />
    <div>{description}</div>
    <div>{rest.children}</div>
    {onConfirm ? (
      <div>
        <ModalButton onConfirm={onConfirm} />
      </div>
    ) : null}
  </div>
);
