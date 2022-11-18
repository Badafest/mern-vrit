import { useEffect } from "react";

function ToastMessage(props) {
  const { message, color = "blue", clearToast } = props;

  //useEffect without dependency array so that new timeout is created for each toast message
  useEffect(() => {
    const timeOut = setTimeout(clearToast, 500000);
    return () => clearTimeout(timeOut);
  });

  return (
    <div className="toast">
      <span className="toast-message" style={{ color }}>
        {message}
      </span>
      <button onClick={clearToast}>🗙</button>
    </div>
  );
}

export default ToastMessage;
