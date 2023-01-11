import { useContext, useState } from "react";
import { ApplicationContext } from "../../context/Application";
import { ConversationsContext } from "../../context/Conversations";
import { IConversation } from "../App";
import Messages from "./Messages";
import NewMessageForm from "./NewMessageForm";

export default function ApplicationBody() {
  const { conversation } = useContext(ApplicationContext);

  return (
    <div className="flex-grow bg-gray-600 flex flex-col px-2 gap-2 min-w-full md:min-w-max">
      {conversation ? (
        conversation.members ? (
          <MemberConversation conversation={conversation} />
        ) : (
          <RequestedConversation conversation={conversation} />
        )
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          Select a conversation to begin chatting
        </div>
      )}
    </div>
  );
}

function MemberConversation({ conversation }: { conversation: IConversation }) {
  const { userId } = useContext(ApplicationContext);
  const [showRequests, setShowRequests] = useState<boolean>(false);

  const handleMemberMenu = () => {
    setShowRequests((prev) => !prev);
  };

  return (
    <>
      <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
        <div>{conversation.name}</div>
        <div className="text-sm text-gray-300 flex items-center gap-2">
          {conversation.members.length} members
          {userId === conversation.admin ? (
            <button
              className="mui_icon rounded bg-gray-600 p-2 hover:bg-gray-500 active:bg-gray-800"
              onClick={handleMemberMenu}
            >
              add
            </button>
          ) : (
            <></>
          )}
        </div>
      </header>
      {showRequests && userId === conversation.admin ? (
        <RequestsMenu conversation={conversation} />
      ) : (
        <></>
      )}
      <Messages conversation={conversation} />
      <NewMessageForm />
    </>
  );
}

function RequestsMenu({ conversation }: { conversation: IConversation }) {
  const { addMemberToConversation } = useContext(ConversationsContext);

  return (
    <div className="bg-gray-700 rounded mx-auto px-4 py-2">
      {conversation.requests.length ? (
        <>
          {conversation.requests.map((request, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              {request.name}
              <button
                onClick={() => {
                  addMemberToConversation(request._id, conversation.name);
                }}
                className="bg-gray-600 rounded flex items-center justify-center p-2 outline-none hover:bg-gray-500 active:bg-gray-800"
              >
                <span className="mui_icon">check</span>
              </button>
            </div>
          ))}
        </>
      ) : (
        <>No pending requests</>
      )}
    </div>
  );
}

function RequestedConversation({
  conversation,
}: {
  conversation: IConversation;
}) {
  return (
    <>
      <header className="bg-gray-700 px-4 py-2 rounded-b flex justify-between">
        <div>{conversation.name}</div>
      </header>
      <div className="flex flex-grow text-center items-center text-lg px-8 max-w-lg mx-auto">
        You have requested to be added in this conversation but the admin has
        not approved yet.
      </div>
    </>
  );
}
