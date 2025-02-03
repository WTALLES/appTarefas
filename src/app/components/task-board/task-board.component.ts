import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Task } from '../../../models/models-task';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  standalone: true,
  imports: [
    MatIcon,
    CdkDropList,
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgForOf,
    MatButton,
    CdkDrag
  ],
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  statuses = ['A fazer', 'Em andamento', 'Concluído'];
  tasks: any = {
    'A fazer': [],
    'Em andamento': [],
    'Concluído': []
  };

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = {
        'A fazer': [],
        'Em andamento': [],
        'Concluído': []
      };

      const statusMap: Record<number, string> = {
        1: 'A fazer',
        2: 'Em andamento',
        3: 'Concluído'
      };

      data.forEach((task: Task) => {
        let statusKey = Array.isArray(task.status) ? task.status[0] : task.status; // Pega o primeiro valor se for array
        const status = statusMap[Number(statusKey)] || 'A fazer'; // Garante que seja número válido

        if (this.tasks[status]) {
          this.tasks[status].push(task);
        } else {
          console.warn(`Status inválido encontrado: ${task.status}. Definindo como 'A fazer'.`);
          this.tasks['A fazer'].push(task);
        }
      });
    });
  }



  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = event.container.id;
      this.taskService.updateTask(task.id, task).subscribe();
    }
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { task }
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) this.loadTasks();
    });
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => { // Removido '!'
        this.loadTasks();
      });
    }
  }
  openTaskDetails(task: Task) {
    this.dialog.open(TaskDetailsComponent, {
      data: {
        task: task,
        taskTitle: task.name // Alterado de 'title'
      }
    });
  }

  protected readonly status = status;
}
