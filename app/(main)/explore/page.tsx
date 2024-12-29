"use client";

import { BrainCircuitIcon, LineChartIcon, SparklesIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ExplorePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: "personality",
      icon: BrainCircuitIcon,
      title: "Personality Insights",
      description: "Your personality analysis and traits will appear here as we learn more about you through our conversations.",
      expandedContent: (
        <div className="space-y-4">
          <p>Detailed personality analysis will be shown here, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Key personality traits</li>
            <li>Communication style</li>
            <li>Decision-making patterns</li>
            <li>Social interaction preferences</li>
          </ul>
        </div>
      )
    },
    {
      id: "trends",
      icon: LineChartIcon,
      title: "Conversation Trends",
      description: "Insights about your conversation patterns and preferences will be shown here.",
      expandedContent: (
        <div className="space-y-4">
          <p>Detailed conversation analysis will be shown here, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Most discussed topics</li>
            <li>Conversation frequency</li>
            <li>Response patterns</li>
            <li>Engagement metrics</li>
          </ul>
        </div>
      )
    },
    {
      id: "topics",
      icon: SparklesIcon,
      title: "Recommended Topics",
      description: "Based on your conversations and interests, we'll suggest topics and people you might want to discuss.",
      expandedContent: (
        <div className="space-y-4">
          <p>Personalized recommendations will appear here, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Topics based on your interests</li>
            <li>Suggested conversation starters</li>
            <li>Related discussion themes</li>
            <li>Learning opportunities</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="flex justify-center w-screen mt-16">
      <div className="w-[800px] p-6 space-y-4">
        <h1 className="text-3xl font-bold mb-8">For You</h1>
        
        {expandedSection ? (
          <div className="space-y-4">
            {sections.map(section => section.id === expandedSection && (
              <Card key={section.id} className="bg-card border rounded-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                  <div className="flex items-center gap-2">
                    <section.icon className="w-6 h-6 text-blue-500" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpandedSection(null)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {section.expandedContent}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map(section => (
              <Card 
                key={section.id} 
                className="bg-card border rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => setExpandedSection(section.id)}
              >
                <CardHeader className="flex flex-row items-center gap-2 p-6">
                  <section.icon className="w-6 h-6 text-blue-500" />
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-muted-foreground">
                  {section.description}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 