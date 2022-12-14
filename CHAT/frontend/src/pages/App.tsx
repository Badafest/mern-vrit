import { useContext, useState } from "react";
import { ConversationsContext } from "../context/Conversations";

import Sidebar from "./App/Sidebar";
import ApplicationBody from "./App/ApplicationBody";
import ApplicationProvider from "../context/Application";

export interface IConversation {
  _id: string;
  members: [
    {
      name: string;
      _id: string;
    }
  ];
  name: string;
  admin: string;
  requests: [
    {
      name: string;
      _id: string;
    }
  ];
}

export interface IMessage {
  _id?: string;
  type: string;
  message: string;
  from_id?: string;
  conversation_id?: string;
  createdAt?: string;
}

export default function App() {
  const { conversations } = useContext(ConversationsContext);
  const [active, setActive] = useState("");

  const handleClickConversation = (_id: string) => {
    setActive((_) => _id);
  };

  return (
    <div className="flex w-full min-h-screen text-white bg-gray-700 overflow-y-hidden">
      <Sidebar
        {...{
          active,
          handleClickConversation,
        }}
      />
      <ApplicationProvider
        conversation={(conversations || []).find((item) => item._id === active)}
      >
        <ApplicationBody />
      </ApplicationProvider>
    </div>
  );
}
