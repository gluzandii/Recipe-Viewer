/* eslint-disable react-refresh/only-export-components */
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    theme: ThemeMode;
    toggleTheme: () => void;
    setTheme: (t: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getPreferredTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

function applyTheme(t: ThemeMode) {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', t);
}

export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>(() => getPreferredTheme());

    useEffect(() => {
        applyTheme(theme);
        try {
            window.localStorage.setItem('theme-mode', theme);
        } catch {
            // ignore
        }
    }, [theme]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            const stored = window.localStorage.getItem('theme-mode');
            if (!stored) {
                setThemeState(mq.matches ? 'dark' : 'light');
            }
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    const setTheme = (t: ThemeMode) => setThemeState(t);
    const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

    const value = useMemo(() => ({theme, toggleTheme, setTheme}), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
