'use client';

import { Brain } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-75 transition-opacity">
      <Brain className="h-8 w-8 text-primary" strokeWidth={2.5} />
      <span className="font-bold text-xl tracking-tight">Persona</span>
    </Link>
  );
} 