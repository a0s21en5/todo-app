export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  description?: string;
}

export interface CreateTodoDto {
  title: string;
  priority?: Todo['priority'];
  category?: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
  priority?: Todo['priority'];
  category?: string;
  description?: string;
}

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
  byPriority?: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority?: Todo['priority'];
  category?: string;
  searchTerm?: string;
}