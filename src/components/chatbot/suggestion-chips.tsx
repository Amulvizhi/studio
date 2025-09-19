
"use client";

import type { InterpretUserIntentsOutput } from "@/ai/flows/interpret-user-intents";
import { Button } from "@/components/ui/button";

interface SuggestionChipsProps {
  interpretation: InterpretUserIntentsOutput;
  onSelect: (value: string | number) => void;
}

export default function SuggestionChips({
  interpretation,
  onSelect,
}: SuggestionChipsProps) {
  const {
    suggestedDateOptions = [],
    suggestedTimeOptions = [],
    suggestedTicketQuantities = [],
    additionalContext,
    isAmbiguous,
  } = interpretation;

  const hasSuggestions =
    suggestedDateOptions.length > 0 ||
    suggestedTimeOptions.length > 0 ||
    suggestedTicketQuantities.length > 0;

  return (
    <div className="space-y-3">
        {additionalContext && <p className="text-sm">{additionalContext}</p>}
        {isAmbiguous && !hasSuggestions && <p>I can help with booking. For example, you can say "Two tickets for the National Museum" to start.</p>}
        
        {suggestedDateOptions.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {suggestedDateOptions.map((option) => (
                    <Button key={option} variant="outline" size="sm" onClick={() => onSelect(option)}>
                        {option}
                    </Button>
                ))}
            </div>
        )}
        {suggestedTimeOptions.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {suggestedTimeOptions.map((option) => (
                    <Button key={option} variant="outline" size="sm" onClick={() => onSelect(option)}>
                        {option}
                    </Button>
                ))}
            </div>
        )}
        {suggestedTicketQuantities.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {suggestedTicketQuantities.map((option) => (
                    <Button key={option} variant="outline" size="sm" onClick={() => onSelect(option)}>
                        {option} {option > 1 ? 'tickets' : 'ticket'}
                    </Button>
                ))}
            </div>
        )}
    </div>
  );
}
