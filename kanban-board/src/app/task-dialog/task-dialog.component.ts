import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private taskService: TaskService
  ) {}

  save(): void {
    const taskToSave = { ...this.data.task };
    if (taskToSave.id) {
      // Existing task: update in Firestore
      this.taskService
        .updateTask(taskToSave.id, taskToSave)
        .then(() => {
          this.dialogRef.close({ task: taskToSave });
        })
        .catch((error) => {
          console.error('Error updating task:', error);
          // Handle error
        });
    } else {
      // New task: add to Firestore
      this.taskService
        .addTask(taskToSave)
        .then((docRef) => {
          taskToSave.id = docRef.id; // Update task with Firestore document ID
          this.dialogRef.close({ task: taskToSave });
        })
        .catch((error) => {
          console.error('Error adding task:', error);
          // Handle error
        });
    }
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close();
  }

  delete(): void {
    this.taskService
      .deleteTask(this.data.task.id!)
      .then(() => {
        this.dialogRef.close({ task: this.data.task, delete: true });
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        // Handle error
      });
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
