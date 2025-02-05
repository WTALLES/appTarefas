export interface Comment {
  id?: number;
  note: string;    // Conforme o endpoint, o campo é "note"
  task: number;
  user: number;    // ID do usuário que adicionou o comentário
}
