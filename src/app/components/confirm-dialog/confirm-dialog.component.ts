
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>Confirmar Exclusão</h2>
    <mat-dialog-content>
      Tem certeza que deseja excluir a tarefa "{{ data.taskTitle }}"?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Excluir</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string }
  ) {}
}
