import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Colors optimized for Indian users with vibrant yet familiar palette
const colors = {
  primary: '#A67C52', // Vibrant orange - energetic, adventure
  secondary: '#2EC4B6', // Teal - calming, trustworthy
  accent: '#FF9F1C', // Amber - warm, inviting
  background: {
    light: '#FFFFFF',
    dark: '#121212'
  },
  surface: {
    light: '#F5F5F5',
    dark: '#1E1E1E'
  },
  text: {
    light: '#212121',
    dark: '#E1E1E1'
  },
  error: '#CF6679',
  success: '#4CAF50',
  warning: '#FFAB40',
  info: '#2196F3'
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background.light,
    surface: colors.surface.light,
    text: colors.text.light,
    error: colors.error,
  },
  roundness: 8,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background.dark,
    surface: colors.surface.dark,
    text: colors.text.dark,
    error: colors.error,
  },
  roundness: 8,
};

// 1. Elegant & Sophisticated
// Primary: #0D2927 (Deep Teal)
// Accent 1: #A67C52 (Warm Brown)
// Accent 2: #D9B99B (Soft Beige)
// Neutral: #F5F5F5 (Off-White)
// 2. Modern & Vibrant
// Primary: #0D2927 (Deep Teal)
// Accent 1: #E63946 (Bold Red)
// Accent 2: #F4A261 (Warm Orange)
// Neutral: #E9ECEF (Light Gray)
// 3. Minimal & Cool Tones
// Primary: #0D2927 (Deep Teal)
// Accent 1: #007F7F (Cyan Teal)
// Accent 2: #8CBEB2 (Muted Mint Green)
// Neutral: #F8F9FA (Soft White)
// 4. Dark & Moody
// Primary: #0D2927 (Deep Teal)
// Accent 1: #1B1B1B (Charcoal Black)
// Accent 2: #5D737E (Muted Steel Blue)
// Neutral: #D3D3D3 (Light Gray)
// 5. Earthy & Natural
// Primary: #0D2927 (Deep Teal)
// Accent 1: #2C6E49 (Forest Green)
// Accent 2: #A57E52 (Muted Terracotta)
// Neutral: #F4E1D2 (Warm Cream)
