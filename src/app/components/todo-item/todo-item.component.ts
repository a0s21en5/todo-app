import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from '../../features/todo/models/todo.interface';
import { TodoService } from '../../features/todo/services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  
  private todoService = inject(TodoService);
  
  isEditing = signal(false);
  editText = signal('');

  onToggle(): void {
    this.todoService.toggleTodo(this.todo.id).catch(error => {
      console.error('Failed to toggle todo:', error);
    });
  }

  onDelete(): void {
    this.todoService.deleteTodo(this.todo.id).catch(error => {
      console.error('Failed to delete todo:', error);
    });
  }

  startEdit(): void {
    this.editText.set(this.todo.title);
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editText.set('');
  }

  saveEdit(): void {
    const trimmedText = this.editText().trim();
    
    if (trimmedText) {
      this.todoService.updateTodo(this.todo.id, { title: trimmedText }).catch(error => {
        console.error('Failed to update todo:', error);
      });
    } else {
      this.todoService.deleteTodo(this.todo.id).catch(error => {
        console.error('Failed to delete todo:', error);
      });
    }
    
    this.isEditing.set(false);
  }

  onEditKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }

  onEditBlur(): void {
    this.saveEdit();
  }
}