const TimeDisplay = ({ id, value }) => {
  return (
    <span className="display" id={id}>
      {value}
    </span>
  );
};

const TimeSeparator = () => <span className="timer-separator">:</span>;

const IconButton = ({ icon, text, ...rest }) => (
  <button {...rest}>
    <img className="btn-icon" src={icon} alt={text} />
    <span className="btn-text" style={{ marginLeft: "0.25em" }}>
      {text}
    </span>
  </button>
);

export { TimeDisplay, TimeSeparator, IconButton };
