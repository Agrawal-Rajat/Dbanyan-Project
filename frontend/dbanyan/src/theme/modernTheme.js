// Dbanyan Group - Modern Theme Configuration
// Professional color scheme with excellent contrast and engagement

import { createTheme } from '@mantine/core';

export const modernTheme = createTheme({
  colors: {
    // Primary Green - Modern and vibrant
    brand: [
      '#f0fdf4', // lightest
      '#dcfce7',
      '#bbf7d0',
      '#86efac',
      '#4ade80',
      '#22c55e', // main
      '#16a34a',
      '#15803d',
      '#166534',
      '#14532d'  // darkest
    ],
    
    // Emerald - For accents and CTAs
    emerald: [
      '#ecfdf5',
      '#d1fae5',
      '#a7f3d0',
      '#6ee7b7',
      '#34d399',
      '#10b981', // main
      '#059669',
      '#047857',
      '#065f46',
      '#064e3b'
    ],
    
    // Warm Orange - For highlights and energy
    orange: [
      '#fff7ed',
      '#ffedd5',
      '#fed7aa',
      '#fdba74',
      '#fb923c',
      '#f97316', // main
      '#ea580c',
      '#c2410c',
      '#9a3412',
      '#7c2d12'
    ],
    
    // Blue - For trust and information
    blue: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6', // main
      '#2563eb',
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a'
    ],
    
    // Neutral grays - Modern and clean
    gray: [
      '#fafafa',
      '#f4f4f5',
      '#e4e4e7',
      '#d4d4d8',
      '#a1a1aa',
      '#71717a', // main
      '#52525b',
      '#3f3f46',
      '#27272a',
      '#18181b'
    ]
  },
  
  primaryColor: 'emerald',
  primaryShade: 6,
  
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
  headings: {
    fontFamily: '"Lora", Georgia, serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.3' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.4' },
      h6: { fontSize: '1rem', lineHeight: '1.5' }
    }
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },
  
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  
  // Default component props
  defaultProps: {
    Button: {
      radius: 'lg',
      fw: 500
    },
    Card: {
      radius: 'lg',
      shadow: 'sm',
      withBorder: true
    },
    Input: {
      radius: 'md'
    },
    Badge: {
      radius: 'md'
    }
  },
  
  // Component-specific styles
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: theme.shadows.md
          }
        }
      })
    },
    
    Card: {
      styles: (theme) => ({
        root: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows.lg
          }
        }
      })
    },
    
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320
        }
      }
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em'
  }
});

// Color utilities for consistent theming
export const colorUtils = {
  // Primary gradients
  brandGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  accentGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  blueGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  
  // Background variations
  lightBg: 'linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)',
  brandBg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  
  // Text colors
  textPrimary: '#18181b',
  textSecondary: '#52525b',
  textMuted: '#71717a',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
};

// Animation presets
export const animations = {
  // Easing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  
  // Duration presets
  duration: {
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s',
    slower: '0.5s'
  },
  
  // Common animation variants for Framer Motion
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};
