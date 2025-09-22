import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { APP_CONSTANTS } from '../constants/app.constants';

export class TodoValidators {
  static todoTitle(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      
      if (!value) {
        return { required: { message: 'Todo title is required' } };
      }
      
      if (value.length < APP_CONSTANTS.VALIDATION.TODO_TITLE_MIN_LENGTH) {
        return { 
          minLength: { 
            message: `Todo title must be at least ${APP_CONSTANTS.VALIDATION.TODO_TITLE_MIN_LENGTH} character long`,
            actualLength: value.length,
            requiredLength: APP_CONSTANTS.VALIDATION.TODO_TITLE_MIN_LENGTH
          } 
        };
      }
      
      if (value.length > APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH) {
        return { 
          maxLength: { 
            message: `Todo title cannot exceed ${APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH} characters`,
            actualLength: value.length,
            allowedLength: APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH
          } 
        };
      }
      
      return null;
    };
  }
  
  static noOnlyWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && typeof value === 'string' && value.trim().length === 0) {
        return { whitespace: { message: 'Todo cannot contain only whitespace' } };
      }
      return null;
    };
  }
}