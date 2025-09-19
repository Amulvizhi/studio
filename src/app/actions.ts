

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
  exhibitId?: string;
}

export async function getAiResponse(
  userRequest: string,
  currentState: BookingState
): Promise<{ interpretation: InterpretUserIntentsOutput; bookingState: BookingState, eventData?: Exhibit | null }> {

  const interpretation = await interpretUserIntents({ userRequest });

  // Update state with extracted entities
  const updatedState = { ...currentState };
  
  const lowerUserRequest = userRequest.toLowerCase();
  
  // Try to match an exhibit from user request if not already set
  if (!updatedState.event) {
    const mentionedExhibit = allExhibits.find(exhibit => 
      lowerUserRequest.includes(exhibit.title.toLowerCase()) || 
      (interpretation.event && exhibit.title.toLowerCase().includes(interpretation.event.toLowerCase()))
    );

    if (mentionedExhibit) {
      updatedState.event = mentionedExhibit.title;
      updatedState.exhibitId = mentionedExhibit.id;
    }
  }

  if (interpretation.date && !updatedState.date) {
    updatedState.date = interpretation.date;
  }
  if (interpretation.time && !updatedState.time) {
    updatedState.time = interpretation.time;
  }

  const quantityInRequest = parseInt(userRequest, 10);
  if (!isNaN(quantityInRequest) && quantityInRequest > 0 && !updatedState.quantity) {
     updatedState.quantity = quantityInRequest;
  } else if (interpretation.quantity && !updatedState.quantity) {
    updatedState.quantity = interpretation.quantity;
  }

  const eventData = updatedState.exhibitId ? allExhibits.find(e => e.id === updatedState.exhibitId) || null : null;

  return { interpretation, bookingState: updatedState, eventData };
}

export async function checkAvailability(
  input: CheckRealTimeAvailabilityInput
): Promise<CheckRealTimeAvailabilityOutput> {
  return await checkRealTimeAvailability(input);
}
