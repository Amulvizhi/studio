
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { exhibits } from '@/lib/exhibits-data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Ticket, Calendar, Users, CreditCard, ShieldCheck } from 'lucide-react';

function CheckoutComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const exhibitId = searchParams.get('exhibitId');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);

  const exhibit = exhibits.find(e => e.id === exhibitId);

  if (!exhibit) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-headline text-destructive">Exhibit not found</h2>
        <p className="text-muted-foreground">Please go back and select a valid exhibit.</p>
        <Button onClick={() => router.push('/exhibits')} className="mt-4">Back to Exhibits</Button>
      </div>
    );
  }

  const subtotal = exhibit.price * quantity;
  const fees = subtotal * 0.05; // 5% processing fee
  const total = subtotal + fees;

  const bookingId = `TKY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="order-2 lg:order-1">
            <h1 className="font-headline text-3xl font-bold text-primary mb-6">Order Summary</h1>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={exhibit.image.imageUrl} alt={exhibit.title} fill className="object-cover" data-ai-hint={exhibit.image.imageHint} />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-2xl">{exhibit.title}</CardTitle>
                        <div className="text-muted-foreground flex items-center gap-2 mt-1"><Calendar className="h-4 w-4" /><span>{exhibit.date}</span></div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-muted-foreground"><Ticket className="h-4 w-4" />Ticket Price</span>
                        <span>${exhibit.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" />Quantity</span>
                        <span>&times; {quantity}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-medium">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Taxes & Fees</span>
                        <span>${fees.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Payment Form */}
        <div className="order-1 lg:order-2">
          <h1 className="font-headline text-3xl font-bold text-primary mb-6">Secure Checkout</h1>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="text-accent" />Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo Code</Label>
                    <div className="flex space-x-2">
                        <Input id="promo-code" placeholder="Enter code" />
                        <Button variant="secondary">Apply</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="lg" className="w-full">Pay ${total.toFixed(2)}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="font-headline text-2xl text-primary flex items-center gap-2"><ShieldCheck/>Booking Confirmed!</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your tickets for "{exhibit.title}" have been successfully booked. Your e-ticket has been generated.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => router.push(`/booking/${bookingId}/confirmation?exhibitId=${exhibit.id}&quantity=${quantity}`)}>
                                View E-Ticket
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <p className="text-xs text-muted-foreground text-center mt-4">This is a simulated checkout process. No real payment will be made.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutComponent />
        </Suspense>
    )
}
