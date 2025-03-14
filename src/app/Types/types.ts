export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: number;
  userId: string;
  project?: string;
  deadline?: Date;
  recurring?: string;
  completedAt?: Date; // Add this new field
}
export type ViewType = 'inbox' | 'today' | 'important' | 'completed' | 'upcoming' | string;