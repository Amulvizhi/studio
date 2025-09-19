import { Ticket } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Ticket className="h-6 w-6" />
      <span className="font-headline text-2xl font-bold">Tickify</span>
    </div>
  );
}
