import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task';
import { NgIf } from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogModule,
    NgIf,
    MatLabel,
    MatError
  ],
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      planned_hours: [0, [Validators.required, Validators.min(1)]],
      status: [1, Validators.required],
      owner: [null, Validators.required]
    });

    if (this.data.task) {
      this.taskForm.patchValue(this.data.task);
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData: Task = { ...this.taskForm.value };

      console.log("Enviando tarefa:", taskData);

      this.taskService.createTask(taskData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error("Erro ao criar tarefa:", err)
      });
    } else {
      console.error("Formulário inválido!", this.taskForm.value);
    }
  }
}
