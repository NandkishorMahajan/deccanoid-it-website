/**
 * Theme Configuration
 * Defines light and dark theme color palettes
 */

export type Theme = 'light' | 'dark';

export const themeConfig = {
  light: {
    // Backgrounds
    bg: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#f0f4f8',
      hover: '#f5f5f5',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    // Text colors
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
      tertiary: '#888888',
      muted: '#aaaaaa',
      inverse: '#ffffff',
    },
    // Accent colors (Blue/Cyan)
    accent: {
      primary: '#2563eb', // blue-600
      secondary: '#06b6d4', // cyan-500
      light: '#60a5fa', // blue-400
      lighter: '#93c5fd', // blue-300
    },
    // Borders
    border: {
      primary: '#e5e5e5',
      secondary: '#d4d4d4',
      accent: '#2563eb',
    },
    // Shadows
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    },
  },
  dark: {
    // Backgrounds
    bg: {
      primary: '#0f1419', // Very dark blue-gray
      secondary: '#1a1f2e', // Slightly lighter
      tertiary: '#252d3d', // Even lighter for cards
      hover: '#2d3748',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    // Text colors
    text: {
      primary: '#f5f5f7', // Almost white
      secondary: '#b0b0b7', // Light gray
      tertiary: '#808088', // Medium gray
      muted: '#5a5a64', // Darker gray
      inverse: '#0f1419',
    },
    // Accent colors (Blue/Cyan - adjusted for dark mode)
    accent: {
      primary: '#3b82f6', // brighter blue
      secondary: '#06dcff', // brighter cyan
      light: '#60a5fa', // lighter blue
      lighter: '#93c5fd', // even lighter
    },
    // Borders
    border: {
      primary: '#2d3748',
      secondary: '#404d63',
      accent: '#3b82f6',
    },
    // Shadows (more subtle on dark)
    shadow: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
      md: '0 4px 12px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 40px rgba(0, 0, 0, 0.6)',
    },
  },
};

export const CSS_VAR_PREFIX = '--theme-';

export const getCSSVariables = (theme: Theme) => {
  const config = themeConfig[theme];
  const variables: Record<string, string> = {};

  // Flatten all colors to CSS variables
  Object.entries(config).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors).forEach(([key, value]) => {
        const varName = `${CSS_VAR_PREFIX}${category}-${key}`;
        variables[varName] = value as string;
      });
    }
  });

  return variables;
};
