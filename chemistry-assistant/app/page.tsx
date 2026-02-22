"use client";

import { useState } from "react";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 flex flex-col justify-center items-center gap-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">
        Chemistry Learning Assistant
      </h1>

      {/* Chat Box */}
      <ChatBox />
    </main>
  );
}