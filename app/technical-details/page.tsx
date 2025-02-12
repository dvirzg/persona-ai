'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TechnicalDetails() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0B14] text-white relative overflow-hidden selection:bg-blue-500/20">
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

      {/* Back Button */}
      <div className="p-6 relative">
        <Link href="/" className="text-blue-400 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Built for the future
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Leveraging cutting-edge AI and modern web technologies to create a secure, 
            scalable, and lightning-fast social AI platform.
          </p>
        </motion.div>

        {/* Core Features */}
        <div className="space-y-16">
          {/* AI Stack */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-blue-400">AI Stack</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-xl">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Advanced Language Models</h3>
                  <p className="text-gray-400">State-of-the-art LLMs for natural conversation and context understanding</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Real-time Learning</h3>
                  <p className="text-gray-400">Continuous personality adaptation and context awareness</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Security & Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-green-400">Security & Privacy</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Enterprise-grade Security</h3>
                  <p className="text-gray-400">End-to-end encryption, OAuth 2.0, and regular security audits</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Data Protection</h3>
                  <p className="text-gray-400">GDPR-compliant data handling with user privacy at the core</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Technical Architecture */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-purple-400">Modern Stack</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Frontend</p>
                  <p className="font-medium">Next.js 14</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Language</p>
                  <p className="font-medium">TypeScript</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Database</p>
                  <p className="font-medium">Prisma ORM</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Deployment</p>
                  <p className="font-medium">Edge Runtime</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
} 