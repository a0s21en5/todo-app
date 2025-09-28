import { Component, signal } from '@angular/core';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoFiltersComponent } from './components/todo-filters/todo-filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoStatsComponent } from './components/todo-stats/todo-stats.component';

@Component({
  selector: 'app-root',
  imports: [
    TodoInputComponent, 
    TodoFiltersComponent, 
    TodoListComponent, 
    TodoStatsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo App');
}
