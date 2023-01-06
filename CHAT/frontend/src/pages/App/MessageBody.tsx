import { timeDiff } from "../../helpers";
import { IMessage } from "../App";

interface IMessageBodyProps {
  message: IMessage;
  from: string | undefined;
}

export default function MessageBody({ message, from }: IMessageBodyProps) {
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
}
