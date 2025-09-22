import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../features/todo/services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  
  // Get filtered todos from service
  readonly filteredTodos = this.todoService.filteredTodos;
  readonly todoCounts = this.todoService.todoStats;

  trackByTodoId(index: number, todo: any): string {
    return todo.id;
  }
}