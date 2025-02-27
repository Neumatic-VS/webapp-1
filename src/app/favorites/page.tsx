import { ThemeToggle } from "@/components/ThemeToggle";
import { DockNavigation } from "@/components/DockNavigation";

export default function FavoritesPage() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 relative">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <ThemeToggle />
      </header>
      
      <main className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
      </main>
      
      <div className="absolute bottom-4 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <DockNavigation activePage="favorites" />
        </div>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
      </footer>
    </div>
  );
}
