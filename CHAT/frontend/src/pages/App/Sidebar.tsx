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
}: ISidebarProps) {
  return (
    <div className="w-1/3 max-w-sm flex flex-col gap-2">
      <header className="mx-4 border-b border-gray-500 py-2 px-4 text-center text-lg">
        Chat App
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
            <div className="rounded-full w-3 h-3 border-2 flex-shrink-0 bg-green-500"></div>
          </div>
        ))}
      </main>
    </div>
  );
}
