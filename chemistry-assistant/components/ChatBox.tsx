"use client";

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

interface MessageType {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Detect if user is near bottom
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const threshold = 50; // px from bottom
    const isBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;

    setIsAtBottom(isBottom);
  };

  // Auto-scroll only if user is at bottom
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  const sendMessage = async (text: string) => {
    const newMessages: MessageType[] = [
      ...messages,
      { role: "user", content: text },
    ];

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
      {/* Messages Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}

        {/* Invisible Scroll Target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputBox onSend={sendMessage} disabled={loading} />
    </div>
  );
}