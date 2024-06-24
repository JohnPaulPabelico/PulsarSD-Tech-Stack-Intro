import { TaskService } from '../task.service';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogResult,
  TaskDialogComponent,
} from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];

  ngOnInit() {
    this.loadTasks(); // Load tasks from Firestore on component initialization
  }

  loadTasks() {
    this.taskService.loadTasks().subscribe((tasks: any[]) => {
      this.todo = tasks.filter((task) => task.status === 'todo');
      this.inProgress = tasks.filter((task) => task.status === 'inProgress');
      this.done = tasks.filter((task) => task.status === 'done');
    });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        const dataList = this[list];
        const taskIndex = dataList.findIndex((t) => t.id === task.id);
        if (result.delete) {
          this.taskService.deleteTask(task.id); // Delete task from Firestore
        } else {
          this.taskService.updateTask(task.id, result.task); // Update task in Firestore
        }
      });
  }

  drop(event: CdkDragDrop<any[]>): void {
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
      // Update Firestore with new task status
      const movedTask = event.container.data[event.currentIndex];
      this.taskService.updateTask(movedTask.id, {
        status: event.container.id,
      });
    }
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.taskService.addTask(result.task); // Add new task to Firestore
      });
  }
}