import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoValidators } from '../../../shared/validators/todo.validators';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  private readonly todoService = inject(TodoService);
  private readonly formBuilder = inject(FormBuilder);
  
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  
  readonly todoForm = this.formBuilder.group({
    title: ['', [
      Validators.required,
      TodoValidators.todoTitle(),
      TodoValidators.noOnlyWhitespace()
    ]],
    priority: ['medium' as const],
    category: [''],
    description: ['']
  });
  
  readonly titleControl = this.todoForm.get('title')!;
  readonly characterCount = signal(0);
  readonly maxLength = APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH;
  
  constructor() {
    // Update character count as user types
    this.titleControl.valueChanges.subscribe(value => {
      this.characterCount.set(value ? value.length : 0);
    });
  }
  
  async onSubmit(): Promise<void> {
    if (this.todoForm.invalid || this.isSubmitting()) {
      this.markAllFieldsAsTouched();
      return;
    }
    
    try {
      this.isSubmitting.set(true);
      this.submitError.set(null);
      
      const formValue = this.todoForm.value;
      await this.todoService.addTodo({
        title: formValue.title!,
        priority: formValue.priority as 'low' | 'medium' | 'high',
        category: formValue.category || undefined,
        description: formValue.description || undefined
      });
      
      // Reset form on successful submission
      this.todoForm.reset({
        title: '',
        priority: 'medium',
        category: '',
        description: ''
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add todo';
      this.submitError.set(errorMessage);
    } finally {
      this.isSubmitting.set(false);
    }
  }
  
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
  
  clearError(): void {
    this.submitError.set(null);
  }
  
  getFieldError(fieldName: string): string | null {
    const field = this.todoForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (errors) {
        // Return the first error message
        const firstErrorKey = Object.keys(errors)[0];
        const error = errors[firstErrorKey];
        return error?.message || `${fieldName} is invalid`;
      }
    }
    return null;
  }
  
  private markAllFieldsAsTouched(): void {
    Object.keys(this.todoForm.controls).forEach(key => {
      this.todoForm.get(key)?.markAsTouched();
    });
  }
}