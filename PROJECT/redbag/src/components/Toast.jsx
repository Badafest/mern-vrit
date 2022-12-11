export default function Toast({ message, type, onClose }) {
  return (
    <div
      className={`mb-4 px-4 py-2 rounded-lg z-10 text-light flex justify-between items-center text-sm ${
        type === "error" ? "bg-red-700" : "bg-green-700"
      }`}
    >
      <span>{message}</span>
      <button className="icon" onClick={onClose}>
        close
      </button>
    </div>
  );
}
