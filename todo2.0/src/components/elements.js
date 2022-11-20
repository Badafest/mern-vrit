import { useEffect, useState } from "react";
import fromNow from "../functions/fromNow";

const Input = ({ label, ...rest }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ margin: "6px 8px" }}>{label}</label>
      <input {...rest} />
    </div>
  );
};

const TimeAgo = ({ thenTime }) => {
  const [timeAgo, setTimeAgo] = useState(fromNow(thenTime));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo((_) => fromNow(thenTime));
    }, 1000);

    return () => clearInterval(interval);
  });
  return <span className="meta-tag">{`🕒 ${timeAgo}`}</span>;
};

export { Input, TimeAgo };
