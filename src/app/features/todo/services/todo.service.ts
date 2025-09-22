import { Injectable, computed, signal, inject } from '@angular/core';
import { 
  Todo, 
  CreateTodoDto, 
  UpdateTodoDto, 
  TodoStats, 
  TodoFilter 
} from '../models/todo.interface';
import { LocalStorageService } from '../../../core/services/storage.service';
import { GlobalErrorHandler } from '../../../core/services/error-handler.service';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';
import { StringUtils } from '../../../shared/utils/common.utils';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageService = inject(LocalStorageService);
  private readonly errorHandler = inject(GlobalErrorHandler);
  
  // Private state signals
  private readonly _todos = signal<Todo[]>([]);
  private readonly _filter = signal<TodoFilter>({
    status: 'all',
    searchTerm: ''
  });
  private readonly _isLoading = signal(false);
  
  // Public readonly signals
  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  
  // Computed signals
  readonly filteredTodos = computed(() => {
    const todos = this._todos();
    const filter = this._filter();
    
    return this.applyFilters(todos, filter);
  });
  
  readonly todoStats = computed((): TodoStats => {
    const todos = this._todos();
    const active = todos.filter(todo => !todo.completed);
    const completed = todos.filter(todo => todo.completed);
    
    return {
      total: todos.length,
      active: active.length,
      completed: completed.length,
      byPriority: {
        low: todos.filter(todo => todo.priority === 'low').length,
        medium: todos.filter(todo => todo.priority === 'medium').length,
        high: todos.filter(todo => todo.priority === 'high').length
      }
    };
  });
  
  readonly hasActiveTodos = computed(() => this.todoStats().active > 0);
  readonly hasCompletedTodos = computed(() => this.todoStats().completed > 0);
  
  constructor() {
    this.loadTodosFromStorage();
  }
  
  /**
   * Add a new todo with enhanced validation and error handling
   */
  async addTodo(createTodoDto: CreateTodoDto): Promise<void> {
    try {
      this._isLoading.set(true);
      
      const trimmedTitle = createTodoDto.title.trim();
      if (!trimmedTitle) {
        throw new Error('Todo title cannot be empty');
      }
      
      if (trimmedTitle.length > APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH) {
        throw new Error(`Todo title cannot exceed ${APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH} characters`);
      }
      
      const now = new Date();
      const newTodo: Todo = {
        id: StringUtils.generateId(),
        title: trimmedTitle,
        completed: false,
        createdAt: now,
        updatedAt: now,
        priority: createTodoDto.priority || 'medium',
        category: createTodoDto.category,
        description: createTodoDto.description
      };
      
      this._todos.update(todos => [...todos, newTodo]);
      await this.saveTodosToStorage();
      
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.addTodo');
      throw error; // Re-throw for component handling
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Update an existing todo with optimistic updates
   */
  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    try {
      this._isLoading.set(true);
      
      const existingTodo = this._todos().find(todo => todo.id === id);
      if (!existingTodo) {
        throw new Error(`Todo with id ${id} not found`);
      }
      
      // Validate title if being updated
      if (updateTodoDto.title !== undefined) {
        const trimmedTitle = updateTodoDto.title.trim();
        if (!trimmedTitle) {
          throw new Error('Todo title cannot be empty');
        }
        if (trimmedTitle.length > APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH) {
          throw new Error(`Todo title cannot exceed ${APP_CONSTANTS.VALIDATION.TODO_TITLE_MAX_LENGTH} characters`);
        }
        updateTodoDto.title = trimmedTitle;
      }
      
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
      
      await this.saveTodosToStorage();
      
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.updateTodo');
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Toggle todo completion status
   */
  async toggleTodo(id: string): Promise<void> {
    const todo = this._todos().find(t => t.id === id);
    if (todo) {
      await this.updateTodo(id, { completed: !todo.completed });
    }
  }
  
  /**
   * Delete a todo with confirmation
   */
  async deleteTodo(id: string): Promise<void> {
    try {
      this._isLoading.set(true);
      
      const todoExists = this._todos().some(todo => todo.id === id);
      if (!todoExists) {
        throw new Error(`Todo with id ${id} not found`);
      }
      
      this._todos.update(todos => todos.filter(todo => todo.id !== id));
      await this.saveTodosToStorage();
      
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.deleteTodo');
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Clear all completed todos
   */
  async clearCompleted(): Promise<void> {
    try {
      this._isLoading.set(true);
      
      const completedCount = this._todos().filter(todo => todo.completed).length;
      if (completedCount === 0) {
        return; // Nothing to clear
      }
      
      this._todos.update(todos => todos.filter(todo => !todo.completed));
      await this.saveTodosToStorage();
      
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.clearCompleted');
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Update filter settings
   */
  setFilter(filter: Partial<TodoFilter>): void {
    this._filter.update(currentFilter => ({
      ...currentFilter,
      ...filter
    }));
  }
  
  /**
   * Get todo by ID
   */
  getTodoById(id: string): Todo | undefined {
    return this._todos().find(todo => todo.id === id);
  }
  
  /**
   * Apply filters to todos
   */
  private applyFilters(todos: Todo[], filter: TodoFilter): Todo[] {
    let filtered = [...todos];
    
    // Filter by status
    switch (filter.status) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      // 'all' shows everything
    }
    
    // Filter by priority
    if (filter.priority) {
      filtered = filtered.filter(todo => todo.priority === filter.priority);
    }
    
    // Filter by category
    if (filter.category) {
      filtered = filtered.filter(todo => todo.category === filter.category);
    }
    
    // Filter by search term
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }
  
  /**
   * Load todos from storage with error handling
   */
  private async loadTodosFromStorage(): Promise<void> {
    try {
      this._isLoading.set(true);
      
      const storedTodos = this.storageService.getItem<Todo[]>(APP_CONSTANTS.STORAGE_KEYS.TODOS);
      
      if (storedTodos && Array.isArray(storedTodos)) {
        // Parse dates that were serialized as strings
        const todos: Todo[] = storedTodos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        
        this._todos.set(todos);
      }
      
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.loadTodosFromStorage');
      // Don't throw here - just log the error and continue with empty todos
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Save todos to storage with error handling
   */
  private async saveTodosToStorage(): Promise<void> {
    try {
      this.storageService.setItem(APP_CONSTANTS.STORAGE_KEYS.TODOS, this._todos());
    } catch (error) {
      this.errorHandler.handleError(error, 'TodoService.saveTodosToStorage');
      throw error; // Re-throw storage errors as they're critical
    }
  }
}