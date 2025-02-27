import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DockNavigation } from "@/components/DockNavigation";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 relative">
      <header className="flex justify-between items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          priority
        />
        <ThemeToggle />
      </header>
      
      <main className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Your Modern React App
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle>Next.js</CardTitle>
              <CardDescription>The React Framework for the Web</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Next.js enables you to create full-stack web applications by extending the latest React features.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Documentation</a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>A utility-first CSS framework</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Rapidly build modern websites without ever leaving your HTML.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">Documentation</a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>UI components built with Radix UI and Tailwind CSS</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Beautifully designed components that you can copy and paste into your apps.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">Documentation</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Button className="mt-8">Get Started</Button>
      </main>
      
      {/* Dock Navigation - positioned absolutely at the bottom center */}
      <div className="absolute bottom-4 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <DockNavigation activePage="home" />
        </div>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
      </footer>
    </div>
  );
}
