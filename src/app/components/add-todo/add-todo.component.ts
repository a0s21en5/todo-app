import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../features/todo/services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  private todoService = inject(TodoService);
  
  newTodoTitle = '';

  onSubmit(): void {
    const trimmedTitle = this.newTodoTitle.trim();
    
    if (trimmedTitle) {
      this.todoService.addTodo({ title: trimmedTitle }).catch(error => {
        console.error('Failed to add todo:', error);
      });
      this.newTodoTitle = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}