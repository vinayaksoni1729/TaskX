export interface Todo {
  id: string; // Changed from number to string to match Firestore document IDs
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: number;
  userId: string;
}

export type ViewType = 'inbox' | 'today' | 'important' | 'completed';