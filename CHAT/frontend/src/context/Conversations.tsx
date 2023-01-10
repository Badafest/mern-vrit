import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IConversation } from "../pages/App";
import axios from "../config/axios";

export interface IConversationContext {
  conversations: IConversation[];
  addConversation: (name: string) => Promise<void>;
  addMemberToConversation: (
    member: string,
    conversation: string
  ) => Promise<void>;
}

export const ConversationsContext = createContext<IConversationContext>({
  conversations: [],
  addConversation: async (_: string) => {},
  addMemberToConversation: async (_1: string, _2: string) => {},
});

export const ConversationsProvider = ({ children }: PropsWithChildren) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const getAllConversations = async () => {
    const { data } = (await axios.get("/conversation")) as {
      data: { conversations: IConversation[] };
    };
    setConversations(data.conversations);
  };

  const addConversation = async (name: string) => {
    await axios.post("/conversation", { name });
    getAllConversations();
  };

  const addMemberToConversation = async (
    member: string,
    conversation: string
  ) => {
    await axios.post("/conversation/add", { member, conversation });
    getAllConversations();
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <ConversationsContext.Provider
      value={{ conversations, addConversation, addMemberToConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
