
'use client';

import { Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { exhibits } from '@/lib/exhibits-data';
import ETicket from '@/components/e-ticket';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function ConfirmationComponent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const { id: bookingId } = params;
  const exhibitId = searchParams.get('exhibitId');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);
  
  const exhibit = exhibits.find(e => e.id === exhibitId);

  if (!exhibit) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-headline text-destructive">Booking not found</h2>
        <Button onClick={() => router.push('/exhibits')} className="mt-4">Back to Exhibits</Button>
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-[calc(100vh-80px)] py-12 sm:py-24 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
          Your Ticket is Confirmed!
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          Present this ticket at the entrance.
        </p>
      </div>

      <ETicket
        bookingId={bookingId as string}
        exhibit={exhibit}
        quantity={quantity}
      />
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={() => router.push('/exhibits')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Book Another Ticket
          </Button>
          <Button>Download PDF</Button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading ticket...</div>}>
      <ConfirmationComponent />
    </Suspense>
  )
}
