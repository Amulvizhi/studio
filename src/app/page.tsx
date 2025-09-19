import ChatInterface from "@/components/chatbot/chat-interface";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
          Book Your Next Cultural Experience
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
          Use our AI assistant to find and book tickets for your favorite exhibits, effortlessly.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
