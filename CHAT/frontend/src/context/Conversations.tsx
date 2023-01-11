import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IConversation } from "../pages/App";
import axios from "../config/axios";

export interface IConversationContext {
  conversations: IConversation[];
  addConversation: (name: string) => Promise<void>;
  searchConversations: (query: string) => void;
  requestAddToConversation: (conversation: string) => Promise<void>;
  addMemberToConversation: (
    member_id: string,
    conversation_name: string
  ) => Promise<void>;
}

export const ConversationsContext = createContext<IConversationContext>({
  conversations: [],
  addConversation: async (_: string) => {},
  searchConversations: async (_: string) => {},
  requestAddToConversation: async (_: string) => {},
  addMemberToConversation: async (_1: string, _2: string) => {},
});

export const ConversationsProvider = ({ children }: PropsWithChildren) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [allConversations, setAllConversations] = useState<IConversation[]>([]);

  const getAllConversations = async () => {
    const { data } = (await axios.get(`/conversation`)) as {
      data: { conversations: IConversation[] };
    };
    setAllConversations(data.conversations);
    setConversations(data.conversations);
  };

  const searchConversations = (query: string = "") => {
    if (query.length) {
      const matched = allConversations.filter((item) =>
        item.name.match(new RegExp(query))
      );
      setConversations(matched);
    } else {
      setConversations(allConversations);
    }
  };

  const addConversation = async (name: string) => {
    await axios.post("/conversation", { name });
    getAllConversations();
  };

  const requestAddToConversation = async (conversation: string) => {
    await axios.post("/conversation/request", {
      conversation_name: conversation,
    });
    getAllConversations();
  };

  const addMemberToConversation = async (
    member_id: string,
    conversation_name: string
  ) => {
    await axios.post("/conversation/add", { member_id, conversation_name });
    getAllConversations();
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        addConversation,
        searchConversations,
        requestAddToConversation,
        addMemberToConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
