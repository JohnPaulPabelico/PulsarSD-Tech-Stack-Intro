import { Task } from './task/task';
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
} from './task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];

  ngOnInit() {
    this.loadTasks(); // Load tasks from Firestore on component initialization
  }

  loadTasks() {
    this.firestore
      .collection('tasks')
      .valueChanges({ idField: 'id' })
      .subscribe((tasks: any[]) => {
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
          this.firestore.collection('tasks').doc(task.id).delete(); // Delete task from Firestore
        } else {
          this.firestore.collection('tasks').doc(task.id).update(result.task); // Update task in Firestore
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
      this.firestore
        .collection('tasks')
        .doc(movedTask.id)
        .update({ status: event.container.id });
    }
  }

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) {}

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
        this.firestore
          .collection('tasks')
          .add({ ...result.task, status: 'todo' }); // Add new task to Firestore
      });
  }
}
