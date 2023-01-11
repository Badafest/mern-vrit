import { useContext, useEffect, useRef } from "react";
import { ApplicationContext } from "../../context/Application";
import { IConversation } from "../App";
import MessageBody from "./MessageBody";

interface IMessagesProps {
  conversation: IConversation;
}

export default function Messages({ conversation }: IMessagesProps) {
  const { userId, allMessages } = useContext(ApplicationContext);
  const endOfMain = useRef<HTMLDivElement>(null);

  const whoIsSender = (from_id: string | undefined) => {
    if (from_id === userId) {
      return undefined;
    } else {
      return from_id && findMemberName(from_id);
    }
  };

  useEffect(() => {
    endOfMain.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const findMemberName = (_id: string) =>
    conversation?.members.find((item) => item._id === _id)?.name;

  return (
    <main className="px-4 py-2 flex flex-col gap-2 flex-grow h-10 overflow-auto">
      {allMessages?.length ? (
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
      <div ref={endOfMain}></div>
    </main>
  );
}
