export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
}

export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}