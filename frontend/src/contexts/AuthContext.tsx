import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    const storedToken = localStorage.getItem(
      "access_token"
    );

    setToken(storedToken);

    const handleStorage = () => {
      setToken(
        localStorage.getItem("access_token")
      );
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };

  }, []);

  const login = (
    newToken: string
  ) => {

    localStorage.setItem(
      "access_token",
      newToken
    );

    setToken(newToken);

  };

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );

    setToken(null);

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {

  const context = useContext(
    AuthContext
  );

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;

}