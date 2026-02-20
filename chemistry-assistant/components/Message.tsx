import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function Message({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-2xl px-4 py-3 rounded-2xl
          ${isUser 
            ? "bg-[#2f2f2f] text-white" 
            : "bg-[#3a3a3a] text-white"}
        `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}