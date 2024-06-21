import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private firestore: AngularFirestore // Inject AngularFirestore
  ) {}

  save(): void {
    const taskToSave = { ...this.data.task };
    if (taskToSave.id) {
      // Existing task: update in Firestore
      this.firestore
        .collection('tasks')
        .doc(taskToSave.id)
        .update(taskToSave)
        .then(() => {
          this.dialogRef.close({ task: taskToSave });
        })
        .catch((error) => {
          console.error('Error updating task:', error);
          // Handle error
        });
    } else {
      // New task: add to Firestore
      this.firestore
        .collection('tasks')
        .add(taskToSave)
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
    this.firestore
      .collection('tasks')
      .doc(this.data.task.id)
      .delete()
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
