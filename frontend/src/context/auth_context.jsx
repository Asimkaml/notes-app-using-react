import { createContext, useContext, useState, useEffect } from "react";
import { api, setUnauthorizedHandler } from "../api.js";
import { useToast } from "./toast_context.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      showToast("Session expired. Please log in again.");
    });
  }, [showToast]);

  const login = async (email, password) => {
    setUser(await api("/api/auth/login", { method: "POST", body: { email, password } }));
  };

  const signup = async (name, email, password) => {
    setUser(await api("/api/auth/signup", { method: "POST", body: { name, email, password } }));
  };

  const logout = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (e) {
      showToast(e.message); // stay logged in if server fail. be honest.
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);