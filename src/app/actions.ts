
'use server';

import { interpretUserIntents } from '@/ai/flows/interpret-user-intents';
import { checkRealTimeAvailability } from '@/ai/flows/check-real-time-availability';
import type { InterpretUserIntentsOutput } from '@/ai/flows/interpret-user-intents';
import type { CheckRealTimeAvailabilityInput, CheckRealTimeAvailabilityOutput } from '@/ai/flows/check-real-time-availability';
import { exhibits as allExhibits, type Exhibit } from '@/lib/exhibits-data';

export interface BookingState {
  event?: string;
  date?: string;
  time?: string;
  quantity?: number;
}

export async function getAiResponse(
  userRequest: string,
  currentState: BookingState
): Promise<{ interpretation: InterpretUserIntentsOutput; bookingState: BookingState, eventData?: Exhibit | null }> {
  // Simple logic to extract exact matches for exhibits
  const lowerUserRequest = userRequest.toLowerCase();
  const matchedExhibit = allExhibits.find(exhibit => lowerUserRequest.includes(exhibit.title.toLowerCase()));

  if (matchedExhibit && !currentState.event) {
    currentState.event = matchedExhibit.title;
  }
  
  // If the user request is just a number, assume it's the quantity
  const quantityInRequest = parseInt(userRequest, 10);
  if (!isNaN(quantityInRequest) && quantityInRequest > 0 && !currentState.quantity) {
    currentState.quantity = quantityInRequest;
  }

  const interpretation = await interpretUserIntents({ userRequest });

  // A simple mechanism to update state based on interpretation
  if (interpretation.suggestedDateOptions.length > 0 && !currentState.date) {
    // A real app would need more logic here to handle date selection
  }
  if (interpretation.suggestedTicketQuantities.length > 0 && !currentState.quantity) {
    // This is handled by the initial quantity check, but could be expanded
  }

  const eventData = currentState.event ? allExhibits.find(e => e.title === currentState.event) || null : null;

  return { interpretation, bookingState: currentState, eventData };
}

export async function checkAvailability(
  input: CheckRealTimeAvailabilityInput
): Promise<CheckRealTimeAvailabilityOutput> {
  return await checkRealTimeAvailability(input);
}
