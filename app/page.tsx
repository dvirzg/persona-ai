import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0B14] text-white relative overflow-hidden selection:bg-blue-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full overflow-hidden">
        {/* Main dark background */}
        <div className="absolute inset-0 bg-[#070B19]" />
        
        {/* Dark corner regions */}
        <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh-reverse" />
        
        {/* Large blue gradient regions */}
        <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        
        {/* Brighter blue accents */}
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[#3B7BF7]/10 rounded-full blur-[90px] animate-mega-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-[#3B7BF7]/10 rounded-full blur-[90px] animate-mega-pulse" />
        
        {/* Additional dark regions that move independently */}
        <div className="absolute top-1/4 left-1/3 w-[60%] h-[60%] bg-[#050709]/80 rounded-full blur-[150px] animate-swoosh" />
        <div className="absolute bottom-1/3 right-1/4 w-[70%] h-[70%] bg-[#050709]/80 rounded-full blur-[150px] animate-swoosh-reverse" />
        
        {/* Subtle moving gradients */}
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-transparent to-transparent animate-wild" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B19] via-transparent to-transparent animate-wild" />
        </div>
        
        {/* Center darker region */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#070B19]/50 to-transparent animate-mega-pulse" />
        
        {/* Additional blue glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1B3A77]/10 rounded-full blur-[150px] animate-swoosh" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1B3A77]/10 rounded-full blur-[150px] animate-swoosh-reverse" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
        
        {/* Final gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050709]/80 via-transparent to-[#050709]/80 animate-wild" />
      </div>

      {/* Content */}
      <div className="w-full container mx-auto px-5 sm:px-6 relative py-8 sm:py-12 md:py-0 space-y-12 sm:space-y-16">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8 sm:space-y-10 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-blue-100 to-white tracking-tight leading-[1.1]">
                Persona
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-blue-200/90 font-medium leading-relaxed">
                A social AI that learns your personal context for you
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No more personal-context dumping to ChatGPT. From quick social opinions to deeper self-reflection, 
              Persona learns your personality, communication style, and social circle automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-lg px-8 rounded-2xl active:scale-[0.98] transition-all duration-150 shadow-lg hover:shadow-blue-500/25 border-0 font-medium tracking-[-0.01em]">
                  Log in <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Button>
              </Link>
              <Link href="/register" className="text-gray-400 hover:text-white transition-colors text-lg py-3 px-6 rounded-xl hover:bg-white/5 active:bg-white/10 w-full sm:w-auto text-center">
                Sign up
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Link href="/technical-details">
                <Button className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] active:bg-white/[0.08] border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300 backdrop-blur-xl text-[15px] font-medium text-gray-400/90 hover:text-white shadow-sm shadow-black/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-400/80 transition-transform group-hover:scale-110 duration-300">
                    <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
                  </svg>
                  <span className="tracking-tight">Technical Details</span>
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 active:bg-orange-500/30 border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-xl text-[15px] font-medium text-orange-400/90 hover:text-orange-400 shadow-sm shadow-black/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-orange-400/80 transition-transform group-hover:scale-110 duration-300">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  <span className="tracking-tight">Try Demo</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Personal Context Card */}
            <div className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400/90 mb-4 transition-transform group-hover:scale-110 duration-300">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              </svg>
              <h3 className="text-lg font-semibold mb-2.5 tracking-tight text-white/90">Personal Context</h3>
              <p className="text-[15px] text-gray-400/90 leading-relaxed">Automatically learns about you through natural conversations.</p>
            </div>

            {/* Social Assistant Card */}
            <div className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400/90 mb-4 transition-transform group-hover:scale-110 duration-300">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3 className="text-lg font-semibold mb-2.5 tracking-tight text-white/90">Social Assistant</h3>
              <p className="text-[15px] text-gray-400/90 leading-relaxed">From texts to Instagram posts—get personalized social insights.</p>
            </div>

            {/* Quick Insights Card */}
            <div className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400/90 mb-4 transition-transform group-hover:scale-110 duration-300">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
              </svg>
              <h3 className="text-lg font-semibold mb-2.5 tracking-tight text-white/90">Quick Insights</h3>
              <p className="text-[15px] text-gray-400/90 leading-relaxed">Instant help for social decisions without lengthy explanations.</p>
            </div>

            {/* Smart Learning Card */}
            <div className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] active:translate-y-[1px] hover:shadow-xl hover:shadow-blue-500/[0.1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400/90 mb-4 transition-transform group-hover:scale-110 duration-300">
                <line x1="6" y1="3" x2="6" y2="15"/>
                <circle cx="18" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <path d="M18 9a9 9 0 0 1-9 9"/>
              </svg>
              <h3 className="text-lg font-semibold mb-2.5 tracking-tight text-white/90">Smart Learning</h3>
              <p className="text-[15px] text-gray-400/90 leading-relaxed">Adapts to your communication style and preferences.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 text-center text-gray-400/90">
          <div className="group hover:translate-y-[-2px] transition-all duration-200">
            <div className="text-3xl sm:text-4xl font-semibold text-white mb-2 group-hover:text-blue-400/90 transition-colors">Zero</div>
            <div className="text-sm tracking-wide uppercase">Context Dumping</div>
          </div>
          <div className="hidden sm:block w-px bg-gradient-to-b from-gray-800/30 via-gray-800/80 to-gray-800/30" />
          <div className="group hover:translate-y-[-2px] transition-all duration-200">
            <div className="text-3xl sm:text-4xl font-semibold text-white mb-2 group-hover:text-blue-400/90 transition-colors">24/7</div>
            <div className="text-sm tracking-wide uppercase">Social Support</div>
          </div>
          <div className="hidden sm:block w-px bg-gradient-to-b from-gray-800/30 via-gray-800/80 to-gray-800/30" />
          <div className="group hover:translate-y-[-2px] transition-all duration-200">
            <div className="text-3xl sm:text-4xl font-semibold text-white mb-2 group-hover:text-blue-400/90 transition-colors">Instant</div>
            <div className="text-sm tracking-wide uppercase">Personalization</div>
          </div>
        </div>
      </div>
    </div>
  );
} 