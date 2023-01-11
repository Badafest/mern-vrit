import { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import { ConversationsContext } from "../../context/Conversations";

interface ISidebarProps {
  active: string;
  handleClickConversation: (_id: string) => void;
}

export default function Sidebar({
  active,
  handleClickConversation,
}: ISidebarProps) {
  const [toast, setToast] = useState<{ message?: string; body?: string }>({});

  const updateToast = (message: string, body: string) => {
    setToast({ message, body });
  };

  return (
    <div className="w-1/3 max-w-sm min-w-full md:min-w-max flex flex-col gap-2">
      <SidebarHeader />
      <main className="flex flex-col gap-1 flex-grow">
        <SearchBox />
        <ConversationList {...{ active, handleClickConversation }} />
        {toast.message && toast.message.length && (
          <div className="px-4 pt-4">
            <Toast
              message={toast.message}
              type="danger"
              onClose={() => {
                setToast({});
              }}
            >
              {toast.body}
            </Toast>
          </div>
        )}
        <AddRequestForm updateToast={updateToast} />
        <AddConversationForm updateToast={updateToast} />
      </main>
    </div>
  );
}

function SidebarHeader() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="mx-4 border-b border-gray-500 py-2 px-4 flex justify-between items-center text-lg">
      <span>Chat App</span>
      <div className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
        <span className="mui_icon" onClick={handleLogOut}>
          logout
        </span>
      </div>
    </header>
  );
}

function SearchBox() {
  const { searchConversations } = useContext(ConversationsContext);
  return (
    <div className="flex relative items-center">
      <input
        type="text"
        className="pl-4 pr-8 py-2 bg-gray-600 rounded mx-4 flex-grow outline-none"
        onChange={(event) => searchConversations(event.target.value)}
      />
      <span className="mui_icon absolute right-6">search</span>
    </div>
  );
}

function ConversationList({ active, handleClickConversation }: ISidebarProps) {
  const { conversations } = useContext(ConversationsContext);

  return (
    <div className="border-b border-gray-500 pb-2 h-10 flex-grow overflow-auto">
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
        </div>
      ))}
    </div>
  );
}

interface IToastProps {
  updateToast: (message: string, body: string) => void;
}

function AddRequestForm({ updateToast }: IToastProps) {
  const { requestAddToConversation } = useContext(ConversationsContext);

  const conversation = useRef<HTMLInputElement>(null);

  const handleRequestAdd = async (event: FormEvent) => {
    event.preventDefault();
    if (conversation.current?.value.length) {
      try {
        await requestAddToConversation(conversation.current?.value);
      } catch (error: any) {
        const { data } = error.response;
        updateToast(data.message, data.error);
      }
    }
  };

  return (
    <form className="px-4 pt-4" onSubmit={handleRequestAdd}>
      <label htmlFor="new-conversation">
        Send request to join conversation
      </label>
      <div className="flex justify-between items-center gap-2">
        <input
          id="new-conversation"
          name="new-conversation"
          className="bg-gray-600 rounded px-4 py-2 flex-grow outline-none focus:bg-gray-800"
          ref={conversation}
          placeholder="conversation name"
        />
        <button className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
          <span className="mui_icon">person_add</span>
        </button>
      </div>
    </form>
  );
}

function AddConversationForm({ updateToast }: IToastProps) {
  const { addConversation } = useContext(ConversationsContext);

  const newConversation = useRef<HTMLInputElement>(null);

  const handleAddConversation = async (event: FormEvent) => {
    event.preventDefault();
    if (newConversation.current?.value.length) {
      try {
        await addConversation(newConversation.current?.value);
      } catch (error: any) {
        const { data } = error.response;
        updateToast(data.message, data.error);
      }
    }
  };

  return (
    <form
      className="p-4 border-b border-gray-500"
      onSubmit={handleAddConversation}
    >
      <label htmlFor="new-conversation">Create a new conversation</label>
      <div className="flex justify-between items-center gap-2">
        <input
          id="new-conversation"
          name="new-conversation"
          className="bg-gray-600 rounded px-4 py-2 flex-grow outline-none focus:bg-gray-800"
          ref={newConversation}
          placeholder="conversation name"
        />
        <button className="cursor-pointer flex items-center justify-center bg-gray-600 rounded w-10 h-10 hover:bg-gray-500 active:bg-gray-800">
          <span className="mui_icon">add</span>
        </button>
      </div>
    </form>
  );
}
