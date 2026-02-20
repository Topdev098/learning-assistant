import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function InputBox({ onSend, disabled }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t flex">
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a chemistry question..."
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}