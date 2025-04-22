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
import { Task } from '../../classes/task';

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
  taskId?: number;
  isEditMode = false;
  minDate = new Date();
  iscompleted=false
  newTask:Task=new Task(0,"",new Date(),"",false)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TasksServiceService,
    private alert: AlertService
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.pattern(/\S+/), Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    //בדיקה אם הגיעה משימה לעריכה או הוספת משימה
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask();
    }
  }
  
//טעינת המשימה לעריכה
  loadTask() {
    this.taskService.getTaskById(this.taskId!).subscribe({
      next: (task) => {
        this.iscompleted = task.isCompleted
        this.taskForm.patchValue({
          taskName: task.title,
          description: task.description,
          dueDate: task.dueDate,
          isCompleted:this.iscompleted
          
        });
      },
      error: () => {
        this.alert.showError('שגיאה בטעינת המשימה');
        this.router.navigate(['/tasks']);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.alert.showError('אנא תקן/י את השדות השגויים');
      return;
    }

    const formValues = this.taskForm.value;
    const taskData = {
      title: formValues.taskName,
      description: formValues.description,
      dueDate: formValues.dueDate,
    };
//אם המשימה היא עריכה 
    if (this.isEditMode) {
      this.taskService.updateTask({ id: this.taskId!, isCompleted: this.iscompleted, ...taskData }).subscribe({
        next: () => {
          this.alert.showSuccess('המשימה עודכנה בהצלחה');
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.alert.showError('שגיאה בעדכון המשימה');
        }
      });
    } 
    //או משימה להוספה
    else {
      this.newTask = {
        ...this.newTask,
        title: taskData.title,
        description: taskData.description,
        dueDate: new Date(taskData.dueDate)
      };
      this.taskService.addTask(this.newTask ).subscribe({
        next: () => {
          this.alert.showSuccess('המשימה נוספה בהצלחה');
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.alert.showError('שגיאה בהוספת משימה');
        }
      });
    }
  }
}
