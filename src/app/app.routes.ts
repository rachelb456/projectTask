import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    { path: 'add-task', component: TaskEditComponent },
    {path:'tasks',component:TaskListComponent},
    { path: 'edit/:id', component: TaskEditComponent },
];
