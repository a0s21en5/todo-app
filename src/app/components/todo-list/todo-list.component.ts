import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  template: `
    <div class="todo-list-container">
      @if (todoService.filteredTodos().length === 0) {
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8Z" stroke="currentColor" stroke-width="2"/>
              <path d="M44 28L28 44L20 36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="empty-title">{{ getEmptyMessage() }}</h3>
          <p class="empty-description">{{ getEmptyDescription() }}</p>
        </div>
      } @else {
        <div class="todo-list">
          @for (todo of todoService.filteredTodos(); track todo.id) {
            <app-todo-item [todo]="todo" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .todo-list-container {
      min-height: 200px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      color: #6b7280;
    }

    .empty-icon {
      margin-bottom: 1.5rem;
      opacity: 0.5;
    }

    .empty-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: #374151;
    }

    .empty-description {
      font-size: 1rem;
      margin: 0;
      max-width: 300px;
    }

    .todo-list {
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 640px) {
      .empty-state {
        padding: 2rem 1rem;
      }

      .empty-title {
        font-size: 1.25rem;
      }

      .empty-description {
        font-size: 0.875rem;
      }
    }
  `]
})
export class TodoListComponent {
  protected todoService = inject(TodoService);

  protected getEmptyMessage(): string {
    const filter = this.todoService.currentFilter();
    const stats = this.todoService.stats();

    if (stats.total === 0) {
      return 'No todos yet';
    }

    switch (filter) {
      case 'active':
        return 'No active todos';
      case 'completed':
        return 'No completed todos';
      default:
        return 'No todos found';
    }
  }

  protected getEmptyDescription(): string {
    const filter = this.todoService.currentFilter();
    const stats = this.todoService.stats();

    if (stats.total === 0) {
      return 'Add your first todo to get started!';
    }

    switch (filter) {
      case 'active':
        return 'All your todos are completed! 🎉';
      case 'completed':
        return 'No completed todos yet. Keep working!';
      default:
        return 'Try adjusting your filters.';
    }
  }
}