import { Injectable } from '@angular/core';
import { StorageService, StorageError } from '../interfaces/storage.interface';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {
  
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      this.handleStorageError('get', key, error);
      return null;
    }
  }
  
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      this.handleStorageError('set', key, error);
    }
  }
  
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      this.handleStorageError('remove', key, error);
    }
  }
  
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      this.handleStorageError('clear', undefined, error);
    }
  }
  
  private handleStorageError(
    operation: StorageError['operation'], 
    key: string | undefined, 
    error: unknown
  ): void {
    const storageError: StorageError = {
      operation,
      key,
      message: error instanceof Error ? error.message : 'Unknown storage error'
    };
    
    console.error(`Storage ${operation} operation failed:`, storageError);
    
    // In a real app, you might want to report this to an error tracking service
    // or show a user-friendly message
  }
}