"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: React.ReactNode;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        !isAssistant && "justify-end"
      )}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs sm:max-w-md md:max-w-lg rounded-xl p-3 text-sm shadow-md",
          isAssistant
            ? "bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {typeof content === 'string' ? (
            <p className="whitespace-pre-wrap">{content}</p>
        ) : (
            content
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8 border-2 border-accent">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
