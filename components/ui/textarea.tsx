import * as React from 'react';
import { cn } from '@/lib/utils';
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onSubmit, onKeyDown, ...props }, ref) => {
    const { handleKeyDown: handleEnterSubmit } = useEnterSubmit({
      onSubmit: () => onSubmit?.(),
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e);
      if (onSubmit) {
        handleEnterSubmit(e);
      }
    };

    return (
      <textarea
        className={cn(
          'flex min-h-[24px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
