

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

  const interpretation = await interpretUserIntents({ userRequest });

  // Update state with extracted entities
  const updatedState = { ...currentState };
  if (interpretation.event && !updatedState.event) {
    // Fuzzy match exhibit
    const matchedExhibit = allExhibits.find(exhibit => 
      exhibit.title.toLowerCase().includes(interpretation.event!.toLowerCase())
    );
    if (matchedExhibit) {
      updatedState.event = matchedExhibit.title;
    }
  }
  if (interpretation.date && !updatedState.date) {
    updatedState.date = interpretation.date;
  }
  if (interpretation.time && !updatedState.time) {
    updatedState.time = interpretation.time;
  }
  if (interpretation.quantity && !updatedState.quantity) {
    updatedState.quantity = interpretation.quantity;
  }

  // Handle cases where interpretation might not catch a simple number or direct exhibit match
  const lowerUserRequest = userRequest.toLowerCase();
  const matchedExhibit = allExhibits.find(exhibit => lowerUserRequest.includes(exhibit.title.toLowerCase()));

  if (matchedExhibit && !updatedState.event) {
    updatedState.event = matchedExhibit.title;
  }

  const quantityInRequest = parseInt(userRequest, 10);
  if (!isNaN(quantityInRequest) && quantityInRequest > 0 && !updatedState.quantity) {
    updatedState.quantity = quantityInRequest;
  }

  const eventData = updatedState.event ? allExhibits.find(e => e.title === updatedState.event) || null : null;

  return { interpretation, bookingState: updatedState, eventData };
}

export async function checkAvailability(
  input: CheckRealTimeAvailabilityInput
): Promise<CheckRealTimeAvailabilityOutput> {
  return await checkRealTimeAvailability(input);
}
