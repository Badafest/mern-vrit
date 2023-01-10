import {
  createContext,
  PropsWithChildren,
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
  newMessage?: string;
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

export default function ApplicationProvider({
  conversation,
  ...rest
}: IApplicationContextProps) {
  const { user } = useContext(UserContext);

  const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  const [newMessage, setNewMessage] = useState("");

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

  socket?.addEventListener("open", () => {
    console.log("Socket connected");
  });

  socket?.addEventListener("message", (event) => {
    console.log("message recieved from ws server");
    const socketMessage = JSON.parse(event.data) as unknown as IMessage;
    setAllMessages((prev) => [
      ...prev.filter((msg) => msg._id !== socketMessage._id),
      socketMessage,
    ]);
  });

  const sendNewMessage = async (event: Event | FormEvent) => {
    event.preventDefault();
    setNewMessage((_) => "");
    if (newMessage.length > 0) {
      const { data } = await axios.post("/conversation/message", {
        message: newMessage,
        type: "text",
        conversation_id: conversation?._id,
      });
      setAllMessages((prev) => [...prev, data.newMessage]);
    }
  };

  const updateNewMessage = (message: string) => {
    setNewMessage((_) => message);
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
