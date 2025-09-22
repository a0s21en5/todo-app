export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    TODOS: 'angular-todos',
    USER_PREFERENCES: 'user-preferences',
    APP_STATE: 'app-state'
  },
  
  VALIDATION: {
    TODO_TITLE_MAX_LENGTH: 200,
    TODO_TITLE_MIN_LENGTH: 1,
    DEBOUNCE_TIME: 300
  },
  
  UI: {
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    DEFAULT_PAGE_SIZE: 10
  },
  
  FILTERS: {
    ALL: 'all' as const,
    ACTIVE: 'active' as const,
    COMPLETED: 'completed' as const
  },
  
  ERROR_CODES: {
    STORAGE_ERROR: 'STORAGE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
  }
} as const;

export type FilterType = typeof APP_CONSTANTS.FILTERS[keyof typeof APP_CONSTANTS.FILTERS];