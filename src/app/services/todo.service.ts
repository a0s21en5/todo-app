import { Injectable, signal, computed } from '@angular/core';
import { Todo, FilterType } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([]);
  private filter = signal<FilterType>('all');
  private nextId = 1;

  // Public readonly signals
  readonly allTodos = this.todos.asReadonly();
  readonly currentFilter = this.filter.asReadonly();

  readonly filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.filter();

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  readonly stats = computed(() => {
    const todos = this.todos();
    return {
      total: todos.length,
      active: todos.filter(todo => !todo.completed).length,
      completed: todos.filter(todo => todo.completed).length
    };
  });

  constructor() {
    this.loadFromStorage();
  }

  addTodo(text: string): void {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
    this.saveToStorage();
  }

  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
    this.saveToStorage();
  }

  updateTodo(id: number, text: string): void {
    if (!text.trim()) return;

    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, text: text.trim(), updatedAt: new Date() }
          : todo
      )
    );
    this.saveToStorage();
  }

  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
    this.saveToStorage();
  }

  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
    this.saveToStorage();
  }

  toggleAll(): void {
    const allCompleted = this.stats().active === 0;
    this.todos.update(todos =>
      todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
        updatedAt: new Date()
      }))
    );
    this.saveToStorage();
  }

  setFilter(filter: FilterType): void {
    this.filter.set(filter);
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('todos', JSON.stringify(this.todos()));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('todos');
      if (stored) {
        const todos = JSON.parse(stored).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        this.todos.set(todos);
        this.nextId = Math.max(...todos.map((t: Todo) => t.id), 0) + 1;
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
    }
  }
}