'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

export default function TechnicalDetails() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProblemStatement, setShowProblemStatement] = useState(false);

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
        {/* Header Section with Technical Report Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 bg-[#070B19]/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-gray-800/50 mb-16"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
                Persona: Context-Aware Social AI
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                An AI that learns your personal context automatically—your personality, communication style, and social circle—without requiring manual input.
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full text-orange-400 text-sm hover:bg-orange-500/20 transition-colors whitespace-nowrap ml-4"
            >
              {isExpanded ? (
                <>
                  <span>View Summary</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View Full Report</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
          {isExpanded && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              <a href="#mission" className="px-4 py-2 bg-orange-500/10 rounded-full text-orange-400 text-sm whitespace-nowrap hover:bg-orange-500/20 transition-colors">Mission & Problem</a>
              <a href="#pipeline" className="px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm whitespace-nowrap hover:bg-blue-500/20 transition-colors">Technical Pipeline</a>
              <a href="#unique" className="px-4 py-2 bg-purple-500/10 rounded-full text-purple-400 text-sm whitespace-nowrap hover:bg-purple-500/20 transition-colors">Unique Features</a>
              <a href="#timeline" className="px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm whitespace-nowrap hover:bg-green-500/20 transition-colors">Implementation</a>
              <a href="#highlights" className="px-4 py-2 bg-yellow-500/10 rounded-full text-yellow-400 text-sm whitespace-nowrap hover:bg-yellow-500/20 transition-colors">Technical Highlights</a>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Summary View
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <button
                onClick={() => setShowProblemStatement(!showProblemStatement)}
                className="text-blue-400 flex items-center gap-2 mt-4 hover:text-blue-300 transition-colors"
              >
                <span className="text-sm">Why Persona?</span>
                {showProblemStatement ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {showProblemStatement && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl p-4 mt-2 text-gray-400 text-sm leading-relaxed"
                >
                  <p>Generic AI tools like ChatGPT demand constant <span className="text-blue-400">re-explanation of context</span> (relationships, preferences, history). This creates friction for users seeking quick, personalized advice.</p>
                  <p className="mt-2">Persona solves this by <span className="text-blue-400">autonomously learning and applying user-specific context</span>, eliminating the need for tedious "context dumping."</p>
                </motion.div>
              )}

        {/* Core Features */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
                <h2 className="text-2xl font-semibold text-blue-400">Four-Stage Pipeline</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-3 rounded-xl">
                      <span className="text-2xl">👂</span>
                </div>
                <div>
                      <h3 className="text-lg font-medium">Listener</h3>
                      <p className="text-gray-400">Passively learns about your personality and social circle through natural conversations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Fetcher</h3>
                      <p className="text-gray-400">Instantly retrieves relevant insights about you and your relationships</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-3 rounded-xl">
                      <span className="text-2xl">✍️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Writer</h3>
                      <p className="text-gray-400">Crafts responses infused with your unique context and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/10 p-3 rounded-xl">
                      <span className="text-2xl">🎯</span>
                </div>
                <div>
                      <h3 className="text-lg font-medium">Adjuster</h3>
                      <p className="text-gray-400">Fine-tunes responses using Bayesian-guided reinforcement learning</p>
                </div>
              </div>
            </div>
          </motion.section>

              {/* Learning & Adaptation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
                <h2 className="text-2xl font-semibold text-green-400">Hybrid Learning Framework</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                      <span className="text-2xl">🧠</span>
                </div>
                <div>
                      <h3 className="text-lg font-medium">Bayesian Adaptability</h3>
                      <p className="text-gray-400">Dynamic uncertainty-aware updates for personality traits and preferences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                      <span className="text-2xl">🎮</span>
                </div>
                <div>
                      <h3 className="text-lg font-medium">RL-Driven Personalization</h3>
                      <p className="text-gray-400">Continuous style adaptation balanced by Bayesian confidence scores</p>
                </div>
              </div>
            </div>
          </motion.section>

              {/* Technical Stack */}
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
                      <p className="text-sm text-gray-400">Backend</p>
                      <p className="font-medium">FastAPI</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-400">Database</p>
                      <p className="font-medium">Neo4j Graph</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-400">Learning</p>
                      <p className="font-medium">Bayesian RL</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          ) : (
            // Full Technical Report View
            <motion.div
              key="full-report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16 prose prose-invert max-w-none"
            >
              {/* Table of Contents */}
              <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-5 border border-blue-900/20">
                <h2 className="text-xl font-medium text-blue-400 mb-3 mt-0">Table of Contents</h2>
                <ul className="space-y-1.5 list-none pl-0">
                  <li>
                    <a href="#mission" className="text-gray-300 hover:text-blue-400 transition-colors no-underline">1. Mission & Problem Statement</a>
                  </li>
                  <li>
                    <a href="#pipeline" className="text-gray-300 hover:text-blue-400 transition-colors no-underline">2. Core Technical Pipeline</a>
                    <ul className="space-y-1 mt-1 ml-4 list-none">
                      <li><a href="#listener" className="text-gray-400 hover:text-blue-400 transition-colors no-underline text-sm">2.1 Listener: Autonomous Context Learning</a></li>
                      <li><a href="#fetcher" className="text-gray-400 hover:text-blue-400 transition-colors no-underline text-sm">2.2 Fetcher: Real-Time Context Retrieval</a></li>
                      <li><a href="#writer" className="text-gray-400 hover:text-blue-400 transition-colors no-underline text-sm">2.3 Writer: Personalized Response Generation</a></li>
                      <li><a href="#adjuster" className="text-gray-400 hover:text-blue-400 transition-colors no-underline text-sm">2.4 Adjuster: Style & Safety Refinement</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#unique" className="text-gray-300 hover:text-blue-400 transition-colors no-underline">3. What Makes Persona Unique</a>
                  </li>
                  <li>
                    <a href="#timeline" className="text-gray-300 hover:text-blue-400 transition-colors no-underline">4. Implementation Timeline</a>
                  </li>
                  <li>
                    <a href="#highlights" className="text-gray-300 hover:text-blue-400 transition-colors no-underline">5. Technical Highlights</a>
                  </li>
                </ul>
              </div>

              {/* Mission Statement */}
              <div id="mission" className="scroll-mt-32">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-blue-400 mb-6 pb-2 border-b border-blue-900/20">1. Mission & Problem Statement</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-xl font-medium text-orange-400 mb-3">1.1 Mission</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Persona is a conversational AI that <span className="text-orange-400 font-medium">learns your personal context automatically</span>—your personality, communication style, and social circle—without requiring manual input. Designed for <span className="text-orange-400 font-medium">low-burden, high-personalization</span>, it assists with everyday social decisions (e.g., overthinking texts, planning events) and deeper introspection (e.g., career choices, relationship conflicts), while remaining distinct from therapy or virtual friendship.
                      </p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-xl font-medium text-blue-400 mb-3">1.2 Problem Statement</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Generic AI tools like ChatGPT demand constant <span className="text-blue-400 font-medium">re-explanation of context</span> (relationships, preferences, history). This creates friction for users seeking quick, personalized advice. Persona solves this by <span className="text-blue-400 font-medium">autonomously learning and applying user-specific context</span>, eliminating the need for tedious "context dumping."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Technical Pipeline */}
              <div id="pipeline" className="scroll-mt-32">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-purple-400 mb-6 pb-2 border-b border-purple-900/20">2. Core Technical Pipeline</h2>
                  <div className="space-y-8">
                    {/* Listener Component */}
                    <div id="listener" className="scroll-mt-32 bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">2.1 Listener: Autonomous Context Learning</h3>
                      <div className="space-y-3">
                        <p className="text-gray-300"><span className="font-medium">Purpose:</span> Learn about the user's personality, social circle, and communication style passively.</p>
                        <div>
                          <p className="text-gray-300 font-medium mb-2">How It Works:</p>
                          <ul className="space-y-4 text-gray-300">
                            <li className="space-y-1">
                              <p className="font-medium text-blue-400">Entity Extraction</p>
                              <p>Identifies people, events, and recurring themes (e.g., "work stress").</p>
                            </li>
                            <li className="space-y-1">
                              <p className="font-medium text-blue-400">Social Graph Construction</p>
                              <p>Maps relationships (e.g., "Mike is your boyfriend; he dislikes vague plans").</p>
                            </li>
                            <li className="space-y-3">
                              <p className="font-medium text-blue-400">Dynamic Trait Inference</p>
                              <div className="ml-4 space-y-3">
                                <div>
                                  <p className="font-medium text-blue-300">Bayesian Parameter Updating</p>
                                  <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li><span className="text-blue-300">Global Parameters:</span> Priors for universal traits (e.g., <code className="text-blue-300">prefers_direct_communication</code>) shared across users, refined via hierarchical Bayesian models.</li>
                                    <li><span className="text-blue-300">User-Specific Parameters:</span> Traits like <code className="text-blue-300">overthinking_tendency</code> modeled as posterior distributions (e.g., Beta/Gaussian) updated incrementally with each interaction.</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium text-blue-300">Uncertainty Tracking</p>
                                  <p className="mt-2">Confidence intervals (e.g., <code className="text-blue-300">trust_issues = 0.7 ± 0.1</code>) guide adaptive responses.</p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Fetcher Component */}
                    <div id="fetcher" className="scroll-mt-32 bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-2xl font-semibold text-purple-400 mb-4">2.2 Fetcher: Real-Time Context Retrieval</h3>
                      <div className="space-y-3">
                        <p className="text-gray-300"><span className="font-medium">Purpose:</span> Fetch relevant insights about the user instantly.</p>
                        <div>
                          <p className="text-gray-300 font-medium mb-2">How It Works:</p>
                          <ul className="space-y-4 text-gray-300">
                            <li className="space-y-2">
                              <p className="font-medium text-purple-400">Semantic Search</p>
                              <p>Matches current conversations to past themes (e.g., "crush texts" → previous analysis).</p>
                            </li>
                            <li className="space-y-2">
                              <p className="font-medium text-purple-400">Social Graph Queries</p>
                              <p>Traverses relationships to ground advice in known context.</p>
                            </li>
                            <li className="space-y-2">
                              <p className="font-medium text-purple-400">Low-Effort Onboarding</p>
                              <p>Short-term hooks (e.g., Instagram ratings, compatibility quizzes) seed initial data.</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Writer Component */}
                    <div id="writer" className="scroll-mt-32 bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-2xl font-semibold text-green-400 mb-4">2.3 Writer: Personalized Response Generation</h3>
                      <div className="space-y-3">
                        <p className="text-gray-300"><span className="font-medium">Purpose:</span> Craft responses infused with the user's unique context.</p>
                        <div>
                          <p className="text-gray-300 font-medium mb-2">How It Works:</p>
                          <ul className="space-y-4 text-gray-300">
                            <li className="space-y-2">
                              <p className="font-medium text-green-400">Lightweight Mode</p>
                              <p>For casual queries (e.g., "Which Instagram post?"), uses basic preferences (humor, aesthetics).</p>
                            </li>
                            <li className="space-y-2">
                              <p className="font-medium text-green-400">Deep Mode</p>
                              <p>For critical decisions (e.g., breakups), references past events and traits (e.g., "You value honesty—here's how to approach this").</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Adjuster Component */}
                    <div id="adjuster" className="scroll-mt-32 bg-gray-900/30 rounded-xl p-5">
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">2.4 Adjuster: Style & Safety Refinement</h3>
                      <div className="space-y-3">
                        <p className="text-gray-300"><span className="font-medium">Purpose:</span> Tailor responses to the user's tone and guard against harm.</p>
                        <div>
                          <p className="text-gray-300 font-medium mb-2">How It Works:</p>
                          <ul className="space-y-6 text-gray-300">
                            <li className="space-y-4">
                              <p className="font-medium text-yellow-400">Style Adaptation</p>
                              <ul className="ml-4 space-y-4">
                                <li>
                                  <p className="font-medium text-yellow-300">Bayesian-Guided RL</p>
                                  <p>Reinforcement learning policies (e.g., PPO) optimize style choices (humor, formality) using rewards weighted by Bayesian confidence scores.</p>
                                </li>
                                <li>
                                  <p className="font-medium text-yellow-300">Example</p>
                                  <p>High uncertainty in <code className="text-yellow-300">prefers_sarcasm</code> triggers RL exploration of playful vs. serious tones.</p>
                                </li>
                              </ul>
                            </li>
                            <li className="space-y-2">
                              <p className="font-medium text-yellow-400">Safety Guardrails</p>
                              <p>Avoids triggering topics and biases (e.g., gender stereotypes).</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Makes Persona Unique */}
              <div id="unique" className="scroll-mt-32">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6 pb-2 border-b border-orange-900/20">3. What Makes Persona Unique</h2>
                  <div className="bg-gray-900/30 rounded-xl p-5">
                    <ul className="space-y-4 text-gray-300 list-none pl-0">
                      <li className="bg-gray-900/30 p-3 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-400 mb-1">3.1 No Manual Context</h4>
                        <p>Learns implicitly through conversation—no prompts like "Remember my boyfriend Mike."</p>
                      </li>
                      <li className="bg-gray-900/30 p-3 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-400 mb-1">3.2 Socially Grounded Advice</h4>
                        <p>Rooted in your real-world relationships (e.g., "Jessie dislikes vague plans").</p>
                      </li>
                      <li className="bg-gray-900/30 p-3 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-400 mb-1">3.3 Dual-Mode Utility</h4>
                        <p>Handles lightweight tasks (e.g., analyzing texts) and deep introspection (e.g., career decisions).</p>
                      </li>
                      <li className="bg-gray-900/30 p-3 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-400 mb-1">3.4 Hybrid Learning Framework</h4>
                        <p>Combines Bayesian adaptability (dynamic uncertainty-aware updates) with RL-driven personalization for human-like responsiveness.</p>
                      </li>
                      <li className="bg-gray-900/30 p-3 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-400 mb-1">3.5 Not Therapy or a Friend</h4>
                        <p>Focuses on practical problem-solving, avoiding emotional dependency.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div id="timeline" className="scroll-mt-32">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-green-400 mb-6 pb-2 border-b border-green-900/20">4. Implementation Timeline</h2>
                  <div className="space-y-6">
                    {/* Phase 1 */}
                    <div className="bg-gray-900/30 rounded-xl p-6">
                      <h3 className="text-xl font-medium text-blue-400 mb-4">Phase 1: Core Pipeline & Onboarding Hooks (0-3 Months)</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="font-medium text-blue-300 mb-2">MVP Launch</p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Listener: Basic Bayesian priors for global parameters + entity extraction</li>
                            <li>Fetcher: Keyword-based retrieval + semantic search for small datasets</li>
                            <li>Writer: Template-driven responses with simple personalization</li>
                            <li>Adjuster: Rule-based style adjustments (e.g., add emojis if user does)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-blue-300 mb-2">Short-Term Hooks</p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Social Media Analysis: Rate Instagram/LinkedIn posts using CLIP embeddings and sentiment analysis</li>
                            <li>Group Compatibility Quizzes: Fun, low-effort activities to build social context</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="bg-gray-900/30 rounded-xl p-6">
                      <h3 className="text-xl font-medium text-blue-400 mb-4">Phase 2: Dynamic Personalization (3-6 Months)</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="font-medium text-blue-300 mb-2">Advanced Listener</p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Hierarchical Bayesian Models: Global parameters inform priors for user-specific traits</li>
                            <li>Unsupervised Topic Modeling: Auto-discovers themes to refine dynamic parameters</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-blue-300 mb-2">System Improvements</p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Hybrid Fetcher: Graph database integration for relationship-aware queries</li>
                            <li>Bayesian-Enhanced RL: Policies use posterior confidence to balance exploration/exploitation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="bg-gray-900/30 rounded-xl p-6">
                      <h3 className="text-xl font-medium text-blue-400 mb-4">Phase 3: Scalability & Privacy (6-9 Months)</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                        <li>Distributed Architecture: Docker/Kubernetes deployment for horizontal scaling</li>
                        <li>Anonymization: Data masking and differential privacy for sensitive metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Highlights */}
              <div id="highlights" className="scroll-mt-32">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6 pb-2 border-b border-yellow-900/20">5. Technical Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900/30 rounded-xl p-6 border border-green-900/20">
                      <h3 className="text-xl font-medium text-green-400 mb-4">Bayesian-Integrated Learning</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-green-300 mb-2">Global vs. User-Specific Parameters</p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Global: Priors for universal traits learned across all users</li>
                            <li>User-Specific: Dynamic posteriors updated via Bayes' theorem</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-green-300 mb-2">Uncertainty-Driven Adaptation</p>
                          <p className="text-gray-300 ml-4">High uncertainty in traits triggers cautious responses or exploratory RL actions</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-gray-900/30 rounded-xl p-6 border border-green-900/20">
                        <h3 className="text-xl font-medium text-green-400 mb-4">Hybrid Retrieval</h3>
                        <p className="text-gray-300">Combines vector embeddings (e.g., Sentence-BERT) with keyword matching</p>
                      </div>

                      <div className="bg-gray-900/30 rounded-xl p-6 border border-green-900/20">
                        <h3 className="text-xl font-medium text-green-400 mb-4">Tiered Response Generation</h3>
                        <p className="text-gray-300">Distillation to smaller models for common queries, reserving GPT-4 for complex tasks</p>
                      </div>

                      <div className="bg-gray-900/30 rounded-xl p-6 border border-green-900/20">
                        <h3 className="text-xl font-medium text-green-400 mb-4">Safety & Adaptability</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                          <li>Bias Mitigation: Counterfactual training to reduce stereotypes</li>
                          <li>Style RL: Continuously adapts communication to user preferences</li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
            </div>

              {/* Conclusion */}
              <div className="bg-gray-900/30 rounded-xl p-5 mt-12">
                <h2 className="text-3xl font-bold text-blue-400 mb-4">Conclusion</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Persona bridges the gap between transactional chatbots and human-like understanding by <span className="text-orange-400 font-medium">automating context learning</span> and focusing on <span className="text-orange-400 font-medium">real-world social utility</span>. Its modular pipeline allows iterative development, starting with lightweight personalization and scaling to deep introspection—all while minimizing user effort. By combining <span className="text-orange-400 font-medium">Bayesian adaptability</span> with <span className="text-orange-400 font-medium">RL-driven personalization</span>, Persona dynamically balances confidence and exploration, ensuring responses are both personalized and contextually aware. Prioritizing privacy, scalability, and practical problem-solving, Persona redefines how AI can serve as a <span className="text-orange-400 font-medium">low-burden thought partner</span> for modern life.
                </p>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 