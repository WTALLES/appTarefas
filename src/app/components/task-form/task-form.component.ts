import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/models-task';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgIf } from '@angular/common';

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
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatLabel,
    NgIf,
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
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      planned_hours: [0, [Validators.required, Validators.min(1)]],
      status: [1, Validators.required],
      owner: [null, Validators.required]
    });

    if (data.task) {
      this.taskForm.patchValue(data.task);
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
        status: Number(this.taskForm.value.status) as 1 | 2 | 3,
        owner: Number(this.taskForm.value.owner)
      };

      const operation = this.data.task
        ? this.taskService.updateTask(this.data.task.id!, taskData)
        : this.taskService.createTask(taskData);

      operation.subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Operation failed:', err)
      });
    }
  }
}
