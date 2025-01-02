'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button } from './ui/button';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface SocialGraphProps {
  people: Person[];
  onPersonClick?: (person: Person) => void;
}

export function SocialGraph({ people, onPersonClick }: SocialGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown>>();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous content
    svg.selectAll('*').remove();

    // Add dotted background pattern
    const defs = svg.append('defs');
    defs.append('pattern')
      .attr('id', 'dot-pattern')
      .attr('width', 20)
      .attr('height', 20)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 1)
      .attr('fill', 'rgb(209, 213, 219)');

    // Create a container for all elements
    const container = svg.append('g')
      .attr('class', 'container');

    // Add background with pattern that covers the entire SVG
    container.append('rect')
      .attr('x', -width * 5)
      .attr('y', -height * 5)
      .attr('width', width * 10)
      .attr('height', height * 10)
      .attr('fill', 'url(#dot-pattern)');

    // Create a group for all the content that should be centered
    const contentGroup = container.append('g')
      .attr('class', 'content')
      .attr('transform', `translate(${width/2},${height/2})`);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    zoomRef.current = zoom;
    svg.call(zoom);
    
    // Set initial transform to center the content
    svg.call(zoom.transform, d3.zoomIdentity.translate(width * 0.1, height * 0.1));

    // Create the central "Me" node
    const meNode = contentGroup.append('g')
      .attr('transform', 'translate(0,0)');

    meNode.append('circle')
      .attr('r', 50)  // Increased size
      .attr('fill', 'rgb(59, 130, 246)')
      .attr('class', 'transition-colors duration-200 hover:fill-blue-600');

    meNode.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .attr('class', 'text-lg font-medium select-none')  // Increased text size
      .text('Me');

    // Calculate positions for other nodes in a circle around the center
    const radius = Math.min(width, height) * 0.25;  // Reduced to bring nodes closer
    const angleStep = (2 * Math.PI) / people.length;

    people.forEach((person, i) => {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Draw connection line
      const line = contentGroup.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'rgb(209, 213, 219)')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '4')
        .attr('class', 'transition-colors duration-200');

      // Add relationship label above the line
      const labelX = (radius * 0.5) * Math.cos(angle);
      const labelY = (radius * 0.5) * Math.sin(angle) - 10;

      contentGroup.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'rgb(156, 163, 175)')
        .attr('class', 'text-sm font-medium select-none')  // Increased from xs
        .text(person.relationship);

      // Create person node group
      const personNode = contentGroup.append('g')
        .attr('transform', `translate(${x},${y})`);

      // Add hover and click handlers to the group
      personNode
        .style('cursor', 'pointer')
        .on('click', () => {
          setSelectedPerson(person);
        });

      // Add circle with hover effect
      personNode.append('circle')
        .attr('r', 45)  // Increased size
        .attr('fill', 'rgb(99, 102, 241)')
        .attr('class', 'transition-colors duration-200')
        .style('transform-origin', 'center')
        .on('mouseover', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', 'rgb(79, 82, 241)')
            .attr('r', 47);  // Increased hover size
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', 'rgb(99, 102, 241)')
            .attr('r', 45);  // Match base size
        });

      // Add text label
      personNode.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'white')
        .attr('class', 'text-sm font-medium select-none')
        .text(person.name);
    });

  }, [people, onPersonClick]);

  const handleZoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.2);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 0.8);
  };

  const handleRecenter = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div className={cn(
        'relative rounded-xl border bg-card overflow-hidden backdrop-blur-sm',
        isExpanded 
          ? 'fixed inset-4 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:h-[800px] z-50 shadow-xl' 
          : 'w-full h-full'
      )}>
        <div className="absolute top-2 right-2 flex items-center gap-1 md:gap-2 z-[60]">
          <Button
            variant="outline"
            size="icon"
            className="size-8 md:size-10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="size-3 md:size-4" />
            ) : (
              <Maximize2 className="size-3 md:size-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 md:size-10"
            onClick={handleZoomIn}
          >
            <ZoomIn className="size-3 md:size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 md:size-10"
            onClick={handleZoomOut}
          >
            <ZoomOut className="size-3 md:size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 md:size-10"
            onClick={handleRecenter}
          >
            <Crosshair className="size-3 md:size-4" />
          </Button>
        </div>

        <svg
          ref={svgRef}
          className="size-full"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
        />

        {selectedPerson && (
          <div className="absolute inset-x-4 bottom-4 flex flex-col bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base md:text-lg font-semibold">{selectedPerson.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{selectedPerson.relationship}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs md:text-sm"
                onClick={() => setSelectedPerson(null)}
              >
                Close
              </Button>
            </div>
            {selectedPerson.details && (
              <div className="space-y-2">
                {selectedPerson.details.notes && (
                  <p className="text-xs md:text-sm">{selectedPerson.details.notes}</p>
                )}
                {selectedPerson.details.interests && selectedPerson.details.interests.length > 0 && (
                  <div>
                    <p className="text-xs md:text-sm font-medium mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPerson.details.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="text-xs bg-secondary px-2 py-1 rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedPerson.details.birthday && (
                  <p className="text-xs md:text-sm">
                    <span className="font-medium">Birthday:</span> {selectedPerson.details.birthday}
                  </p>
                )}
              </div>
            )}
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-xs md:text-sm w-full"
                onClick={() => onPersonClick?.(selectedPerson)}
              >
                Edit Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 