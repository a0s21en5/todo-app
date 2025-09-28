import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [],
  template: `
    @if (todoService.stats().total > 0) {
      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ todoService.stats().total }}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-item">
            <div class="stat-value active">{{ todoService.stats().active }}</div>
            <div class="stat-label">Active</div>
          </div>
          <div class="stat-item">
            <div class="stat-value completed">{{ todoService.stats().completed }}</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>
        
        @if (todoService.stats().total > 0) {
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                [style.width.%]="getCompletionPercentage()"
              ></div>
            </div>
            <div class="progress-text">
              {{ getCompletionPercentage() }}% Complete
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .stats-container {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .stat-value.active {
      color: #3b82f6;
    }

    .stat-value.completed {
      color: #10b981;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .progress-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .progress-bar {
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      text-align: center;
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    @media (max-width: 640px) {
      .stats-container {
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .stats-grid {
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .stat-value {
        font-size: 1.5rem;
      }

      .stat-label {
        font-size: 0.75rem;
      }
    }
  `]
})
export class TodoStatsComponent {
  protected todoService = inject(TodoService);

  protected getCompletionPercentage(): number {
    const stats = this.todoService.stats();
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }
}