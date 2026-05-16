export type UserRole = 'parent' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  children?: Child[];
  specialty?: string; // For doctors
  licenseNumber?: string; // For doctors
}

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
