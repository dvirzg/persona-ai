'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, Users2Icon } from 'lucide-react';
import { SocialGraph } from '@/components/social-graph';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  location: string;
  language: string;
  occupation: string;
}

interface InterestsGoals {
  interests: string[];
  background: string;
  goals: string[];
}

interface Person {
  id: string;
  name: string;
  relationship: string;
  details?: {
    notes?: string;
    interests?: string[];
    birthday?: string;
  };
}

export default function ContextPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    gender: '',
    location: '',
    language: '',
    occupation: '',
  });

  const [interestsGoals, setInterestsGoals] = useState<InterestsGoals>({
    interests: [],
    background: '',
    goals: [],
  });

  const [traits, setTraits] = useState<string[]>([]);
  const [newTrait, setNewTrait] = useState('');

  const [showAddPersonDialog, setShowAddPersonDialog] = useState(false);
  const [newPerson, setNewPerson] = useState<Person>({ 
    id: '', 
    name: '', 
    relationship: '', 
    details: { notes: '' } 
  });
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showEditPersonDialog, setShowEditPersonDialog] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTrait = () => {
    if (newTrait.trim()) {
      setTraits(prev => [...prev, newTrait.trim()]);
      setNewTrait('');
    }
  };

  const handleAddInterest = (interest: string) => {
    if (interest.trim()) {
      setInterestsGoals(prev => ({
        ...prev,
        interests: [...prev.interests, interest.trim()]
      }));
    }
  };

  const handleAddGoal = (goal: string) => {
    if (goal.trim()) {
      setInterestsGoals(prev => ({
        ...prev,
        goals: [...prev.goals, goal.trim()]
      }));
    }
  };

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.relationship) {
      const personToAdd: Person = {
        ...newPerson,
        id: crypto.randomUUID()
      };
      setPeople(prev => [...prev, personToAdd]);
      setNewPerson({ 
        id: '', 
        name: '', 
        relationship: '', 
        details: { notes: '' } 
      });
      setShowAddPersonDialog(false);
    }
  };

  const handleSaveChanges = () => {
    if (selectedPerson) {
      setPeople(prev => prev.map(p => p.id === selectedPerson.id ? selectedPerson : p));
      setSelectedPerson(null);
      setShowEditPersonDialog(false);
    }
  };

  return (
    <div className="flex justify-center w-screen mt-16 pl-[100px]">
      <div className="w-[800px] p-6 space-y-8">
        {/* Personal Information Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg mb-3">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Name:</label>
                  <Input
                    value={personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Age:</label>
                  <Input
                    value={personalInfo.age}
                    onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                    placeholder="Your age"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Gender:</label>
                  <Input
                    value={personalInfo.gender}
                    onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                    placeholder="Your gender"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Location:</label>
                  <Input
                    value={personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    placeholder="Your location"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Language:</label>
                  <Input
                    value={personalInfo.language}
                    onChange={(e) => handlePersonalInfoChange('language', e.target.value)}
                    placeholder="Your primary language"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Occupation:</label>
                  <Input
                    value={personalInfo.occupation}
                    onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                    placeholder="Your occupation"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-3">Interests & Goals</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Interests:</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {interestsGoals.interests.map((interest, index) => (
                      <span key={index} className="bg-secondary px-2 py-1 rounded text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddInterest((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button variant="outline" size="icon">
                      <PlusIcon className="size-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Background:</label>
                  <Textarea
                    value={interestsGoals.background}
                    onChange={(e) => setInterestsGoals(prev => ({ ...prev, background: e.target.value }))}
                    placeholder="Your background"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Goals:</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {interestsGoals.goals.map((goal, index) => (
                      <span key={index} className="bg-secondary px-2 py-1 rounded text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a goal"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddGoal((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button variant="outline" size="icon">
                      <PlusIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personality Traits Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Personality Traits</h2>
            <Button variant="outline" size="sm" onClick={handleAddTrait}>
              <PlusIcon className="size-4 mr-2" />
              Add Trait
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {traits.map((trait, index) => (
              <span key={index} className="bg-secondary px-3 py-1.5 rounded-full text-sm">
                {trait}
              </span>
            ))}
            <Input
              value={newTrait}
              onChange={(e) => setNewTrait(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTrait();
                }
              }}
              placeholder="Add a personality trait"
              className="w-48"
            />
          </div>
        </section>

        {/* Social Graph Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Social Graph</h2>
            <Button variant="outline" size="sm" onClick={() => setShowAddPersonDialog(true)}>
              <Users2Icon className="size-4 mr-2" />
              Add Person
            </Button>
          </div>
          <div className="aspect-square max-w-2xl mx-auto bg-card rounded-xl border overflow-hidden">
            <SocialGraph 
              people={people} 
              onPersonClick={(person) => {
                setSelectedPerson(person);
                setShowEditPersonDialog(true);
              }} 
            />
          </div>
        </section>

        <Dialog open={showAddPersonDialog} onOpenChange={setShowAddPersonDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Person</DialogTitle>
              <DialogDescription>
                Add a new person to your social graph.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Name:</label>
                <Input
                  value={newPerson.name}
                  onChange={(e) => setNewPerson(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Person's name"
                  onSubmit={handleAddPerson}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Relationship:</label>
                <Input
                  value={newPerson.relationship}
                  onChange={(e) => setNewPerson(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder="e.g. Friend, Family, Colleague"
                  onSubmit={handleAddPerson}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Notes:</label>
                <Textarea
                  value={newPerson.details?.notes || ''}
                  onChange={(e) => setNewPerson(prev => ({ 
                    ...prev, 
                    details: { ...prev.details, notes: e.target.value }
                  }))}
                  placeholder="Additional notes about this person"
                  onSubmit={handleAddPerson}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddPersonDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPerson}>
                Add Person
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditPersonDialog} onOpenChange={setShowEditPersonDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Person</DialogTitle>
              <DialogDescription>
                Edit person&apos;s details in your social graph.
              </DialogDescription>
            </DialogHeader>
            {selectedPerson && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name:</label>
                  <Input
                    value={selectedPerson.name}
                    onChange={(e) => setSelectedPerson(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="Person's name"
                    onSubmit={handleSaveChanges}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Relationship:</label>
                  <Input
                    value={selectedPerson.relationship}
                    onChange={(e) => setSelectedPerson(prev => prev ? { ...prev, relationship: e.target.value } : null)}
                    placeholder="e.g. Friend, Family, Colleague"
                    onSubmit={handleSaveChanges}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Notes:</label>
                  <Textarea
                    value={selectedPerson.details?.notes || ''}
                    onChange={(e) => setSelectedPerson(prev => prev ? {
                      ...prev,
                      details: { ...prev.details, notes: e.target.value }
                    } : null)}
                    placeholder="Additional notes about this person"
                    onSubmit={handleSaveChanges}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (selectedPerson) {
                    setPeople(prev => prev.filter(p => p.id !== selectedPerson.id));
                    setSelectedPerson(null);
                    setShowEditPersonDialog(false);
                  }
                }}
              >
                Delete
              </Button>
              <Button variant="outline" onClick={() => setShowEditPersonDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 