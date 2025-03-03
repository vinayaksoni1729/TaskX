// dashboard/types.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    priority: number;
  }
  
  export type ViewType = 'inbox' | 'today' | 'important' | 'completed';