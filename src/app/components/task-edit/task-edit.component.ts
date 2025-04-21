import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksServiceService } from '../../services/tasks-service.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  taskForm: FormGroup;
  taskId!: number;
  minDate: Date = new Date();
  iscompleted: boolean = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TasksServiceService,
    private alert: AlertService
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.pattern(/^(?!\s*$).*$/), Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit() {

    debugger
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        console.log('id', this.taskId);

        this.loadTask();
      }
    });
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.iscompleted = task.isCompleted
        this.taskForm.patchValue({
          taskName: task.title,
          description: task.description,
          dueDate: task.dueDate,
          isCompleted: task.isCompleted
        });
      },
      error: () => {
        this.alert.showError('שגיאה בטעינת המשימה');
        this.router.navigate(['/tasks']);
      }
    });
  }

  saveTask() {
    debugger
    if (this.taskForm.invalid) {
      this.alert.showError('אנא תקן/י את השדות השגויים');
      return;
    }

    const updatedTask = {
      id: this.taskId,
      title: this.taskForm.get('taskName')?.value,
      description: this.taskForm.get('description')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
      isCompleted: this.iscompleted

    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.alert.showSuccess('המשימה עודכנה בהצלחה');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.alert.showError('שגיאה בעדכון המשימה');
      }
    });
  }
}
