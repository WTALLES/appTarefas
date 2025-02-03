export interface Task {
  id?: number;
  name: string;          // Alterado de 'title' para 'name'
  description: string;
  planned_hours: number;
  status: 1 | 2 | 3;
  owner: number;
  comments: Comment[];
  hours: Hour[];
}

export interface Comment {
  id?: number;
  text: string;
  task?: number;
  user?: number;
}

export interface Hour {
  id?: number;
  hours: number;
  task?: number;
  user?: number;
}
