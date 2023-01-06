import { FC, MouseEventHandler, PropsWithChildren } from "react";

interface IToastProps extends PropsWithChildren {
  message?: string;
  onClose?: MouseEventHandler;
  type?: "danger" | "success" | "basic";
}

export default function Toast({
  message = "Message",
  onClose = async () => {},
  type = "basic",
  ...rest
}: IToastProps) {
  return (
    <div
      className={`bg-white rounded p-2 flex flex-col max-w-md ${
        type === "danger"
          ? "text-red-700"
          : type === "success"
          ? "text-green-700"
          : "text-blue-700"
      }`}
    >
      <div className="flex justify-between items-center px-2 gap-8 py-2 text-lg border-b-2 border-gray-300">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="bg-red-800 hover:bg-red-700 active:bg-red-900 text-white mui_icon rounded-full w-8 h-8"
        >
          close
        </button>
      </div>
      <div className="m-2">{rest.children}</div>
    </div>
  );
}
