/** Carousel card dimensions from design specs */
export const CAROUSEL = {
  CARD_WIDTH: 423,
  CARD_HEIGHT: 532,
  CARD_GAP: 24,
  CARD_BORDER_RADIUS: 8,
  get SCROLL_AMOUNT() {
    return this.CARD_WIDTH + this.CARD_GAP
  },
} as const

/** Responsive breakpoints in pixels */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 992,
  DESKTOP: 1200,
} as const

/** Edge zone blur widths per breakpoint */
export const EDGE_ZONE_WIDTHS = {
  MOBILE: 60,
  TABLET: 100,
  DESKTOP_SMALL: 150,
  DESKTOP_LARGE: 200,
} as const

/** API caching configuration */
export const API = {
  CACHE_DURATION: 300,
  STALE_WHILE_REVALIDATE: 600,
  MAX_ARTICLES: 10,
} as const

export const READING = {
  WORDS_PER_MINUTE: 200,
  MIN_READING_TIME: 1,
} as const

export const ANIMATION = {
  CARD_STATE_UPDATE_DELAY: 100,
  SCROLL_BEHAVIOR: "smooth" as const,
} as const

/** Spacing values from design specs */
export const SPACING = {
  HEADER_TO_CAROUSEL: 81,
  CAROUSEL_TO_BUTTONS: 36,
  BUTTON_GAP: 36,
} as const
