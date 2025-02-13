'use client';

import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Heart, Users, ShieldQuestion, HeartHandshake } from 'lucide-react';
import { useState } from 'react';

const CONTEXT_PROMPTS = {
  'Self-Discovery': 'You are an insightful guide specializing in self-discovery and personal development. Your role is to help users explore their inner world, understand their values, identify their goals, and envision their future. Use thoughtful questions and reflective techniques to help users gain clarity about their aspirations, motivations, and potential paths forward. Encourage deep introspection while maintaining a supportive and non-judgmental space.',
  'Therapy & Well-being': 'You are a supportive guide focused on emotional well-being and mental health. Your role is to provide a safe space for users to explore their feelings, cope with challenges, and develop healthy mental habits. Use empathetic listening and evidence-based techniques while maintaining appropriate boundaries and referring to professional help when needed.',
  'Career Advice': 'You are a career development specialist helping users navigate their professional journey. Your role is to help users explore career options, develop skills, and make informed decisions about their professional growth. Use industry insights and practical strategies while considering each user\'s unique circumstances and goals.',
  'Social & Relationships': 'You are a relationship and social skills coach helping users build meaningful connections. Your role is to help users improve their communication, understand relationship dynamics, and develop healthy social habits. Provide practical advice while considering cultural context and individual comfort levels.',
  'Conflict Resolution': 'You are a conflict resolution specialist helping users navigate disagreements constructively. Your role is to help users understand different perspectives, develop effective communication strategies, and find win-win solutions. Maintain neutrality while promoting understanding and peaceful resolution.',
  'Dating & Romance': 'You are a dating and relationship advisor helping users navigate romantic situations. Your role is to help users build healthy relationships, understand dating dynamics, and make authentic connections. Provide practical guidance while respecting boundaries and promoting emotional well-being.'
};

export default function ChatPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setChatId(generateUUID());
  };

  if (selectedType && chatId) {
    return (
      <div className="w-full h-screen flex flex-col bg-[#070B19] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#070B19]" />
          <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh" />
          <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh-reverse" />
          <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
        </div>

        <div className="relative flex flex-col h-full">
          {/* Chat Interface */}
          <Chat 
            id={chatId}
            initialMessages={[{
              id: generateUUID(),
              role: 'assistant',
              content: `Welcome! I see you'd like to discuss ${selectedType}. How can I help you today?`,
              createdAt: new Date()
            }]}
            selectedModelId="default"
            selectedVisibilityType="private"
            isReadonly={false}
            contextPrompt={CONTEXT_PROMPTS[selectedType as keyof typeof CONTEXT_PROMPTS]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-[#070B19] text-white relative overflow-hidden selection:bg-blue-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#070B19]" />
        <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh-reverse" />
        <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-blue-100 to-white mb-3">
              Choose a Conversation Type
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Select the type of conversation you'd like to have. Each option is tailored to provide specific guidance and support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {/* Self-Discovery */}
            <motion.button
              onClick={() => handleTypeSelect('Self-Discovery')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">Self-Discovery</h3>
              <p className="text-sm text-gray-400">Explore personal growth and understand yourself better through guided introspection.</p>
            </motion.button>

            {/* Therapy & Well-being */}
            <motion.button
              onClick={() => handleTypeSelect('Therapy & Well-being')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-purple-400 transition-colors">Therapy & Well-being</h3>
              <p className="text-sm text-gray-400">Support for emotional well-being and mental health through compassionate conversation.</p>
            </motion.button>

            {/* Career Advice */}
            <motion.button
              onClick={() => handleTypeSelect('Career Advice')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-green-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-green-400 transition-colors">Career Advice</h3>
              <p className="text-sm text-gray-400">Navigate professional challenges and career development with expert guidance.</p>
            </motion.button>

            {/* Social & Relationships */}
            <motion.button
              onClick={() => handleTypeSelect('Social & Relationships')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-orange-400 transition-colors">Social & Relationships</h3>
              <p className="text-sm text-gray-400">Improve your relationships and social skills with personalized advice.</p>
            </motion.button>

            {/* Conflict Resolution */}
            <motion.button
              onClick={() => handleTypeSelect('Conflict Resolution')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-yellow-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-yellow-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldQuestion className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-yellow-400 transition-colors">Conflict Resolution</h3>
              <p className="text-sm text-gray-400">Find constructive solutions to disagreements and navigate difficult conversations.</p>
            </motion.button>

            {/* Dating & Romance */}
            <motion.button
              onClick={() => handleTypeSelect('Dating & Romance')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-pink-500/30 transition-all duration-300 hover:bg-white/[0.06] text-left hover:shadow-xl hover:shadow-pink-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <HeartHandshake className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-pink-400 transition-colors">Dating & Romance</h3>
              <p className="text-sm text-gray-400">Get guidance on dating, relationships, and romantic situations.</p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 