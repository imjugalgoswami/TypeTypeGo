export interface UserRegistrationData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    role?: "user" | "admin";
  }
  
  export interface OTPVerificationData {
    phone_number: string;
    otp: string;
  }
  
  export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    is_active: boolean;
    is_verify: boolean;
    created_at: string;
    updated_at: string;
    avatar_url?: string;
    last_login_at?: string;
  }
  

  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
  }

  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
  }