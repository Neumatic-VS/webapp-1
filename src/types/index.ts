// Common type definitions for the application

// Example of a user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
}

// Example of an API response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Route configuration type
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  protected?: boolean;
}

// Theme configuration
export type ThemeMode = 'light' | 'dark' | 'system';
