/* eslint-disable react-refresh/only-export-components */
import React, {createContext, useContext, useMemo, useState} from "react";

export interface User {
    name: string;
    email: string;
}

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (u: User) => setUser(u);
    const logout = () => setUser(null);

    const value = useMemo(() => ({user, isAuthenticated: !!user, login, logout}), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
