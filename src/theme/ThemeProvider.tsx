import React, { createContext, useCallback, useLayoutEffect, useState } from 'react';
import type { Theme } from './theme.config';
import { getCSSVariables } from './theme.config';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme-preference',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')
        .matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return defaultTheme;
    }
  });

  const applyTheme = useCallback((newTheme: Theme) => {
    const htmlElement = document.documentElement;

    // Remove old theme class
    htmlElement.classList.remove('light', 'dark');
    // Add new theme class
    htmlElement.classList.add(newTheme);
    htmlElement.setAttribute('data-theme', newTheme);
    htmlElement.style.colorScheme = newTheme;

    // Apply CSS variables
    const variables = getCSSVariables(newTheme);
    Object.entries(variables).forEach(([key, value]) => {
      htmlElement.style.setProperty(key, value);
    });

    // Store preference
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch {
      // no-op
    }
  }, [storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme before paint to avoid any flicker.
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [applyTheme, theme]);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
