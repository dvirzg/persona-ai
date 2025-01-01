'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="hover:opacity-75 transition-opacity">
      <span className="font-bold text-xl tracking-tight">Persona</span>
    </Link>
  );
} 