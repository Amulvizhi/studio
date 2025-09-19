

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

const initialSuggestions: InterpretUserIntentsOutput = {
  suggestedDateOptions: [],
  suggestedTimeOptions: [],
  suggestedTicketQuantities: [1, 2, 4],
  additionalContext: "Hello! I'm your personal ticketing assistant. I can help you book tickets for museum exhibits. How can I help you get started?",
  isAmbiguous: true,
}

const initialMessage: Message = {
    id: uuidv4(),
    role: "assistant",
    content: (
      <SuggestionChips 
        interpretation={initialSuggestions} 
        onSelect={() => {}} 
      />
    )
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

      let content: React.ReactNode;

      // New conversation logic
      if (!updatedState.event) {
        content = "Which museum or exhibit would you like to visit?";
      } else if (!updatedState.quantity) {
        content = `Great! How many tickets would you like for "${updatedState.event}"?`;
      } else if (!updatedState.date) {
        content = `Perfect. For "${updatedState.event}" for ${updatedState.quantity} people, what date works for you?`;
      } else if (!updatedState.time) {
        content = `Ok, what time on ${updatedState.date} would you like?`;
      } else {
        // All info collected, check availability
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
          content = `Unfortunately, we don't have ${updatedState.quantity} tickets available for that time. We only have ${availability.availableTickets} left. Would you like to book those instead, or try a different time?`;
          // Reset time to ask again
          setBookingState({ ...updatedState, time: undefined });
        }
      }

      if (interpretation.isAmbiguous && !updatedState.event) {
         content = (
          <SuggestionChips
            interpretation={initialSuggestions}
            onSelect={(value) => handleSuggestionSelect(value, updatedState)}
          />
        );
      }


      const aiMessage: Message = { id: uuidv4(), role: "assistant", content };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
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

  const handleSuggestionSelect = (value: string | number, currentState: BookingState) => {
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
              <ChatMessage key={message.id} {...message} role={message.role} content={
                // Special handler for the first message with our custom onSelect
                message.id === initialMessage.id ? (
                  <SuggestionChips 
                    interpretation={initialSuggestions}
                    onSelect={(value) => handleSuggestionSelect(value, bookingState)}
                  />
                ) : (
                  message.content
                )
              }
            />
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

    
