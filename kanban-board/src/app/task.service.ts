import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore'; // Import DocumentReference
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  loadTasks(): Observable<any[]> {
    return this.firestore.collection('task').valueChanges({ idField: 'id' });
  }

  addTask(task: any): Promise<DocumentReference<any>> {
    return this.firestore.collection('task').add({ ...task, status: 'todo' });
  }

  updateTask(taskId: string, task: any): Promise<void> {
    return this.firestore.collection('task').doc(taskId).update(task);
  }

  deleteTask(taskId: string): Promise<void> {
    return this.firestore.collection('task').doc(taskId).delete();
  }
}
