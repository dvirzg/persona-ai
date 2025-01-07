import { cn } from '@/lib/utils';

export function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center w-full h-full", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading chat history...</p>
      </div>
    </div>
  );
} 