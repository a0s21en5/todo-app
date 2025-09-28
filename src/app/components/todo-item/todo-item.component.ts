import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <div class="todo-content">
        <button
          type="button"
          class="toggle-button"
          (click)="toggleTodo()"
          [class.checked]="todo.completed"
        >
          @if (todo.completed) {
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          }
        </button>

        @if (!isEditing()) {
          <div class="todo-text-container" (dblclick)="startEditing()">
            <span class="todo-text" [class.completed]="todo.completed">
              {{ todo.text }}
            </span>
          </div>
        } @else {
          <input
            #editInput
            type="text"
            class="edit-input"
            [value]="editText()"
            (input)="updateEditText($event)"
            (keyup.enter)="saveEdit()"
            (keyup.escape)="cancelEdit()"
            (blur)="saveEdit()"
            maxlength="500"
          />
        }
      </div>

      <div class="todo-actions">
        @if (!isEditing()) {
          <button
            type="button"
            class="edit-button"
            (click)="startEditing()"
            title="Edit todo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }

        <button
          type="button"
          class="delete-button"
          (click)="deleteTodo()"
          title="Delete todo"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4H14M6 4V2.5C6 2.22386 6.22386 2 6.5 2H9.5C9.77614 2 10 2.22386 10 2.5V4M12.5 4V13.5C12.5 13.7761 12.2761 14 12 14H4C3.72386 14 3.5 13.7761 3.5 13.5V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .todo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      margin-bottom: 0.5rem;
      transition: all 0.2s ease;
    }

    .todo-item:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-color: #d1d5db;
    }

    .todo-item.completed {
      opacity: 0.7;
      background: #f9fafb;
    }

    .todo-content {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 0.75rem;
    }

    .toggle-button {
      width: 24px;
      height: 24px;
      border: 2px solid #d1d5db;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .toggle-button:hover {
      border-color: #3b82f6;
    }

    .toggle-button.checked {
      background: #10b981;
      border-color: #10b981;
      color: white;
    }

    .todo-text-container {
      flex: 1;
      cursor: pointer;
    }

    .todo-text {
      font-size: 1rem;
      line-height: 1.5;
      word-break: break-word;
    }

    .todo-text.completed {
      text-decoration: line-through;
      color: #6b7280;
    }

    .edit-input {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
      border: 2px solid #3b82f6;
      border-radius: 0.375rem;
      outline: none;
      background: white;
    }

    .todo-actions {
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .todo-item:hover .todo-actions {
      opacity: 1;
    }

    .edit-button,
    .delete-button {
      padding: 0.5rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .edit-button {
      background: #f3f4f6;
      color: #374151;
    }

    .edit-button:hover {
      background: #e5e7eb;
      color: #1f2937;
    }

    .delete-button {
      background: #fef2f2;
      color: #dc2626;
    }

    .delete-button:hover {
      background: #fee2e2;
      color: #b91c1c;
    }
  `]
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  private todoService = inject(TodoService);
  protected isEditing = signal(false);
  protected editText = signal('');

  protected toggleTodo(): void {
    this.todoService.toggleTodo(this.todo.id);
  }

  protected deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }

  protected startEditing(): void {
    this.editText.set(this.todo.text);
    this.isEditing.set(true);
    // Focus the input after the view updates
    setTimeout(() => {
      const input = document.querySelector('.edit-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    });
  }

  protected updateEditText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editText.set(target.value);
  }

  protected saveEdit(): void {
    const newText = this.editText().trim();
    if (newText && newText !== this.todo.text) {
      this.todoService.updateTodo(this.todo.id, newText);
    }
    this.isEditing.set(false);
  }

  protected cancelEdit(): void {
    this.isEditing.set(false);
  }
}