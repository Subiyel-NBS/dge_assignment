// Color theme configuration for the Social Support Portal
// Change these values to update the entire application's color scheme

const colors = {
  // Primary color scheme (Light Green theme)
  primary: {
    50: '#f0fdf4',   // Very light green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Lighter green
    300: '#86efac',  // Light medium green
    400: '#4ade80',  // Medium green
    500: '#22c55e',  // Main primary green
    600: '#16a34a',  // Darker primary green
    700: '#15803d',  // Dark green
    800: '#166534',  // Very dark green
    900: '#14532d',  // Darkest green
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
  
  // Success, warning, error colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
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
    500: '#f59e0b',
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
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  }
};

module.exports = {
  colors,
  tailwindTheme: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  }
};