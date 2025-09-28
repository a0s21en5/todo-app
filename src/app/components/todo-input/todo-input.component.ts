import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="todo-input-container">
      <input
        #todoInput
        type="text"
        class="todo-input"
        placeholder="What needs to be done?"
        [value]="inputValue()"
        (input)="updateInputValue($event)"
        (keyup.enter)="addTodo(todoInput)"
        maxlength="500"
      />
      <button
        type="button"
        class="add-button"
        (click)="addTodo(todoInput)"
        [disabled]="!inputValue().trim()"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .todo-input-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .todo-input {
      flex: 1;
      padding: 1rem 1.25rem;
      font-size: 1.125rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      outline: none;
      transition: all 0.2s ease;
      background: white;
    }

    .todo-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .todo-input::placeholder {
      color: #9ca3af;
    }

    .add-button {
      padding: 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 56px;
      height: 56px;
    }

    .add-button:hover:not(:disabled) {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .add-button:disabled {
      background: #d1d5db;
      cursor: not-allowed;
      transform: none;
    }

    .add-button svg {
      width: 20px;
      height: 20px;
    }
  `]
})
export class TodoInputComponent {
  private todoService = inject(TodoService);
  protected inputValue = signal('');

  protected updateInputValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputValue.set(target.value);
  }

  protected addTodo(input: HTMLInputElement): void {
    const text = this.inputValue().trim();
    if (text) {
      this.todoService.addTodo(text);
      this.inputValue.set('');
      input.value = '';
    }
  }
}