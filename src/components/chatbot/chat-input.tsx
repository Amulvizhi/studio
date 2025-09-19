"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Ask about tickets..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        autoFocus
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !message.trim()} size="icon">
        <SendHorizonal className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
