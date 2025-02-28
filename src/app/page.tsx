"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { DockNavigation } from "@/components/DockNavigation";
import { ProjectStatusCard } from "@/components/ui/expandable-card";
import { useEvents } from "@/hooks/useEvents";

export default function Home() {
  const { events, loading, error } = useEvents();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 relative">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </header>
      
      <main className="flex flex-col items-start justify-start gap-8 overflow-auto">
        {loading ? (
          <div className="w-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="w-full text-center py-8 text-red-500">
            <p className="text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
                openIssues={event.openIssues || 0}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Dock Navigation - positioned absolutely at the bottom center */}
      <div className="absolute bottom-4 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <DockNavigation activePage="home" />
        </div>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground">
        <p> 2025 Dashboard de Eventos</p>
      </footer>
    </div>
  );
}
