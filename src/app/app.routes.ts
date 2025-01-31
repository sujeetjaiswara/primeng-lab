import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    // pathMatch: 'full',
    loadComponent: () =>
      import('./todo/todo.component').then((c) => c.TodoComponent),
  },
];
