import { FormEvent, useEffect, useRef, useState } from "react";

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

export default function Home() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [message, setMessage] = useState("");

  const getAllConversations = async () => {
    const response = await fetch("http://localhost:8000/api/v1/conversation");
    const data = await response.json();
    setConversations(data.conversations);
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  const sendNewMessage = (event: Event | FormEvent) => {
    event.preventDefault();
    if (message.length > 0) {
      console.log(message);
      setMessage((_) => "");
    }
  };

  return (
    <div className="flex w-full min-h-screen text-white bg-gray-700">
      <div className="w-1/3 max-w-sm flex flex-col gap-2">
        <header className="mx-4 border-b border-gray-500 py-2 px-4 text-center text-lg">
          Chat App
        </header>
        <main className="flex flex-col gap-1">
          {conversations.map((conversation, index) => (
            <div
              className="m-2 rounded cursor-pointer py-2 px-4 flex items-center justify-between hover:bg-gray-600 active:bg-gray-800"
              key={index}
            >
              <div className="rounded-full w-10 h-10 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-800 text-2xl">
                {conversation?.name[0]}
              </div>
              <div className="flex-grow px-4">{conversation?.name}</div>
              <div className="rounded-full w-2 h-2 flex-shrink-0 bg-green-500"></div>
            </div>
          ))}
        </main>
      </div>
      <div className="flex-grow bg-gray-600 flex flex-col px-2 gap-2">
        <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
          <div>Cool Guys</div>
          <div className="text-sm text-gray-300">2 members active</div>
        </header>
        <main className="px-4 py-2 flex flex-col gap-2 flex-grow">
          <div className="flex justify-start">
            <div className="py-2 px-4 bg-gray-700 h-fit rounded-lg">
              <div className="text-xs font-bold text-yellow-500 border-gray-500 w-full">
                Cool Guy 1
              </div>
              <div className="whitespace-pre">{`Hello\nDo you love me?`}</div>
            </div>
          </div>
          <div className="flex justify-end text-right">
            <div className="py-2 px-4 bg-gray-700 h-fit rounded-lg whitespace-pre">
              {`Hi\nOf Course!\n😍😍😍`}
            </div>
          </div>
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
            rows={Array.from(message.matchAll(/\n/g)).length + 1}
            value={message}
            onChange={(event) => setMessage((_) => event.target.value)}
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
      </div>
    </div>
  );
}
