import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterType } from '../../models/todo.model';

@Component({
  selector: 'app-todo-filters',
  standalone: true,
  imports: [],
  template: `
    <div class="filters-container">
      <div class="filter-buttons">
        @for (filter of filters; track filter.value) {
          <button
            type="button"
            class="filter-button"
            [class.active]="todoService.currentFilter() === filter.value"
            (click)="setFilter(filter.value)"
          >
            {{ filter.label }}
            @if (getCount(filter.value) > 0) {
              <span class="count">
                {{ getCount(filter.value) }}
              </span>
            }
          </button>
        }
      </div>

      <div class="actions">
        @if (todoService.stats().total > 0) {
          <button
            type="button"
            class="toggle-all-button"
            (click)="toggleAll()"
            [title]="todoService.stats().active === 0 ? 'Mark all as incomplete' : 'Mark all as complete'"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ todoService.stats().active === 0 ? 'Uncheck All' : 'Check All' }}
          </button>
        }

        @if (todoService.stats().completed > 0) {
          <button
            type="button"
            class="clear-button"
            (click)="clearCompleted()"
          >
            Clear Completed ({{ todoService.stats().completed }})
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-button {
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      background: white;
      color: #374151;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-button:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .filter-button.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    .count {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .filter-button.active .count {
      background: rgba(255, 255, 255, 0.25);
    }

    .actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .toggle-all-button,
    .clear-button {
      padding: 0.625rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .toggle-all-button {
      background: #f0f9ff;
      color: #0369a1;
    }

    .toggle-all-button:hover {
      background: #e0f2fe;
      color: #0c4a6e;
    }

    .clear-button {
      background: #fef2f2;
      color: #dc2626;
    }

    .clear-button:hover {
      background: #fee2e2;
      color: #b91c1c;
    }

    @media (max-width: 640px) {
      .filters-container {
        gap: 0.75rem;
      }

      .filter-buttons {
        gap: 0.375rem;
      }

      .filter-button {
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
      }

      .actions {
        gap: 0.5rem;
      }

      .toggle-all-button,
      .clear-button {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class TodoFiltersComponent {
  protected todoService = inject(TodoService);

  protected filters = [
    { label: 'All', value: 'all' as FilterType },
    { label: 'Active', value: 'active' as FilterType },
    { label: 'Completed', value: 'completed' as FilterType }
  ];

  protected setFilter(filter: FilterType): void {
    this.todoService.setFilter(filter);
  }

  protected getCount(filter: FilterType): number {
    const stats = this.todoService.stats();
    switch (filter) {
      case 'active':
        return stats.active;
      case 'completed':
        return stats.completed;
      default:
        return stats.total;
    }
  }

  protected toggleAll(): void {
    this.todoService.toggleAll();
  }

  protected clearCompleted(): void {
    this.todoService.clearCompleted();
  }
}