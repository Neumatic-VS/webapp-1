"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { ProjectStatusCard } from "@/components/ui/expandable-card";

// Mock data for demonstration purposes
const mockEvents = [
  {
    id: 1,
    name: "Conferência Anual de Tecnologia",
    invitationsSent: 500,
    confirmations: 320,
    capacity: 400,
    openRate: 85,
    dueDate: "Dec 15, 2025",
    venue: {
      name: "Centro de Convenções Rebouças",
      address: "Av. Rebouças, 600, São Paulo, SP"
    },
    openIssues: 5
  },
  {
    id: 2,
    name: "Workshop de Design",
    invitationsSent: 200,
    confirmations: 150,
    capacity: 180,
    openRate: 92,
    dueDate: "Jan 20, 2026",
    venue: {
      name: "Casa do Saber",
      address: "Rua Dr. Mário Ferraz, 414, São Paulo, SP"
    },
    openIssues: 2
  },
  {
    id: 3,
    name: "Lançamento de Produto",
    invitationsSent: 1000,
    confirmations: 580,
    capacity: 600,
    openRate: 78,
    dueDate: "Mar 10, 2026",
    venue: {
      name: "World Trade Center São Paulo",
      address: "Av. das Nações Unidas, 12551, São Paulo, SP"
    },
    openIssues: 8
  },
];

interface EventCardProps {
  event: {
    id: number;
    name: string;
    invitationsSent: number;
    confirmations: number;
    capacity: number;
    openRate: number;
  };
}

function EventCard({ event }: EventCardProps) {
  const confirmationRate = Math.round((event.confirmations / event.invitationsSent) * 100);
  const capacityFillRate = Math.round((event.confirmations / event.capacity) * 100);
  const delta = event.capacity - event.confirmations;
  
  // Determine badge color based on capacity fill rate
  const getBadgeVariant = () => {
    if (capacityFillRate >= 90) return "destructive";
    if (capacityFillRate >= 75) return "warning";
    return "secondary";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{event.name}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {capacityFillRate}% Ocupação
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Convites Enviados</span>
            <span className="text-xl font-semibold">{event.invitationsSent}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-muted-foreground">Confirmados</span>
            <span className="text-xl font-semibold">{event.confirmations}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-muted-foreground">Capacidade</span>
            <span className="text-xl font-semibold">{event.capacity}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-muted-foreground">Taxa de abertura</span>
            <span className="text-xl font-semibold">{event.openRate}%</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-muted-foreground">Delta</span>
            <span className={`text-xl font-semibold ${delta < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {delta}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Confirmações vs Capacidade</span>
            <span>{capacityFillRate}%</span>
          </div>
          <Progress value={capacityFillRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export function EventDashboard() {
  const [events, setEvents] = useState(mockEvents);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => ({
          ...event,
          confirmations: Math.min(
            event.capacity, 
            event.confirmations + Math.floor(Math.random() * 3)
          ),
          openRate: Math.min(100, event.openRate + Math.floor(Math.random() * 2))
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-8 w-full">
      <div>
        <h2 className="text-2xl font-bold mb-4">Eventos em Tempo Real</h2>
        <div className="grid grid-cols-1 gap-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(event => (
            <ProjectStatusCard
              key={event.id}
              title={event.name}
              progress={Math.round((event.confirmations / event.capacity) * 100)}
              dueDate={event.dueDate}
              venue={event.venue}
              invitationsSent={event.invitationsSent}
              confirmations={event.confirmations}
              capacity={event.capacity}
              openIssues={event.openIssues}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
