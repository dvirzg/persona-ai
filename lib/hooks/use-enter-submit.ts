import { KeyboardEvent } from 'react';

interface UseEnterSubmitOptions {
  onSubmit: () => void;
  shouldSubmit?: (event: KeyboardEvent) => boolean;
}

export function useEnterSubmit({
  onSubmit,
  shouldSubmit = (event: KeyboardEvent) => !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey,
}: UseEnterSubmitOptions) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (shouldSubmit(event)) {
        event.preventDefault();
        onSubmit();
      }
    }
  };

  return {
    handleKeyDown,
  };
} 