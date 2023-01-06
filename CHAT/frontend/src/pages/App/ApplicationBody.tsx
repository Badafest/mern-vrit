import { useContext } from "react";
import { ApplicationContext } from "../../context/Application";
import { IConversation } from "../App";

interface IApplicationBodyProps {
  conversation: IConversation | undefined;
}

export default function ApplicationBody({
  conversation,
}: IApplicationBodyProps) {
  return (
    <div className="flex-grow bg-gray-600 flex flex-col px-2 gap-2">
      {conversation ? (
        <>
          <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
            <div>{conversation.name}</div>
            <div className="text-sm text-gray-300">
              {conversation.members.length} members
            </div>
          </header>

          <NewMessageForm />
        </>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          Select a conversation to begin chatting
        </div>
      )}
    </div>
  );
}

const NewMessageForm = () => {
  const { newMessage, setNewMessage, sendNewMessage } =
    useContext(ApplicationContext);
  return (
    <form
      className="bg-gray-700 rounded-t p-2 flex gap-2 items-end"
      onSubmit={sendNewMessage}
    >
      <div className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
        <span className="mui_icon">image</span>
      </div>
      <textarea
        className="w-full rounded bg-gray-600 px-4 py-2 outline-none focus:bg-gray-800 resize-none max-h-48 overflow-auto"
        rows={Array.from((newMessage || "").matchAll(/\n/g)).length + 1}
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            sendNewMessage(event);
          }
        }}
      />
      <button
        type="submit"
        className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800"
      >
        <span className="mui_icon">send</span>
      </button>
    </form>
  );
};
