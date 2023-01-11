import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IConversation } from "../App";

interface ISidebarProps {
  conversations: IConversation[];
  active: string;
  handleClickConversation: (_id: string) => void;
  addConversation: (name: string) => void;
}

export default function Sidebar({
  conversations,
  active,
  handleClickConversation,
  addConversation,
}: ISidebarProps) {
  const newConversation = useRef<HTMLInputElement>(null);

  const handleAddConversation = () => {
    if (newConversation.current?.value.length)
      addConversation(newConversation.current?.value);
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-1/3 max-w-sm min-w-full md:min-w-max flex flex-col gap-2">
      <header className="mx-4 border-b border-gray-500 py-2 px-4 flex justify-between items-center text-lg">
        <span>Chat App</span>
        <div className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
          <span className="mui_icon" onClick={handleLogOut}>
            logout
          </span>
        </div>
      </header>
      <main className="flex flex-col gap-1">
        {conversations.map((conversation, index) => (
          <div
            className={`m-2 rounded cursor-pointer py-2 px-4 flex items-center justify-between hover:bg-gray-600 active:bg-gray-800 ${
              active === conversation._id ? "bg-gray-600" : ""
            }`}
            key={index}
            onClick={() => {
              handleClickConversation(conversation._id);
            }}
          >
            <div className="rounded-full w-10 h-10 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-800 text-2xl">
              {conversation?.name[0]}
            </div>
            <div className="flex-grow px-4">{conversation?.name}</div>
          </div>
        ))}
        <form
          className="px-4 border-t border-gray-500 pt-4"
          onSubmit={handleAddConversation}
        >
          <label htmlFor="new-conversation">New Conversation</label>
          <div className="flex justify-between items-center gap-2">
            <input
              id="new-conversation"
              name="new-conversation"
              className="bg-gray-600 rounded px-4 py-2 flex-grow outline-none focus:bg-gray-800"
              ref={newConversation}
            />
            <button className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
              <span className="mui_icon">add</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
