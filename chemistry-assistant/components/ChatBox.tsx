"use client";

import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

interface MessageType {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const newMessages: MessageType[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let assistantMessage = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      assistantMessage += chunk;

      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-150 h-[80vh] bg-white shadow-lg rounded-xl flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
      </div>

      <InputBox onSend={sendMessage} disabled={loading} />
    </div>
  );
}