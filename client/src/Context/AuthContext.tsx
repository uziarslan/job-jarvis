import React, { createContext, useState, useEffect, ReactNode } from "react";
import authService from "../services/authService";

interface User {
  id: string;
  email: string;
  name?: string;
  upworkId?: string;
  proposalLeft?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  upgrade: {
    value: boolean;
    message: string;
  };
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [upgrade, setUpgrade] = useState({
    value: false,
    message: "",
  });

  // Check for user data on mount and when storage changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const userData = await authService.getUser();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkUser();

    // Listen for storage changes
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: chrome.storage.AreaName
    ) => {
      if (areaName === 'local' && changes.token) {
        checkUser();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  useEffect(() => {
    if (user) {
      chrome.storage.local.get('upworkId', async (result) => {
        const upworkId = result.upworkId || null;
        if (upworkId) {
          const result = await authService.checkUpworkId(upworkId);
          setUpgrade(result);
        }
      });
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    upgrade,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 