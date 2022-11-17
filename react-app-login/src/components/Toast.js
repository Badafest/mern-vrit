import { useEffect } from "react";

function ToastMessage(props) {
  const { message, clearToast } = props;

  //useEffect without dependency array so that new timeout is created for each toast message
  useEffect(() => {
    const timeOut = setTimeout(clearToast, 5000);
    return () => clearTimeout(timeOut);
  });

  return (
    <div className="toast">
      <span className="toast-message">{message}</span>
      <button onClick={clearToast}>🗙</button>
    </div>
  );
}

export default ToastMessage;
