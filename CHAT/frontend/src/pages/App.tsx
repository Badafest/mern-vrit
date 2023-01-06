import { useContext, useState } from "react";
import { ConversationsContext } from "../context/Conversations";

import Sidebar from "./App/Sidebar";
import ApplicationBody from "./App/ApplicationBody";

export interface IConversation {
  _id: string;
  members: [
    {
      name: string;
      _id: string;
    }
  ];
  name: string;
}

export interface IMessage {
  type: string;
  message: string;
  from_id: string;
  conversation_id: string;
  createdAt: string;
}

export default function App() {
  const { conversations, addConversation } = useContext(ConversationsContext);
  const [active, setActive] = useState("");

  const handleClickConversation = (_id: string) => {
    setActive((_) => _id);
  };

  return (
    <div className="flex w-full min-h-screen text-white bg-gray-700">
      <Sidebar
        {...{
          conversations: conversations,
          active,
          handleClickConversation,
          addConversation: addConversation,
        }}
      />
      <ApplicationBody
        conversation={(conversations || []).find((item) => item._id === active)}
      />
    </div>
  );
}
