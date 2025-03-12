// import { CommonModule } from '@angular/common'
// import { Component, OnInit } from '@angular/core'
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms'
// import { Observable } from 'rxjs'
// import { Task } from '../state/list.reducer'
// import { Store } from '@ngrx/store'
// import {
//   selectAllTodos,
//   selectCompletedTodos,
//   selectIncompleteTodos,
// } from '../state/list.selector'
// import {
//   addTask,
//   completeTask,
//   removeTask,
//   resetTasks,
// } from '../state/list.actions'

// @Component({
//   selector: 'app-todo-list',
//   imports: [ReactiveFormsModule, CommonModule, FormsModule, FormsModule],
//   templateUrl: './todo-list.component.html',
//   styleUrl: './todo-list.component.scss',
// })
// export class TodoListComponent implements OnInit {
//   todoForm?: FormGroup
//   todos$?: Observable<Task[]>
//   completedTodos$?: Observable<Task[]>
//   incompleteTodos$?: Observable<Task[]>

//   constructor(private fb: FormBuilder, private store: Store) {
//     this.todos$ = this.store.select(selectAllTodos)
//     this.completedTodos$ = this.store.select(selectCompletedTodos)
//     this.incompleteTodos$ = this.store.select(selectIncompleteTodos)
//   }

//   ngOnInit(): void {
//     this.todoForm = this.fb.group({
//       name: new FormControl('', [Validators.min(2), Validators.required]),
//     })
//   }
//   onSubmit() {
//     this.todoForm?.reset()
//   }

//   addTodo(): void {
//     if (this.todoForm?.valid) {
//       this.store.dispatch(
//         addTask({
//           task: {
//             name: this.todoForm.value.name,
//             complete: false,
//           },
//         }),
//       )
//       this.todoForm.reset()
//     }
//   }
//   completeTodo(id: string): void {
//     this.store.dispatch(completeTask({ id }))
//   }

//   removeTodo(id: string): void {
//     this.store.dispatch(removeTask({ id }))
//   }

//   resetAllTodos(): void {
//     this.store.dispatch(resetTasks())
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../state/list.reducer';
import { Store } from '@ngrx/store';
import {
  selectAllTodos,
  selectCompletedTodos,
  selectIncompleteTodos,
} from '../state/list.selector';
import {
  addTask,
  completeTask,
  removeTask,
  resetTasks,
} from '../state/list.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoForm?: FormGroup;
  todos$?: Observable<Task[]>;
  completedTodos$?: Observable<Task[]>;
  incompleteTodos$?: Observable<Task[]>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
    });

    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);

    // تحميل المهام من localStorage عند تهيئة المكون
    this.loadTodosFromStorage();
  }

  addTodo(): void {
    if (this.todoForm?.valid) {
      const newTask: Task = {
        id: this.generateId(),
        name: this.todoForm.value.name,
        complete: false,
      };

      this.store.dispatch(addTask({ task: newTask }));
      this.updateLocalStorage();  // تحديث localStorage بعد إضافة مهمة جديدة
      this.todoForm.reset();
    }
  }

  completeTodo(id: string): void {
    this.store.dispatch(completeTask({ id }));
    this.updateLocalStorage();  // تحديث localStorage بعد إتمام المهمة
  }

  removeTodo(id: string): void {
    this.store.dispatch(removeTask({ id }));
    this.updateLocalStorage();  // تحديث localStorage بعد إزالة المهمة
  }

  resetAllTodos(): void {
    this.store.dispatch(resetTasks());
    this.updateLocalStorage();  // تحديث localStorage بعد إعادة تعيين المهام
  }

  // تحديث localStorage بكل المهام الحالية
  private updateLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.todos$?.subscribe(todos => {
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    }
  }

  // تحميل المهام من localStorage إذا كانت موجودة
  private loadTodosFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const tasks: Task[] = JSON.parse(savedTodos);
        tasks.forEach(task => this.store.dispatch(addTask({ task })));
      }
    }
  }

  // دالة لتوليد ID عشوائي للمهمة الجديدة
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
