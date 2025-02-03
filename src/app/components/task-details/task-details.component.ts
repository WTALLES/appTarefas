import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatList, MatListItem } from '@angular/material/list';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { Task, Comment, Hour } from '../../../models/models-task';
import {CdkTrapFocus} from '@angular/cdk/a11y';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatTabGroup,
    MatTab,
    MatList,
    MatListItem,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    NgForOf,
    MatDialogTitle,
    CdkTrapFocus

  ]
})
export class TaskDetailsComponent {
  task: Task;
  commentForm: FormGroup;
  hoursForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    // Inicialização segura
    this.task = data.task || {
      id: 0,
      name: '', // Alterado de 'title'
      description: '',
      planned_hours: 0,
      status: 1,
      owner: 0,
      comments: [], // Array inicializado
      hours: []     // Array inicializado
    };

    // Formulário para comentários
    this.commentForm = this.fb.group({
      text: [''], // Use "text" instead of "note"
      task: [this.task.id],
      user: [1]
    });

    // Formulário para horas trabalhadas
    this.hoursForm = this.fb.group({
      hours: [''],
      task: [this.task.id],
      user: [1]
    });
  }

  // Adicionar um comentário
  addComment(): void {
    if (this.commentForm.valid) {
      const commentData: Comment = this.commentForm.value;

      this.taskService.addComment(commentData).subscribe({
        next: (newComment) => {
          this.task.comments = [...this.task.comments, newComment];
          this.commentForm.reset();
          alert('Comentário adicionado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao adicionar comentário:', err);
          alert('Erro ao adicionar comentário. Tente novamente.');
        }
      });
    }
  }

  // Registrar horas trabalhadas
  logHours(): void {
    if (this.hoursForm.valid) {
      const hourData: Hour = this.hoursForm.value;

      this.taskService.logHours(hourData).subscribe({
        next: (newHour) => {
          this.task.hours = [...this.task.hours, newHour];
          this.hoursForm.reset();
          alert('Horas registradas com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao registrar horas:', err);
          alert('Erro ao registrar horas. Tente novamente.');
        }
      });
    }
  }
}
