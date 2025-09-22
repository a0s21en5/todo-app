import { Injectable } from '@angular/core';
import { ErrorHandler, AppError } from '../interfaces/error.interface';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error: unknown, context?: string): void {
    const appError = this.transformError(error, context);
    
    // Log the error
    console.error('Application Error:', appError);
    
    // In a real application, you might want to:
    // - Send the error to a logging service
    // - Show a user-friendly notification
    // - Report to error tracking services like Sentry
    
    this.logError(appError);
  }
  
  private transformError(error: unknown, context?: string): AppError {
    const timestamp = new Date();
    
    if (error instanceof Error) {
      return {
        message: error.message,
        timestamp,
        context,
        stack: error.stack,
        code: this.getErrorCode(error)
      };
    }
    
    if (typeof error === 'string') {
      return {
        message: error,
        timestamp,
        context,
        code: APP_CONSTANTS.ERROR_CODES.UNKNOWN_ERROR
      };
    }
    
    return {
      message: 'An unknown error occurred',
      timestamp,
      context,
      code: APP_CONSTANTS.ERROR_CODES.UNKNOWN_ERROR
    };
  }
  
  private getErrorCode(error: Error): string {
    // Determine error code based on error type or message
    if (error.message.includes('storage') || error.message.includes('localStorage')) {
      return APP_CONSTANTS.ERROR_CODES.STORAGE_ERROR;
    }
    
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return APP_CONSTANTS.ERROR_CODES.VALIDATION_ERROR;
    }
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return APP_CONSTANTS.ERROR_CODES.NETWORK_ERROR;
    }
    
    return APP_CONSTANTS.ERROR_CODES.UNKNOWN_ERROR;
  }
  
  private logError(error: AppError): void {
    // In production, you might want to send this to a logging service
    const errorLog = {
      ...error,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // For now, just log to console
    console.group('🚨 Error Details');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Context:', error.context);
    console.error('Timestamp:', error.timestamp);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    console.groupEnd();
  }
}