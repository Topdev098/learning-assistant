import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function Message({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className="w-full flex">
      {/* Assistant Layout */}
      {!isUser && (
        <div className="flex w-full items-start gap-3">
          {/* 🤖 Avatar */}
           🤖         

          {/* Message Bubble */}
          <div className="max-w-2xl px-4 py-3 rounded-2xl bg-gray-200 text-black">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* User Layout */}
      {isUser && (
        <div className="flex w-full justify-end items-start gap-3">
          {/* Message Bubble */}
          <div className="max-w-2xl px-4 py-3 rounded-2xl bg-blue-500 text-white">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* 👤 Avatar */}
            👤
        </div>
      )}
    </div>
  );
}