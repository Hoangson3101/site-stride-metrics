import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: string;
  planExpiry?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fake users data
export const FAKE_USERS: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA",
    plan: "advanced",
    planExpiry: "2024-12-31",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TranThiB",
    plan: "professional",
    planExpiry: "2025-01-15",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC",
    plan: "basic",
    planExpiry: "2024-11-30",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

