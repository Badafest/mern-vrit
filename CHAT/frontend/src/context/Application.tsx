import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IConversation, IMessage } from "../pages/App";
import { FormEvent } from "react";
import { UserContext } from "./User";
import axios from "../config/axios";

interface IApplicationContext {
  userId?: string;
  conversation?: IConversation;
  allMessages?: IMessage[];
  newMessage?: INewMessage;
  socketMessage?: IMessage;
  setNewMessage: (message: string) => void;
  sendNewMessage: (event: Event | FormEvent) => void;
}

export const ApplicationContext = createContext<IApplicationContext>({
  setNewMessage: (_: string) => {},
  sendNewMessage: (_: Event | FormEvent) => {},
});

interface IApplicationContextProps extends PropsWithChildren {
  conversation: IConversation | undefined;
}

interface INewMessage {
  message: string;
  type: "text" | "image";
}

export default function ApplicationProvider({
  conversation,
  ...rest
}: IApplicationContextProps) {
  const { user } = useContext(UserContext);

  const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  const [newMessage, setNewMessage] = useState<INewMessage>({
    message: "",
    type: "text",
  });

  const [userId, setUserId] = useState<string | undefined>("");

  const [socket, setSocket] = useState<WebSocket | null>(null);

  const getAllMessages = async (conversation: IConversation) => {
    const { data } = (await axios.get(
      "/conversation/message/" + conversation._id
    )) as { data: { messages: IMessage[] } };
    setAllMessages((_) => data.messages);
  };

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000?user_id=${userId}`);
    setSocket(ws);
  }, [userId]);

  useEffect(() => {
    if (conversation) {
      getAllMessages(conversation);
      setUserId(
        conversation.members.find((member) => member.name === user?.name)?._id
      );
    }
  }, [conversation]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        console.log("Socket connected");
      });

      const onMessage = (event: any) => {
        console.log("message received from ws server");
        const socketMessage = JSON.parse(event.data) as unknown as IMessage;
        setAllMessages((prev) => [...prev, socketMessage]);
      };

      socket.addEventListener("message", onMessage);

      return () => {
        socket?.removeEventListener("message", onMessage);
      };
    }
  }, [socket]);

  const sendNewMessage = async (event: Event | FormEvent) => {
    event.preventDefault();
    setNewMessage((_) => ({ message: "", type: "text" }));
    setAllMessages((prev) => [
      ...prev,
      {
        type: newMessage?.type || "text",
        message: newMessage?.message || "",
      },
    ]);
    if (newMessage && newMessage.message.length > 0) {
      await axios.post("/conversation/message", {
        ...newMessage,
        conversation_id: conversation?._id,
      });
    }
  };

  const updateNewMessage = (message: string) => {
    setNewMessage((_) => ({
      message,
      type: "text",
    }));
  };

  return (
    <ApplicationContext.Provider
      value={{
        userId,
        conversation,
        allMessages,
        newMessage,
        setNewMessage: updateNewMessage,
        sendNewMessage,
      }}
    >
      {rest.children}
    </ApplicationContext.Provider>
  );
}
