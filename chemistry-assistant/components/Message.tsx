import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function Message({ role, content }: Props) {
  return (
    <div className={`p-3 rounded-lg max-w-[80%] ${
      role === "user"
        ? "bg-blue-500 text-white self-end"
        : "bg-gray-200 text-black self-start"
    }`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}