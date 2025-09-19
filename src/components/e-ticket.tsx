import type { Exhibit } from "@/lib/exhibits-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QRCode from "@/components/qr-code";
import Logo from "./logo";
import { Calendar, Users, Ticket as TicketIcon } from "lucide-react";

interface ETicketProps {
  bookingId: string;
  exhibit: Exhibit;
  quantity: number;
}

export default function ETicket({ bookingId, exhibit, quantity }: ETicketProps) {
  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-card to-secondary/50 p-1 rounded-2xl shadow-2xl">
      <Card className="rounded-xl overflow-hidden relative isolate">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/80 to-primary/0 -z-10" />
        <CardHeader className="text-center pt-8 pb-4">
          <Logo />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-center mb-6">
            <h3 className="font-headline text-2xl font-bold text-primary">{exhibit.title}</h3>
            <p className="text-muted-foreground">{exhibit.description}</p>
          </div>
          
          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Date</p>
              <p className="font-semibold">{exhibit.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1.5"><Users className="h-4 w-4" /> Quantity</p>
              <p className="font-semibold">{quantity} Admission{quantity > 1 ? 's' : ''}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-muted-foreground flex items-center gap-1.5"><TicketIcon className="h-4 w-4" /> Booking ID</p>
              <p className="font-mono text-xs">{bookingId}</p>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-lg flex justify-center items-center">
             <QRCode value={bookingId} />
          </div>
        </CardContent>
         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
      </Card>
    </div>
  );
}
