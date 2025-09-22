import { Injectable, signal } from '@angular/core';
import { Todo, CreateTodoDto, UpdateTodoDto, FilterType } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'angular-todos';
  
  // Using Angular signals for reactive state management
  private _todos = signal<Todo[]>([]);
  private _filter = signal<FilterType>('all');

  // Public readonly signals
  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();

  // Computed signal for filtered todos
  readonly filteredTodos = this.getFilteredTodos();

  constructor() {
    this.loadTodosFromStorage();
  }

  /**
   * Get filtered todos based on current filter
   */
  private getFilteredTodos() {
    return signal(() => {
      const todos = this._todos();
      const filter = this._filter();

      switch (filter) {
        case 'active':
          return todos.filter(todo => !todo.completed);
        case 'completed':
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    });
  }

  /**
   * Add a new todo
   */
  addTodo(createTodoDto: CreateTodoDto): void {
    const now = new Date();
    const newTodo: Todo = {
      id: this.generateId(),
      title: createTodoDto.title.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    this._todos.update(todos => [...todos, newTodo]);
    this.saveTodosToStorage();
  }

  /**
   * Update an existing todo
   */
  updateTodo(id: string, updateTodoDto: UpdateTodoDto): void {
    this._todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              ...updateTodoDto,
              updatedAt: new Date()
            }
          : todo
      )
    );
    this.saveTodosToStorage();
  }

  /**
   * Toggle todo completion status
   */
  toggleTodo(id: string): void {
    const todo = this._todos().find(t => t.id === id);
    if (todo) {
      this.updateTodo(id, { completed: !todo.completed });
    }
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: string): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
    this.saveTodosToStorage();
  }

  /**
   * Clear all completed todos
   */
  clearCompleted(): void {
    this._todos.update(todos => todos.filter(todo => !todo.completed));
    this.saveTodosToStorage();
  }

  /**
   * Set filter type
   */
  setFilter(filter: FilterType): void {
    this._filter.set(filter);
  }

  /**
   * Get todo counts
   */
  getTodoCounts() {
    return signal(() => {
      const todos = this._todos();
      return {
        total: todos.length,
        active: todos.filter(todo => !todo.completed).length,
        completed: todos.filter(todo => todo.completed).length
      };
    });
  }

  /**
   * Generate unique ID for new todos
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Load todos from localStorage
   */
  private loadTodosFromStorage(): void {
    try {
      const storedTodos = localStorage.getItem(this.STORAGE_KEY);
      if (storedTodos) {
        const todos: Todo[] = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        this._todos.set(todos);
      }
    } catch (error) {
      console.error('Error loading todos from storage:', error);
    }
  }

  /**
   * Save todos to localStorage
   */
  private saveTodosToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._todos()));
    } catch (error) {
      console.error('Error saving todos to storage:', error);
    }
  }
}