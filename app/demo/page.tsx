'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, User, Brain, MessageSquare, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

// Test personas from our database
const TEST_PERSONAS = [
  {
    id: 'emily',
    name: 'Emily Zhang',
    role: 'Technical Professional',
    description: 'Senior Systems Architect focused on distributed systems and quantum computing',
    traits: ['analytical', 'precise', 'intellectual', 'curious', 'systematic'],
    color: 'blue'
  },
  {
    id: 'sophie',
    name: 'Sophie Martinez',
    role: 'Emotional Support Seeker',
    description: 'Social Worker dealing with relationship dynamics and personal growth',
    traits: ['empathetic', 'emotional', 'introspective', 'sensitive', 'caring'],
    color: 'purple'
  },
  {
    id: 'tom',
    name: 'Tom Chen',
    role: 'University Student',
    description: 'CS student balancing academics, gaming, and social life',
    traits: ['adaptable', 'enthusiastic', 'social', 'sometimes anxious', 'creative'],
    color: 'green'
  },
  {
    id: 'michael',
    name: 'Michael Ross',
    role: 'Conflict Navigator',
    description: 'Project Manager handling workplace dynamics and team conflicts',
    traits: ['assertive', 'strong-willed', 'direct', 'passionate', 'defensive'],
    color: 'orange'
  },
  {
    id: 'maya',
    name: 'Maya Patel',
    role: 'Self-Discovery Journey',
    description: 'Freelance Writer exploring creative expression and purpose',
    traits: ['curious', 'reflective', 'indecisive', 'creative', 'searching'],
    color: 'yellow'
  },
  {
    id: 'jordan',
    name: 'Jordan Taylor',
    role: 'Social Navigator',
    description: 'Marketing Assistant managing social anxiety and relationships',
    traits: ['friendly', 'anxious', 'caring', 'overthinking', 'people-pleasing'],
    color: 'pink'
  }
];

const TEST_PROMPTS = [
  {
    id: 'technical',
    title: 'Technical Discussion',
    prompt: 'Can you explain how distributed consensus algorithms work in a way that matches my background?'
  },
  {
    id: 'emotional',
    title: 'Emotional Support',
    prompt: 'I\'ve been feeling overwhelmed with work lately and it\'s affecting my relationships. How can I handle this better?'
  },
  {
    id: 'social',
    title: 'Social Advice',
    prompt: 'I\'m not sure how to approach someone I\'m interested in at university. What would be a good way to start a conversation?'
  },
  {
    id: 'conflict',
    title: 'Conflict Resolution',
    prompt: 'My team lead keeps undermining my decisions in meetings. How should I address this situation?'
  },
  {
    id: 'career',
    title: 'Career Guidance',
    prompt: 'I\'m considering a career change but feeling uncertain about the direction. How can I explore my options?'
  }
];

export default function DemoPage() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showPersonaSelect, setShowPersonaSelect] = useState(false);
  const [showPromptSelect, setShowPromptSelect] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedPersonaData = TEST_PERSONAS.find(p => p.id === selectedPersona);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0B14] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-[#070B19]" />
        <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh-reverse" />
        <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col">
        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 bg-[#070B19]/95 backdrop-blur-md border-b border-gray-800/50">
          <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-blue-400 flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
              Back
            </Link>
            {selectedPersona && (
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-full bg-${selectedPersonaData?.color}-500/20 border border-${selectedPersonaData?.color}-500/30`}>
                  <span className={`text-sm font-medium text-${selectedPersonaData?.color}-400`}>
                    {selectedPersonaData?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        {isMobile ? (
          <>
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-blue-100 to-white">
                    Experience Persona
                  </h1>
                  <p className="text-gray-400">
                    See how Persona adapts its responses based on different personalities and contexts.
                  </p>
                </div>

                {/* Steps Progress - Now Interactive */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => !selectedPrompt && setShowPersonaSelect(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all ${
                      !selectedPersona 
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                        : 'bg-green-500/20 border-green-500/50 text-green-400'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedPersona 
                        ? selectedPersonaData?.name 
                        : 'Choose Persona'
                      }
                    </span>
                  </button>
                  <button
                    onClick={() => selectedPersona && !showComparison && setShowPromptSelect(true)}
                    disabled={!selectedPersona}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all ${
                      !selectedPersona 
                        ? 'bg-gray-800/50 border-gray-700/50 text-gray-500'
                        : selectedPrompt
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedPrompt 
                        ? TEST_PROMPTS.find(p => p.id === selectedPrompt)?.title
                        : 'Select Prompt'
                      }
                    </span>
                  </button>
                </div>

                {/* Response Area */}
                {!showComparison ? (
                  <div className="h-[50vh] flex items-center justify-center text-gray-400 text-center">
                    <div className="max-w-[280px]">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p className="text-lg mb-2">Select a persona and prompt</p>
                      <p className="text-sm text-gray-500">Watch how Persona adapts its response based on context</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800/50 overflow-hidden">
                      <div className="p-4 border-b border-gray-800/50 bg-gray-900/50">
                        <h3 className="text-lg font-medium text-blue-400 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Persona Response
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800/50 overflow-hidden">
                      <div className="p-4 border-b border-gray-800/50 bg-gray-900/50">
                        <h3 className="text-lg font-medium text-purple-400 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          ChatGPT Response
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selection Sheets */}
            <AnimatePresence>
              {showPersonaSelect && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPersonaSelect(false)}
                    className="fixed inset-0 bg-black/60 z-[60]"
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 bg-[#0A0B14] rounded-t-[32px] z-[70] max-h-[85vh] overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))]"
                  >
                    <div className="p-4">
                      <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-6" />
                      <h2 className="text-xl font-semibold mb-2">Choose a Persona</h2>
                      <p className="text-gray-400 text-sm mb-6">Select a test persona to see personalized responses</p>
                      <div className="grid grid-cols-2 gap-3">
                        {TEST_PERSONAS.map((persona) => (
                          <button
                            key={persona.id}
                            onClick={() => {
                              setSelectedPersona(persona.id);
                              setShowPersonaSelect(false);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              selectedPersona === persona.id
                                ? `bg-${persona.color}-500/20 border-${persona.color}-500/50`
                                : 'bg-gray-900/50 border-gray-800/50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-2xl bg-${persona.color}-500/20 border border-${persona.color}-500/30 flex items-center justify-center mb-3`}>
                              {persona.id === 'emily' && <span className="text-2xl">👩‍💻</span>}
                              {persona.id === 'sophie' && <span className="text-2xl">🤗</span>}
                              {persona.id === 'tom' && <span className="text-2xl">👨‍🎓</span>}
                              {persona.id === 'michael' && <span className="text-2xl">👨‍💼</span>}
                              {persona.id === 'maya' && <span className="text-2xl">🎨</span>}
                              {persona.id === 'jordan' && <span className="text-2xl">😊</span>}
                            </div>
                            <h3 className={`text-base font-medium mb-1 ${
                              selectedPersona === persona.id ? `text-${persona.color}-400` : 'text-white'
                            }`}>
                              {persona.name}
                            </h3>
                            <p className="text-sm text-gray-400">{persona.role}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {showPromptSelect && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPromptSelect(false)}
                    className="fixed inset-0 bg-black/60 z-[60]"
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 bg-[#0A0B14] rounded-t-[32px] z-[70] max-h-[85vh] overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))]"
                  >
                    <div className="p-4">
                      <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-6" />
                      <h2 className="text-xl font-semibold mb-2">Choose a Prompt</h2>
                      <p className="text-gray-400 text-sm mb-6">Select a test prompt to see the response</p>
                      <div className="space-y-3">
                        {TEST_PROMPTS.map((prompt) => (
                          <button
                            key={prompt.id}
                            onClick={() => {
                              setSelectedPrompt(prompt.id);
                              setShowComparison(true);
                              setShowPromptSelect(false);
                            }}
                            className={`w-full p-4 rounded-2xl border text-left transition-all ${
                              selectedPrompt === prompt.id
                                ? 'bg-blue-500/20 border-blue-500/50'
                                : 'bg-gray-900/50 border-gray-800/50'
                            }`}
                          >
                            <h3 className={`text-base font-medium mb-2 ${
                              selectedPrompt === prompt.id ? 'text-blue-400' : 'text-white'
                            }`}>
                              {prompt.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{prompt.prompt}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex-1 flex overflow-hidden w-full">
            {/* Left Panel - Selection Controls */}
            <div className="w-[40%] border-r border-gray-800/50 overflow-y-auto">
              <div className="p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-blue-100 to-white">
                    Experience Persona
                  </h1>
                  <p className="text-gray-400 text-lg max-w-xl">
                    See how Persona adapts its responses based on different personalities and contexts.
                  </p>
                </div>

                {/* Steps Progress */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${!selectedPersona ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-green-500/20 border-green-500/50 text-green-400'} border`}>
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Choose Persona</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${selectedPersona && !selectedPrompt ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : selectedPrompt ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-gray-800/50 border-gray-700/50 text-gray-500'} border`}>
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">Select Prompt</span>
                  </div>
                </div>

                {/* Persona Selection */}
                <section className="mb-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-3 mb-1">
                      <User className="w-5 h-5 text-blue-400" />
                      <span>Choose a Test Persona</span>
                    </h2>
                    <p className="text-sm text-gray-500 ml-8">Hover or click for details</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {TEST_PERSONAS.map((persona) => (
                      <motion.div
                        key={persona.id}
                        className="relative"
                        onHoverStart={() => setExpandedPersona(persona.id)}
                        onHoverEnd={() => setExpandedPersona(null)}
                      >
                        <motion.button
                          onClick={() => {
                            setSelectedPersona(persona.id);
                            setExpandedPersona(persona.id);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full aspect-square p-4 rounded-xl border text-left transition-all duration-300 overflow-hidden ${
                            selectedPersona === persona.id
                              ? `bg-${persona.color}-500/20 border-${persona.color}-500/50`
                              : 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70'
                          }`}
                        >
                          <div className="h-full flex flex-col">
                            <AnimatePresence mode="wait">
                              {(expandedPersona === persona.id || selectedPersona === persona.id) ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="h-full flex flex-col"
                                >
                                  {/* Header */}
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-${persona.color}-500/20 shrink-0`}>
                                      <Brain className={`w-5 h-5 text-${persona.color}-400`} />
                                    </div>
                                    <div className="min-w-0">
                                      <h3 className={`text-base font-medium truncate ${
                                        selectedPersona === persona.id ? `text-${persona.color}-400` : 'text-white'
                                      }`}>
                                        {persona.name}
                                      </h3>
                                      <p className="text-sm text-gray-400 truncate">{persona.role}</p>
                                    </div>
                                  </div>
                                  {/* Description and Traits */}
                                  <div className="flex-1 flex flex-col">
                                    <p className="text-sm text-gray-300 mb-auto line-clamp-3">{persona.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                      {persona.traits.slice(0, 3).map((trait, index) => (
                                        <span
                                          key={index}
                                          className={`px-2 py-0.5 rounded-full text-xs ${
                                            selectedPersona === persona.id
                                              ? `bg-${persona.color}-500/20 text-${persona.color}-400`
                                              : 'bg-gray-800 text-gray-400'
                                          }`}
                                        >
                                          {trait}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="h-full flex flex-col items-center justify-center text-center p-3"
                                >
                                  <div className={`w-20 h-20 rounded-xl bg-${persona.color}-500/20 border border-${persona.color}-500/30 flex items-center justify-center mb-3`}>
                                    {persona.id === 'emily' && <span className="text-4xl">👩‍💻</span>}
                                    {persona.id === 'sophie' && <span className="text-4xl">🤗</span>}
                                    {persona.id === 'tom' && <span className="text-4xl">👨‍🎓</span>}
                                    {persona.id === 'michael' && <span className="text-4xl">👨‍💼</span>}
                                    {persona.id === 'maya' && <span className="text-4xl">🎨</span>}
                                    {persona.id === 'jordan' && <span className="text-4xl">😊</span>}
                                  </div>
                                  <h3 className={`text-base font-medium mb-1 ${
                                    selectedPersona === persona.id ? `text-${persona.color}-400` : 'text-white'
                                  }`}>
                                    {persona.name}
                                  </h3>
                                  <p className="text-sm text-gray-400">{persona.role}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Prompt Selection */}
                {selectedPersona && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      <span>Choose a Test Prompt</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {TEST_PROMPTS.map((prompt) => (
                        <motion.button
                          key={prompt.id}
                          onClick={() => {
                            setSelectedPrompt(prompt.id);
                            setShowComparison(true);
                          }}
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                          className={`p-4 rounded-xl border transition-colors ${
                            selectedPrompt === prompt.id
                              ? 'bg-blue-500/20 border-blue-500/50'
                              : 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70'
                          }`}
                        >
                          <h3 className={`text-base font-medium mb-2 ${
                            selectedPrompt === prompt.id ? 'text-blue-400' : 'text-white'
                          }`}>
                            {prompt.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{prompt.prompt}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>
            </div>

            {/* Right Panel - Comparison View */}
            <div className="flex-1 overflow-y-auto bg-gray-900/30">
              <div className="p-8">
                <div className="sticky top-0 pb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>Response Comparison</span>
                  </h2>
                </div>
                
                {!showComparison ? (
                  <div className="h-[80vh] flex items-center justify-center text-gray-400 text-center">
                    <div className="max-w-md">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p className="text-lg mb-2">Select a persona and prompt to see the comparison</p>
                      <p className="text-sm text-gray-500">Watch how Persona adapts its response based on the selected context</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gray-900/50 rounded-xl border border-gray-800/50 overflow-hidden">
                      <div className="p-4 border-b border-gray-800/50 bg-gray-900/50">
                        <h3 className="text-lg font-medium text-blue-400 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Persona Response
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl border border-gray-800/50 overflow-hidden">
                      <div className="p-4 border-b border-gray-800/50 bg-gray-900/50">
                        <h3 className="text-lg font-medium text-purple-400 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          ChatGPT Response
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 