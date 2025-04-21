import { Component } from '@angular/core';
import { Task } from '../../classes/task';
import { TasksServiceService } from '../../services/tasks-service.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  searchTitle: string = '';

  constructor(public taskService: TasksServiceService, public alert: AlertService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;

      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  filterTasks() {
    const search = this.searchTitle.trim();
    this.taskService.getTasks(search).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => console.error('שגיאה בחיפוש משימות:', err),
    });
  }
  markTaskAsCompleted(task: Task) {
    debugger
    task.isCompleted = true
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.alert.showSuccess('המשימה עודכנה בהצלחה');
        this.loadTasks(); // טוען מחדש את המשימות לאחר העדכון
      },
      error: () => {
        this.alert.showError('שגיאה בעדכון המשימה');
      }
    });
  }

  deleteTask(id: number) {
    this.alert.confirmDelete('? האם את/ה בטוח/ה שברצונך למחוק את המשימה').then((confirmed) => {
      if (confirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.alert.showSuccess('המשימה נמחקה בהצלחה');
            this.loadTasks();
          },
          error: (err) => {
            console.error('Error deleting task:', err);
            this.alert.showError('שגיאה במחיקת המשימה');
          }
        });
      }
    });
  }

}
