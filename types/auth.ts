export enum UserRole {
  ADMIN = 'admin',
  PARTY_REPRESENTATIVE = 'party_rep',
  FELLOW = 'fellow',
  OBSERVER = 'observer',
  PUBLIC = 'public'
}

export interface UserPermissions {
  canCreateEvents: boolean;
  canEditPublications: boolean;
  canAccessMemberPortal: boolean;
  canRegisterForSummit: boolean;
  canJoinWorkingGroups: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  party_affiliation?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
