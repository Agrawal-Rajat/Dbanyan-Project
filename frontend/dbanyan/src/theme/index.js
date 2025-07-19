// Dbanyan Group - Refined Organic Theme Configuration
// Following project_context.md brand identity and design reference specifications

export const theme = {
  // Brand DNA Colors - Organic, Earth-Toned Palette
  colors: {
    primary: '#2C5F2D',        // Deep Forest Green
    primaryLight: '#4A7C59',   // Lighter forest green for hover states
    secondary: '#97BC62',      // Sage Green  
    secondaryLight: '#B5D17F', // Lighter sage for backgrounds
    accent: '#FFBF00',         // Vibrant Amber for CTAs
    accentDark: '#E6A500',     // Darker amber for hover
    
    // Sophisticated warm neutrals
    background: '#FEFEFE',      // Pure white backgrounds
    backgroundWarm: '#F9F8F6',  // Warm off-white for sections
    backgroundMuted: '#F5F4F2', // Muted warm background
    cardBg: '#F8F7F5',         // Card backgrounds with warmth
    border: '#E8E6E3',         // Soft borders
    borderLight: '#F0EFEC',    // Very light borders
    
    // Text hierarchy with organic feel
    textPrimary: '#2C3E2D',    // Dark forest for headings
    textSecondary: '#5A6B5D',  // Muted green for secondary text
    textBody: '#4A5553',       // Warm dark gray for body
    textMuted: '#8B9A8D',      // Light muted text
    
    // Legacy colors (maintain compatibility)
    offWhite: '#F9F8F6',       // Updated to warm off-white
    lightGray: '#E8E6E3',      // Updated to softer gray
    darkCharcoal: '#2C3E2D',   // Updated to organic dark
  },

  // Typography - Enhanced hierarchy
  fonts: {
    heading: '"Lora", "Georgia", serif',
    body: '"Inter", "system-ui", sans-serif',
    mono: '"JetBrains Mono", monospace'
  },

  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },

  // Organic border radius
  borderRadius: {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    full: '9999px'
  },

  // Sophisticated shadows with organic feel
  shadows: {
    none: 'none',
    subtle: '0 1px 3px rgba(44, 95, 45, 0.05), 0 1px 2px rgba(44, 95, 45, 0.08)',
    card: '0 4px 6px rgba(44, 95, 45, 0.05), 0 2px 4px rgba(44, 95, 45, 0.08)',
    soft: '0 8px 15px rgba(44, 95, 45, 0.08), 0 4px 6px rgba(44, 95, 45, 0.05)',
    medium: '0 10px 20px rgba(44, 95, 45, 0.08), 0 6px 8px rgba(44, 95, 45, 0.05)',
    large: '0 20px 25px rgba(44, 95, 45, 0.08), 0 10px 10px rgba(44, 95, 45, 0.04)',
    organic: '0 8px 32px rgba(151, 188, 98, 0.15), 0 2px 8px rgba(44, 95, 45, 0.1)',
    
    // Legacy (maintain compatibility)
    button: '0 2px 4px rgba(44, 95, 45, 0.1)',
  },

  // Organic spacing system
  spacing: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    
    // Legacy (maintain compatibility)
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },

  // Animation easing for organic feel
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
    bounce: '350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    organic: '300ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  },

  // Responsive breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default theme;
