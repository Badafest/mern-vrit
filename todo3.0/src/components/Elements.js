import React, { forwardRef } from "react";

export const LabeledInput = forwardRef(({ id, label, value }, ref) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "12px",
    }}
  >
    <label htmlFor={id} style={{ marginLeft: "6px" }}>
      {label}
    </label>
    <input
      name={id}
      id={id}
      value={value}
      ref={ref}
      style={{
        padding: "6px 12px",
        outline: "none",
        border: "1px solid #ADD8E6",
        borderBottom: "3px solid #ADD8E6",
        borderRadius: "8px",
      }}
    />
  </div>
));

export const IconButton = ({ text, icon, onClick }) => (
  <button
    onClick={onClick}
    style={{
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      gap: "6px",
    }}
  >
    {icon && <img src={icon} style={{ width: "20px", height: "20px" }} />}
    {text && (
      <span style={{ color: "inherit", textAlign: "center", width: "100%" }}>
        {text}
      </span>
    )}
  </button>
);

const ModalTitle = ({ title, closeModal }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1.1em",
    }}
  >
    <span>{title}</span>
    <IconButton text="🗙" onClick={closeModal} />
  </div>
);

const ModalButton = ({ onConfirm }) => (
  <IconButton
    text="Confirm"
    onClick={() => {
      onConfirm();
    }}
  />
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
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        display: "flex",
        margin: "24px",
        padding: "24px",
        borderRadius: "12px",
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        maxWidth: "512px",
        marginLeft: "50%",
        transform: "translate(-50%,0)",
      }}
    >
      <ModalTitle title={title} closeModal={closeModal} />
      <div>{description}</div>
      <div>{rest.children}</div>
      {onConfirm ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "18px",
          }}
        >
          <ModalButton onConfirm={onConfirm} />
        </div>
      ) : null}
    </div>
  </div>
);
