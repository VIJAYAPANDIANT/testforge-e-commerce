import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readJSON, writeJSON, STORAGE_KEYS } from "@/utils/storage";
import { checkCredentials, DEMO_USER } from "@/utils/validation";

// Demo-only, frontend authentication. Not secure — never store real passwords.
type User = { email: string; name: string };
type AuthValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readJSON(STORAGE_KEYS.auth) as User | null;
    if (stored && stored.email === DEMO_USER.email) setUser(stored);
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    if (!checkCredentials(email, password)) return false;
    const u = { email: DEMO_USER.email, name: DEMO_USER.name };
    setUser(u);
    writeJSON(STORAGE_KEYS.auth, u);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeJSON(STORAGE_KEYS.auth, null);
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
