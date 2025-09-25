// Navigation constants
export const NAV_ITEMS = [
  { 
    href: "/know-about-me", 
    label: "Know About Me",
    description: "Personal journey and background"
  },
  { 
    href: "/techjays-overview", 
    label: "Techjays Overview",
    description: "Company overview and services"
  },
  { 
    href: "/investment-portfolio", 
    label: "Investment Portfolio",
    description: "Strategic investments and ventures"
  },
  { 
    href: "/media-mentions", 
    label: "Media Mentions",
    description: "Press coverage and recognition"
  },
  { 
    href: "/contact", 
    label: "Contact",
    description: "Get in touch for opportunities"
  },
] as const;

export const ROUTES = {
  HOME: "/",
  KNOW_ABOUT_ME: "/know-about-me",
  TECHJAYS_OVERVIEW: "/techjays-overview",
  INVESTMENT_PORTFOLIO: "/investment-portfolio",
  MEDIA_MENTIONS: "/media-mentions",
  CONTACT: "/contact",
  GROW_WITH_ME: "/grow-with-me",
  NOT_FOUND: "*",
} as const;

export const PAGE_TITLES = {
  [ROUTES.HOME]: "Philip Samuelraj - CEO & Technology Leader",
  [ROUTES.KNOW_ABOUT_ME]: "Know About Me - Philip Samuelraj",
  [ROUTES.TECHJAYS_OVERVIEW]: "Techjays Overview - Company Services",
  [ROUTES.INVESTMENT_PORTFOLIO]: "Investment Portfolio - Strategic Ventures",
  [ROUTES.MEDIA_MENTIONS]: "Media Mentions - Press Coverage",
  [ROUTES.CONTACT]: "Contact - Get In Touch",
  [ROUTES.GROW_WITH_ME]: "Grow With Me - Partnership Opportunities",
} as const;
