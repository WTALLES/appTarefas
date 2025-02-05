import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task';


import { DragDropModule, moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgStyle} from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIcon, MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  standalone: true,
  imports: [
    DragDropModule,
    MatCard,
    MatButton,
    MatFormField,
    MatInput,
    NgForOf,
    FormsModule,
    MatCardContent,
    MatCardTitle,
    NgStyle,
    MatCardHeader,
    MatIcon,
    MatIconModule,
    MatIconButton,
    MatCardActions
  ],
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  statuses = ['A fazer', 'Em andamento', 'Concluído'];
  tasks: Record<string, Task[]> = {
    'A fazer': [],
    'Em andamento': [],
    'Concluído': []
  };

  newComment: string = '';
  newHours: number = 0;
  newResponsible: string = '';

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        console.log('Tarefas carregadas:', data);
        const statusMap: Record<number, string> = {
          1: 'A fazer',
          2: 'Em andamento',
          3: 'Concluído'
        };
        this.tasks = { 'A fazer': [], 'Em andamento': [], 'Concluído': [] };
        data.forEach((task) => {
          task.comments = task.comments || [];
          const key = statusMap[task.status] || 'A fazer';
          this.tasks[key].push(task);
        });
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(taskId: number | undefined): void {
    if (taskId === undefined) {
      console.error('ID da tarefa é indefinido.');
      return;
    }

    this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Erro ao excluir tarefa:', error);
        }
    );
  }


  addComment(task: Task): void {
    if (this.newComment.trim() && task.id) {
      const payload = { note: this.newComment, taskId: task.id };
      this.taskService.addComment(payload).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Erro ao adicionar comentário:', error);
        }
      );
      this.newComment = '';
    }
  }

  logHours(task: Task): void {
    if (this.newHours > 0 && task.id) {
      const payload = { hours: this.newHours, taskId: task.id };
      this.taskService.logHours(payload).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Erro ao registrar horas:', error);
        }
      );
      this.newHours = 0;
    }
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      const newStatus: 1 | 2 | 3 =
        event.container.id === 'A fazer'
          ? 1
          : event.container.id === 'Em andamento'
            ? 2
            : 3;
      // Atualiza somente o status
      const updatedTask = { status: newStatus };
      this.taskService.updateTask(task.id!, updatedTask).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Erro ao atualizar status:', error);
        }
      );
    }
  }

  saveTaskUpdates(task: Task): void {
    if (!task.id) return;

    const updates: Partial<Task> = {};

    if (this.newComment.trim()) {
      updates.comments = [
        ...(task.comments || []),
        { note: this.newComment, user: 1, task: task.id }
      ];
    }

    if (this.newHours > 0) {
      updates.planned_hours = (task.planned_hours || 0) + this.newHours;
    }

    if (this.newResponsible.trim()) {
      const ownerId = parseInt(this.newResponsible.trim(), 10);
      if (!isNaN(ownerId)) {
        updates.owner = ownerId;
      }
    }

    // Debug: verificar o payload antes do envio
    console.log('Payload para atualização:', updates);

    if (Object.keys(updates).length > 0) {
      this.taskService.updateTask(task.id, updates).subscribe(
        () => {
          this.loadTasks();
          this.newComment = '';
          this.newHours = 0;
          this.newResponsible = '';
        },
        (error) => {
          console.error('Erro ao salvar alterações:', error);
        }
      );
    }
  }

  // Dentro da classe TaskBoardComponent

  getStatusColor(status: number): string {
    switch (status) {
      case 1:
        return '#f44336'; // vermelho para "A fazer"
      case 2:
        return '#ff9800'; // laranja para "Em andamento"
      case 3:
        return '#4caf50'; // verde para "Concluído"
      default:
        return '#9e9e9e'; // cinza para outros casos
    }
  }

}
