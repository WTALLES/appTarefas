import {Comment} from './comments';

export interface Task {
  id?: number;
  name: string;
  description: string;
  planned_hours: number;
  status: 1 | 2 | 3;
  owner: number;         // ID do usuário responsável
  comments: Comment[];   // Array de comentários
}
