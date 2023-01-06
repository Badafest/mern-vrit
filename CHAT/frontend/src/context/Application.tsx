import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IConversation, IMessage } from "../pages/App";
import { FormEvent } from "react";

interface IApplicationContext {
  userId?: string;
  allMessages?: IMessage[];
  newMessage?: string;
  setNewMessage: (message: string) => void;
  sendNewMessage: (event: Event | FormEvent) => void;
}

export const ApplicationContext = createContext<IApplicationContext>({
  userId: "",
  allMessages: [],
  setNewMessage: (_: string) => {},
  sendNewMessage: (_: Event | FormEvent) => {},
});

export default function ApplicationProvider(
  conversation: IConversation | undefined,
  { children }: PropsWithChildren
) {
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  const [newMessage, setNewMessage] = useState("");

  const [userId, setUserId] = useState("");

  const getAllMessages = async (conversation: IConversation) => {
    const response = await fetch(
      "http://localhost:8000/api/v1/conversation/message/" + conversation._id
    );
    const messages = (await response.json()).messages;
    setAllMessages((_) => messages);
  };

  useEffect(() => {
    if (conversation) {
      getAllMessages(conversation);
      setUserId(conversation.members[0]._id);
    }
  }, [conversation]);

  const sendNewMessage = (event: Event | FormEvent) => {
    event.preventDefault();
    if (newMessage.length > 0) {
      console.log(newMessage); //send message to backend
      conversation && getAllMessages(conversation);
      setNewMessage((_) => "");
    }
  };

  const updateNewMessage = (message: string) => {
    setNewMessage((_) => message);
  };

  return (
    <ApplicationContext.Provider
      value={{
        userId,
        allMessages,
        newMessage,
        setNewMessage: updateNewMessage,
        sendNewMessage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
