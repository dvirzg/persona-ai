'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Brain, ChevronLeft, Sparkles } from 'lucide-react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { register } from '../actions';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setEmail(formData.get('email') as string);
      const result = await register(formData);
      
      if (result.status === 'user_exists') {
        toast.error('Account already exists');
      } else if (result.status === 'failed') {
        toast.error('Failed to create account');
      } else if (result.status === 'invalid_data') {
        toast.error('Failed validating your submission!');
      } else if (result.status === 'success') {
        toast.success('Account created successfully');
        setIsSuccessful(true);
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

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
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
      </div>

      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-6 left-6 text-blue-400 flex items-center gap-2 hover:text-blue-300 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back</span>
      </Link>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] space-y-8 shadow-2xl shadow-black/20">
          {/* Logo and Title */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/30 border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-7 h-7 text-orange-400" />
            </motion.div>
            <div>
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-orange-100 to-white mb-2"
              >
                Create Account
              </motion.h3>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm"
              >
                Join Persona to get started with personalized AI
              </motion.p>
            </div>
          </div>

          {/* Form */}
          <AuthForm onSubmit={handleSubmit} defaultEmail={email}>
            <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
            
            {/* Links */}
            <div className="space-y-4 mt-6">
              <div className="text-center">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-sm"
                >
                  {'Already have an account? '}
                  <Link
                    href="/login"
                    className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                  >
                    Sign in
                  </Link>
                  {' instead'}
                </motion.p>
              </div>
            </div>
          </AuthForm>
        </div>

        {/* Features List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-4 px-4"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-900/30 to-gray-900/20 backdrop-blur-xl rounded-xl p-4 border border-white/[0.05] hover:border-orange-500/20 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <h4 className="text-lg font-medium text-white mb-4">Why Choose Persona?</h4>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 bg-gradient-to-br from-white/[0.02] to-white/[0.05] p-3 rounded-xl border border-white/[0.05] hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-sm text-gray-400">Personalized AI Assistant</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 bg-gradient-to-br from-white/[0.02] to-white/[0.05] p-3 rounded-xl border border-white/[0.05] hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-orange-400">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-400">Zero Context Dumping</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
