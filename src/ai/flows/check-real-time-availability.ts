'use server';
/**
 * @fileOverview Checks real-time ticket availability based on user inquiry.
 *
 * - checkRealTimeAvailability - A function that checks ticket availability.
 * - CheckRealTimeAvailabilityInput - The input type for the checkRealTimeAvailability function.
 * - CheckRealTimeAvailabilityOutput - The return type for the checkRealTimeAvailability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckRealTimeAvailabilityInputSchema = z.object({
  event: z.string().describe('The name of the event.'),
  date: z.string().describe('The date for which to check availability (YYYY-MM-DD).'),
  time: z.string().describe('The time for which to check availability (HH:MM).'),
  quantity: z.number().describe('The number of tickets requested.'),
});
export type CheckRealTimeAvailabilityInput = z.infer<
  typeof CheckRealTimeAvailabilityInputSchema
>;

const CheckRealTimeAvailabilityOutputSchema = z.object({
  available: z.boolean().describe('Whether the requested number of tickets are available.'),
  availableTickets: z.number().describe('The total number of tickets available for the event.'),
});
export type CheckRealTimeAvailabilityOutput = z.infer<
  typeof CheckRealTimeAvailabilityOutputSchema
>;

export async function checkRealTimeAvailability(
  input: CheckRealTimeAvailabilityInput
): Promise<CheckRealTimeAvailabilityOutput> {
  return checkRealTimeAvailabilityFlow(input);
}

const checkRealTimeAvailabilityPrompt = ai.definePrompt({
  name: 'checkRealTimeAvailabilityPrompt',
  input: {schema: CheckRealTimeAvailabilityInputSchema},
  output: {schema: CheckRealTimeAvailabilityOutputSchema},
  prompt: `You are a ticket availability checker for museum events.

  Determine if the requested number of tickets are available for the specified event, date, and time.

  Event: {{{event}}}
  Date: {{{date}}}
  Time: {{{time}}}
  Requested Quantity: {{{quantity}}}

  Consider factors like total capacity and existing bookings.

  Respond with the 'available' boolean and the 'availableTickets' number, based on what you can sell.
  If the requested number of tickets are available, set 'available' to true, otherwise false.
  Always provide the total number of available tickets.
  `,
});

const checkRealTimeAvailabilityFlow = ai.defineFlow(
  {
    name: 'checkRealTimeAvailabilityFlow',
    inputSchema: CheckRealTimeAvailabilityInputSchema,
    outputSchema: CheckRealTimeAvailabilityOutputSchema,
  },
  async input => {
    const {output} = await checkRealTimeAvailabilityPrompt(input);
    return output!;
  }
);
