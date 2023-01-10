import { useContext } from "react";
import { ApplicationContext } from "../../context/Application";
import Messages from "./Messages";
import NewMessageForm from "./NewMessageForm";

export default function ApplicationBody() {
  const { conversation } = useContext(ApplicationContext);

  return (
    <div className="flex-grow bg-gray-600 flex flex-col px-2 gap-2 min-w-full md:min-w-max">
      {conversation ? (
        <>
          <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
            <div>{conversation.name}</div>
            <div className="text-sm text-gray-300">
              {conversation.members.length} members
            </div>
          </header>
          <Messages conversation={conversation} />
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
