/**
 * Generate consistent colors based on string input
 * Creates unique but stable colors for combination names
 */
export const generateColorFromString = (str: string) => {
  // Generate hash code from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Create consistent lightness/saturation for badges
  const h = Math.abs(hash) % 360; // 0-360 hue value
  const s = 85; // Saturation percentage - keep it colorful but not too bright
  const l = 92; // Lightness percentage - keep it light for backgrounds

  // Calculate darker shade for text
  const textHue = h;
  const textSaturation = s + 10;
  const textLightness = 30; // Darker text for contrast

  // Create CSS classes with proper contrast
  return {
    bg: `hsl(${h}, ${s}%, ${l}%)`,
    text: `hsl(${textHue}, ${textSaturation}%, ${textLightness}%)`,
    border: `hsl(${h}, ${s}%, ${l - 10}%)`,
  };
};

/**
 * Format date string with fallback for invalid dates
 */
export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Date not available";
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return "Date not available";
  }
};
