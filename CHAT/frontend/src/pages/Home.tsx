import { FormEvent, useEffect, useState } from "react";

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

export default function Home() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [active, setActive] = useState("");

  const getAllConversations = async () => {
    const response = await fetch("http://localhost:8000/api/v1/conversation");
    const conversations = (await response.json()).conversations;
    setConversations(conversations);
  };

  useEffect(() => {
    getAllConversations();
    console.log("rerender");
  }, []);

  const handleClickConversation = (_id: string) => {
    setActive((_) => _id);
  };

  return (
    <div className="flex w-full min-h-screen text-white bg-gray-700">
      <Sidebar {...{ conversations, active, handleClickConversation }} />
      <ApplicationBody
        conversation={conversations.find((item) => item._id === active)}
      />
    </div>
  );
}

interface ISidebarProps {
  conversations: IConversation[];
  active: string;
  handleClickConversation: (_id: string) => void;
}

const Sidebar = ({
  conversations,
  active,
  handleClickConversation,
}: ISidebarProps) => {
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
};

interface IApplicationBodyProps {
  conversation: IConversation | undefined;
}

const ApplicationBody = ({ conversation }: IApplicationBodyProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState("");

  const sendNewMessage = (event: Event | FormEvent) => {
    event.preventDefault();
    if (newMessage.length > 0) {
      console.log(newMessage); //send message to backend and fetch messages
      setNewMessage((_) => "");
    }
  };

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

  const whoIsSender = (from_id: string) => {
    if (from_id === userId) {
      return undefined;
    } else {
      return findMemberName(from_id);
    }
  };

  const findMemberName = (_id: string) =>
    conversation?.members.find((item) => item._id === _id)?.name;

  return (
    <div className="flex-grow bg-gray-600 flex flex-col px-2 gap-2">
      {conversation ? (
        <>
          <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
            <div>{conversation.name}</div>
            <div className="text-sm text-gray-300">
              {conversation.members.length} members
            </div>
          </header>
          <main className="px-4 py-2 flex flex-col gap-2 flex-grow overflow-auto">
            {allMessages.length ? (
              allMessages.map((message, index) => (
                <MessageBody
                  key={index}
                  message={message}
                  from={whoIsSender(message.from_id)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full text-lg">
                Start this conversation by saying Hello!
              </div>
            )}
          </main>
          <form
            className="bg-gray-700 rounded-t p-2 flex gap-2 items-end"
            onSubmit={sendNewMessage}
          >
            <div className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
              <span className="mui_icon">image</span>
            </div>
            <textarea
              className="w-full rounded bg-gray-600 px-4 py-2 outline-none focus:bg-gray-800 resize-none max-h-48 overflow-auto"
              rows={Array.from(newMessage.matchAll(/\n/g)).length + 1}
              value={newMessage}
              onChange={(event) => setNewMessage((_) => event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  sendNewMessage(event);
                }
              }}
            />
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800"
            >
              <span className="mui_icon">send</span>
            </button>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          Select a conversation to begin chatting
        </div>
      )}
    </div>
  );
};

interface IMessageBodyProps {
  message: IMessage;
  from: string | undefined;
}

const MessageBody = ({ message, from }: IMessageBodyProps) => {
  return (
    <div className={`flex ${from ? "justify-start" : "justify-end"}`}>
      <div className="py-2 px-4 bg-gray-700 h-fit rounded-lg max-w-md">
        {from && (
          <div className="text-xs font-bold text-yellow-500">{from}</div>
        )}
        <div className="whitespace-pre-wrap">{message.message}</div>
        <div className="text-xs text-right text-gray-400 mt-2">
          {timeDiff(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

const timeDiff = (time: string) => {
  const then = Date.parse(time);
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);
  const secs = seconds % 60;
  const mins = (Math.floor(seconds - secs) / 60) % 60;
  const hours = (Math.floor(seconds - secs - mins * 60) / 3600) % 24;
  const days =
    (Math.floor(seconds - secs - mins * 60 - hours * 3600) / 86400) % 30;

  if (days > 2) {
    return new Date(time).toLocaleString();
  }
  if (days === 2) {
    return "day before yesterday";
  }
  if (days === 1) {
    return "yesterday";
  }
  if (hours > 0) {
    return hours + " hours ago";
  }
  if (mins > 0) {
    return mins + " minutes ago";
  }
  if (secs > 10) {
    return secs + " seconds ago";
  }
  return "a few seconds ago";
};
