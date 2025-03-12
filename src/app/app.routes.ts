// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import {Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'todo',loadComponent: () => import('./todo-list/todo-list.component').then(m => m.TodoListComponent), },
 
];


export class AppRoutingModule {}
