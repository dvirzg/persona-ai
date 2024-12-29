'use client';

import { signOut } from '@/app/(auth)/auth';

export function SignOutForm() {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type="submit">
        Sign Out
      </button>
    </form>
  );
}
