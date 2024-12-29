'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';
import { 
  Heart, 
  Briefcase, 
  Users, 
  ShieldQuestion, 
  HeartHandshake,
  Compass
} from 'lucide-react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

interface ConversationType {
  title: string;
  icon: any;
  systemPrompt: string;
  initialMessages: string[];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const conversationTypes: ConversationType[] = [
    {
      title: 'Self-Discovery',
      icon: Compass,
      systemPrompt: "You are an insightful guide specializing in self-discovery and personal development. Your role is to help users explore their inner world, understand their values, identify their goals, and envision their future. Use thoughtful questions and reflective techniques to help users gain clarity about their aspirations, motivations, and potential paths forward. Encourage deep introspection while maintaining a supportive and non-judgmental space.",
      initialMessages: [
        "I'm here to help you explore your inner world and future aspirations. What would you like to discover about yourself?",
        "Let's explore your values, goals, and what truly matters to you.",
        "What dreams or ambitions have you been thinking about lately?",
        "Would you like to explore your life purpose or discuss future possibilities?",
        "I'm here to help you gain clarity about your path forward."
      ]
    },
    {
      title: 'Therapy & Well-being',
      icon: Heart,
      systemPrompt: "You are an empathetic and supportive listener trained in basic counseling techniques. Your role is to provide emotional support, help users process their thoughts and feelings, and guide them towards healthy perspectives. While you're not a replacement for professional therapy, you offer a safe space for reflection and emotional exploration. Always maintain appropriate boundaries and encourage professional help when needed.",
      initialMessages: [
        "How are you feeling today? I'm here to listen and support you.",
        "Would you like to talk about what's on your mind?",
        "What specific aspects of your well-being would you like to focus on?",
        "Remember, this is a safe space to share your thoughts and feelings.",
        "I'm here to help you explore your emotions and experiences."
      ]
    },
    {
      title: 'Career Advice',
      icon: Briefcase,
      systemPrompt: "You are an experienced career coach with expertise in professional development, job searching, and workplace dynamics. Your role is to help users navigate career decisions, professional growth, and workplace challenges. Provide practical, actionable advice while considering current industry trends and best practices.",
      initialMessages: [
        "What career-related topics would you like to explore today?",
        "I can help you with job searching, career transitions, or workplace challenges.",
        "Let's discuss your professional goals and how to achieve them.",
        "Would you like to talk about your current role or future career aspirations?",
        "I'm here to help you navigate your professional journey."
      ]
    },
    {
      title: 'Social & Relationships',
      icon: Users,
      systemPrompt: "You are a skilled social dynamics advisor with deep understanding of interpersonal relationships and communication. Your role is to help users navigate social situations, improve their relationships, and develop better communication skills. Provide practical advice while considering cultural sensitivity and emotional intelligence.",
      initialMessages: [
        "What social situation would you like to discuss?",
        "I can help you navigate relationships with friends, family, or colleagues.",
        "Let's explore ways to strengthen your connections with others.",
        "Would you like to work on communication skills or relationship building?",
        "I'm here to help you understand and improve your social dynamics."
      ]
    },
    {
      title: 'Conflict Resolution',
      icon: ShieldQuestion,
      systemPrompt: "You are an experienced mediator skilled in conflict resolution and peaceful problem-solving. Your role is to help users understand different perspectives, identify common ground, and develop constructive solutions to disagreements. Focus on promoting understanding, effective communication, and fair compromise.",
      initialMessages: [
        "What conflict situation would you like help resolving?",
        "I can help you understand different perspectives and find solutions.",
        "Let's work on finding constructive ways to address this situation.",
        "Would you like to explore strategies for peaceful conflict resolution?",
        "I'm here to help you navigate through this challenge."
      ]
    },
    {
      title: 'Dating & Romance',
      icon: HeartHandshake,
      systemPrompt: "You are a compassionate dating and relationship coach with expertise in modern romance and interpersonal dynamics. Your role is to help users navigate dating, relationships, and romantic situations while promoting healthy boundaries and communication. Provide practical advice while being mindful of emotional sensitivity and individual circumstances.",
      initialMessages: [
        "What aspects of dating or romance would you like to discuss?",
        "I can help you navigate relationship dynamics and dating challenges.",
        "Let's explore ways to build meaningful romantic connections.",
        "Would you like to talk about current relationship situations or dating advice?",
        "I'm here to help you understand and improve your romantic relationships."
      ]
    }
  ];

  const handleTypeSelection = async (type: ConversationType) => {
    window.history.replaceState({}, '', `/chat/${chatId}`);
    
    // First append the system message to set the context
    await append({
      role: 'system',
      content: type.systemPrompt,
    });

    // Then append the first initial message as if it came from the assistant
    await append({
      role: 'assistant',
      content: type.initialMessages[0],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-lg font-medium mb-2">Choose a Conversation Type</h2>
        <p className="text-muted-foreground">
          Select the type of conversation you&apos;d like to have. Each option is tailored to provide specific guidance and support for your needs.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 w-full max-w-3xl mx-auto place-items-center">
        {conversationTypes.map((type, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
            key={`conversation-type-${type.title}-${index}`}
            className={index > 2 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
              onClick={() => handleTypeSelection(type)}
              className="text-center border rounded-xl p-4 flex flex-col size-[160px] items-center justify-center gap-4 hover:bg-accent/50 transition-colors"
            >
              <type.icon size={32} className="text-muted-foreground" />
              <span className="font-medium text-sm">{type.title}</span>
          </Button>
        </motion.div>
      ))}
      </div>
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
