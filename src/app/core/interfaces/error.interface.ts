export interface ErrorHandler {
  handleError(error: unknown, context?: string): void;
}

export interface AppError {
  message: string;
  code?: string;
  timestamp: Date;
  context?: string;
  stack?: string;
}

export interface ValidationError extends AppError {
  field: string;
  value: unknown;
  constraints: string[];
}