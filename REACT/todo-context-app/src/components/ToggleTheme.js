const ToggleTheme = ({ onClick, btnSrc }) => (
  <button onClick={onClick}>
    <img src={btnSrc} />
  </button>
);

export default ToggleTheme;
