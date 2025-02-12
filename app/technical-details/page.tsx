import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TechnicalDetails() {
  return (
    <div className="min-h-screen bg-[#0A0B14] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B14] via-[#141B31] to-[#0A0B14]" />
        
        {/* Deep blue regions */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f35]/80 via-transparent to-[#0e1220]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#141b31]/50 via-transparent to-[#0f1424]" />
        
        {/* Glowing blue accents */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-slow-drift" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-slow-drift-reverse" />
        
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.1),rgba(17,24,39,0.7))]" />
        
        {/* Additional blue accents */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/[0.05] via-transparent to-transparent" />
        
        {/* Noise and glass effect */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-soft-light" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative">
        <Link href="/" className="inline-flex mb-8 sm:mb-12">
          <Button variant="ghost" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform group-hover:-translate-x-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
              Technical Details
            </h1>
            <p className="text-lg sm:text-xl text-gray-400/90 max-w-2xl">
              Built with cutting-edge technologies to provide a seamless, secure, and performant experience.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <section className="group">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-400/90 transition-transform group-hover:scale-110 duration-300">
                    <path d="m7 11 2-2-2-2"/>
                    <path d="M11 13h4"/>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                  <h2 className="text-xl font-semibold text-white/90">Architecture</h2>
                </div>
                <ul className="space-y-3 text-gray-300/90">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Next.js 14 with App Router
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    NextAuth.js for authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Prisma as ORM
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-400/90 transition-transform group-hover:scale-110 duration-300">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z"/>
                    <path d="M12 12 2.1 12.5"/>
                    <path d="m14 7 5.7-5.7"/>
                    <path d="m14 17 5.7 5.7"/>
                    <path d="m7 14-5.7 5.7"/>
                    <path d="m7 4-5.7-5.7"/>
                  </svg>
                  <h2 className="text-xl font-semibold text-white/90">AI Integration</h2>
                </div>
                <ul className="space-y-3 text-gray-300/90">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Advanced LLM for natural language understanding
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Context-aware conversation processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Real-time personality analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Secure data handling and privacy protection
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-400/90 transition-transform group-hover:scale-110 duration-300">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <h2 className="text-xl font-semibold text-white/90">Security Features</h2>
                </div>
                <ul className="space-y-3 text-gray-300/90">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    End-to-end encryption for messages
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    OAuth 2.0 authentication flow
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Regular security audits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    GDPR compliant data handling
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-400/90 transition-transform group-hover:scale-110 duration-300">
                    <path d="m8 14-6-6 6-6"/>
                    <path d="M16 8v12a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V10h0a4 4 0 0 0-4-4h0v2"/>
                  </svg>
                  <h2 className="text-xl font-semibold text-white/90">Performance</h2>
                </div>
                <ul className="space-y-3 text-gray-300/90">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Edge runtime deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Optimized API response times
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Efficient caching strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    Real-time updates via WebSocket
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 