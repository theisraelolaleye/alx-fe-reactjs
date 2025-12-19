import { createContext, useContext, useEffect, useState } from "react";

const AUTH_KEY = "isAuthed";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      setIsAuthenticated(stored === "true");
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => {
    try {
      localStorage.setItem(AUTH_KEY, "true");
    } catch { }
    setIsAuthenticated(true);
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch { }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};