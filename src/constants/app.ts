// Application-wide constants
export const APP_CONFIG = {
  name: "Philip Samuelraj Portfolio",
  title: "CEO & Technology Leader",
  description: "Strategic technology leader with expertise in AI, cybersecurity, and digital transformation",
  version: "1.0.0",
  author: "Philip Samuelraj",
  email: "cyriljyothiprakash@gmail.com",
  website: "https://www.techjays.com",
  linkedin: "https://linkedin.com/in/philip-samuelraj",
  twitter: "https://twitter.com/philipsamuelraj",
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 1.0,
  verySlow: 2.0,
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
