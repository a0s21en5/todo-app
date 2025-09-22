import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../features/todo/services/todo.service';
import { FilterType } from '../../shared/constants/app.constants';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  private todoService = inject(TodoService);
  
  readonly currentFilter = this.todoService.filter;
  readonly todoCounts = this.todoService.todoStats;

  readonly filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'active', label: 'Active', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' }
  ];

  setFilter(filter: FilterType): void {
    this.todoService.setFilter({ status: filter });
  }

  clearCompleted(): void {
    this.todoService.clearCompleted().catch(error => {
      console.error('Failed to clear completed todos:', error);
    });
  }
}