import { create } from 'zustand';

interface UserProfile {
  name?: string;
  age?: number;
  location?: string;
  language?: string;
  occupation?: string;
  background?: string;
}

interface Interest {
  id: string;
  interest: string;
}

interface Goal {
  id: string;
  goal: string;
  completed: boolean;
}

interface Trait {
  id: string;
  trait: string;
}

interface Connection {
  id: string;
  name: string;
  relationship: string;
  details?: {
    notes?: string;
    interests?: string[];
    birthday?: string;
  };
}

interface ContextState {
  profile: UserProfile;
  interests: Interest[];
  goals: Goal[];
  traits: Trait[];
  connections: Connection[];
  isLoading: boolean;
  error: string | null;
  fetchUserContext: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addInterest: (interest: string) => Promise<void>;
  addGoal: (goal: string) => Promise<void>;
  addTrait: (trait: string) => Promise<void>;
  addConnection: (connection: Omit<Connection, 'id'>) => Promise<void>;
}

export const useContextStore = create<ContextState>((set, get) => ({
  profile: {},
  interests: [],
  goals: [],
  traits: [],
  connections: [],
  isLoading: false,
  error: null,

  fetchUserContext: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/context');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      set({
        profile: data,
        interests: data.interests,
        goals: data.goals,
        traits: data.traits,
        connections: data.connections,
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', data }),
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      set({ profile: { ...get().profile, ...data } });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add other methods for interests, goals, traits, and connections...
})); 