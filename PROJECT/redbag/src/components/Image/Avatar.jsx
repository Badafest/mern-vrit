export default function ({ initial, size = 128 }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${0.7 * size}px`,
      }}
      className="rounded-full bg-secondary text-light  flex justify-center items-center"
    >
      <span>{initial}</span>
    </div>
  );
}
