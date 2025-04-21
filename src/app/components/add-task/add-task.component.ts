import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { BidiModule } from '@angular/cdk/bidi';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { Task } from '../../classes/task';
import { HttpClient } from '@angular/common/http';
import { TasksServiceService } from '../../services/tasks-service.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatPseudoCheckbox,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    BidiModule,
    MatGridListModule,
    MatDatepickerToggle,

  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {


  taskName = new FormControl('', [
    Validators.required,
    Validators.pattern(/\S+/),
    Validators.minLength(3)
  ]);
  dueDate = new FormControl('', [Validators.required]);
  description = new FormControl('');

  taskForm = new FormGroup({
    taskName: this.taskName,
    dueDate: this.dueDate,
    description: this.description,

  });
  minDate = new Date();
  constructor(public httpclient: HttpClient, public taskService: TasksServiceService, public alert: AlertService, private router: Router) { }


  addTask() {

    if (this.taskForm.valid) {
      debugger
      const newTask: Task = new Task(
        0,
        this.taskName.value || '',
        new Date(this.dueDate.value || ''),
        this.description.value || '');
      console.log('Task added:', newTask);
      this.taskService.addTask(newTask).subscribe(
        (response) => {
          console.log('Task added successfully:', response);
          this.alert.showSuccess("המשימה נוספה בהצלחה", "הצלחה");

          // מעבר לעמוד רשימת המשימות לאחר ההצלחה
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1000);
        },
        (error) => {
          console.error('Error adding task:', error);
          this.alert.showError("שגיאה בהוספת משימה", "שגיאה");
        }
      );
      this.alert.showSuccess("המשימה נוספה בהצלחה", "הצלחה");

    }

  }
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      console.log('Task submitted:', newTask);
      this.addTask();
    } else {
      console.log('Please fill in all required fields.');
    }
  }

}
