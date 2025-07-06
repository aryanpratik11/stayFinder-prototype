import { createContext, useState } from "react";

export const authDataContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const serverUrl = "https://stayfinder-prototype-backend.onrender.com";

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <authDataContext.Provider value={{ serverUrl, isAuthenticated, user, login, logout }}>
      {children}
    </authDataContext.Provider>
  );
};
