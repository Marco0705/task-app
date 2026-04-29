import { Routes } from '@angular/router';
import { TasksComponent } from './features/tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: '**', redirectTo: '' }
];