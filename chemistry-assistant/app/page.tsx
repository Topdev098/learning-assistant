"use client";

import { useState } from "react";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 flex justify-center items-center">
      <ChatBox />
    </main>
  );
}