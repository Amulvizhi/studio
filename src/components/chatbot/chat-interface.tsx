"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";
import type { InterpretUserIntentsOutput } from "@/ai/flows/interpret-user-intents";
import { getAiResponse, checkAvailability, type BookingState } from "@/app/actions";
import type { Exhibit } from '@/lib/exhibits-data';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import SuggestionChips from "./suggestion-chips";
import { Button } from "../ui/button";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: React.ReactNode;
}

const initialMessage: Message = {
    id: uuidv4(),
    role: "assistant",
    content: "Hello! I'm your personal ticketing assistant. How can I help you today? You can ask me to book tickets for an exhibit.",
};

export default function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: uuidv4(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { interpretation, bookingState: updatedState, eventData } = await getAiResponse(text, { ...bookingState });
      setBookingState(updatedState);

      let content: React.ReactNode = "I'm not sure how to help with that. Please try asking about our exhibits.";

      // State machine for conversation flow
      if (updatedState.event && !updatedState.quantity) {
          content = `Great! How many tickets would you like for "${updatedState.event}"?`;
      } else if (updatedState.event && updatedState.quantity && !updatedState.date) {
         content = `Perfect. For "${updatedState.event}" for ${updatedState.quantity} people, what date works for you?`;
      } else if (updatedState.event && updatedState.quantity && updatedState.date && !updatedState.time) {
         content = `Ok, what time on ${updatedState.date} would you like?`;
      } else if (updatedState.event && updatedState.quantity && updatedState.date && updatedState.time) {
        const availability = await checkAvailability({
          event: updatedState.event,
          date: updatedState.date,
          time: updatedState.time,
          quantity: updatedState.quantity,
        });
        
        if (availability.available) {
          content = (
            <div className="space-y-2">
              <p>Excellent! We have {updatedState.quantity} tickets available for "{updatedState.event}" on {updatedState.date} at {updatedState.time}.</p>
              <Button onClick={() => router.push(`/checkout?exhibitId=${eventData?.id}&quantity=${updatedState.quantity}`)}>Proceed to Checkout</Button>
            </div>
          );
        } else {
          content = `Unfortunately, we don't have ${updatedState.quantity} tickets available. We have ${availability.availableTickets} left. Would you like to book those instead?`;
          // Reset for re-booking
          setBookingState({ event: updatedState.event });
        }
      } else if (interpretation.suggestedDateOptions.length > 0 || interpretation.suggestedTicketQuantities.length > 0) {
        content = (
          <SuggestionChips
            interpretation={interpretation}
            onSelect={(value) => handleSuggestionSelect(value)}
          />
        );
      } else if (updatedState.event) {
        content = `I see you're interested in "${updatedState.event}". What date and how many tickets are you looking for?`
      }

      const aiMessage: Message = { id: uuidv4(), role: "assistant", content };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (value: string | number) => {
    let updatedState = { ...bookingState };
    if (typeof value === "number") {
      updatedState.quantity = value;
    } else {
        // This is a simplified logic
        if (["Tomorrow", "This weekend", "Next week"].includes(value)) {
            updatedState.date = value;
        } else {
            updatedState.time = value;
        }
    }
    setBookingState(updatedState);
    handleSendMessage(String(value));
  };


  return (
    <Card className="w-full max-w-2xl shadow-2xl rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <h2 className="text-lg font-semibold">Tickify Assistant</h2>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[450px] w-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {isLoading && (
              <ChatMessage
                id="loading"
                role="assistant"
                content="Thinking..."
              />
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
