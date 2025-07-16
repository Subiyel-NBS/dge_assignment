// Color theme configuration for the Social Support Portal
// Change these values to update the entire application's color scheme

export const colors = {
  // Primary color scheme (Professional Blue-Gray theme)
  primary: {
    50: '#f8fafc',   // Very light blue-gray
    100: '#f1f5f9',  // Light blue-gray
    200: '#e2e8f0',  // Lighter blue-gray
    300: '#cbd5e1',  // Light medium blue-gray
    400: '#94a3b8',  // Medium blue-gray
    500: '#64748b',  // Main primary blue-gray
    600: '#475569',  // Darker primary blue-gray
    700: '#334155',  // Dark blue-gray
    800: '#1e293b',  // Very dark blue-gray
    900: '#0f172a',  // Darkest blue-gray
  },
  
  // Secondary color scheme (Complementary teal/blue-green)
  secondary: {
    50: '#f0fdfa',   // Very light teal
    100: '#ccfbf1',  // Light teal
    200: '#99f6e4',  // Lighter teal
    300: '#5eead4',  // Light medium teal
    400: '#2dd4bf',  // Medium teal
    500: '#14b8a6',  // Main secondary teal
    600: '#0d9488',  // Darker secondary teal
    700: '#0f766e',  // Dark teal
    800: '#115e59',  // Very dark teal
    900: '#134e4a',  // Darkest teal
  },
  
  // Accent colors
  accent: {
    success: '#10b981',    // Green for success states
    warning: '#f59e0b',    // Amber for warnings
    error: '#ef4444',      // Red for errors
    info: '#3b82f6',       // Blue for information
  },
  
  // Neutral colors (grays)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',      // White background
    secondary: '#f8fafc',    // Very light gray
    accent: '#f0fdf4',       // Very light green background
    sidebar: '#1e293b',      // Professional dark blue-gray for sidebar
    success: '#dcfce7',      // Light green for success
    warning: '#fef3c7',      // Light amber for warnings
    error: '#fee2e2',        // Light red for errors
  },
  
  // Text colors
  text: {
    primary: '#111827',      // Dark gray for main text
    secondary: '#6b7280',    // Medium gray for secondary text
    muted: '#9ca3af',        // Light gray for muted text
    inverse: '#ffffff',      // White text for dark backgrounds
    success: '#065f46',      // Dark green for success text
    warning: '#92400e',      // Dark amber for warning text
    error: '#991b1b',        // Dark red for error text
  },
  
  // Border colors
  border: {
    primary: '#e5e7eb',      // Light gray border
    secondary: '#d1d5db',    // Medium gray border
    accent: '#bbf7d0',       // Light green border
    focus: '#22c55e',        // Green focus border
    error: '#f87171',        // Red error border
  }
};

// Export individual color palettes for easy access
export const primaryColors = colors.primary;
export const secondaryColors = colors.secondary;
export const accentColors = colors.accent;
export const neutralColors = colors.neutral;
export const backgroundColors = colors.background;
export const textColors = colors.text;
export const borderColors = colors.border;

// Export the default theme object for Tailwind CSS
export const tailwindTheme = {
  primary: colors.primary,
  secondary: colors.secondary,
  accent: colors.accent,
  neutral: colors.neutral,
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: colors.accent.success,
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: colors.accent.warning,
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: colors.accent.error,
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  }
};

export default colors;