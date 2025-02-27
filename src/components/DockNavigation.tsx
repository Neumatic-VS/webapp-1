"use client";

import { Dock } from "@/components/ui/dock-two";
import {
  Home,
  Search,
  Music,
  Heart,
  Settings,
  Plus,
  User
} from "lucide-react";
import { useRouter } from "next/navigation";

type PageType = "home" | "search" | "music" | "favorites" | "add" | "profile" | "settings";

interface DockNavigationProps {
  activePage?: PageType;
}

export function DockNavigation({ activePage = "home" }: DockNavigationProps) {
  const router = useRouter();

  const items = [
    { 
      icon: Home, 
      label: "Home",
      onClick: () => router.push("/"),
      isActive: activePage === "home"
    },
    { 
      icon: Search, 
      label: "Search",
      onClick: () => router.push("/search"),
      isActive: activePage === "search"
    },
    { 
      icon: Music, 
      label: "Music",
      onClick: () => router.push("/music"),
      isActive: activePage === "music"
    },
    { 
      icon: Heart, 
      label: "Favorites",
      onClick: () => router.push("/favorites"),
      isActive: activePage === "favorites"
    },
    { 
      icon: Plus, 
      label: "Add New",
      onClick: () => router.push("/add"),
      isActive: activePage === "add"
    },
    { 
      icon: User, 
      label: "Profile",
      onClick: () => router.push("/profile"),
      isActive: activePage === "profile"
    },
    { 
      icon: Settings, 
      label: "Settings",
      onClick: () => router.push("/settings"),
      isActive: activePage === "settings"
    }
  ];

  return <Dock items={items} className="h-20" />;
}
