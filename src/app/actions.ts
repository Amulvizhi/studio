
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
  
  const interpretation = await interpretUserIntents({ userRequest });

  // A simple mechanism to update state based on interpretation - this would be more robust in a real app
  if (interpretation.suggestedDateOptions.length > 0 && !currentState.date) {
    // a real app would need more logic here
  }
   if (interpretation.suggestedTicketQuantities.length > 0 && !currentState.quantity) {
    // a real app would need more logic here
  }

  const eventData = currentState.event ? allExhibits.find(e => e.title === currentState.event) || null : null;

  return { interpretation, bookingState: currentState, eventData };
}

export async function checkAvailability(
  input: CheckRealTimeAvailabilityInput
): Promise<CheckRealTimeAvailabilityOutput> {
  return await checkRealTimeAvailability(input);
}
