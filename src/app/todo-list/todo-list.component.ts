import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Observable } from 'rxjs'
import { Task } from '../state/list.reducer'
import { Store } from '@ngrx/store'
import {
  selectAllTodos,
  selectCompletedTodos,
  selectIncompleteTodos,
} from '../state/list.selector'
import {
  addTask,
  completeTask,
  removeTask,
  resetTasks,
} from '../state/list.actions'

@Component({
  selector: 'app-todo-list',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoForm?: FormGroup
  todos$?: Observable<Task[]>
  completedTodos$?: Observable<Task[]>
  incompleteTodos$?: Observable<Task[]>

  constructor(private fb: FormBuilder, private store: Store) {
    this.todos$ = this.store.select(selectAllTodos)
    this.completedTodos$ = this.store.select(selectCompletedTodos)
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos)
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.min(2), Validators.required]),
    })
  }
  onSubmit() {
    this.todoForm?.reset()
  }

  addTodo(): void {
    if (this.todoForm?.valid) {
      this.store.dispatch(
        addTask({
          task: {
            name: this.todoForm.value.name,
            complete: false,
          },
        }),
      )
      this.todoForm.reset()
    }
  }
  completeTodo(id: string): void {
    this.store.dispatch(completeTask({ id }))
  }

  removeTodo(id: string): void {
    this.store.dispatch(removeTask({ id }))
  }

  resetAllTodos(): void {
    this.store.dispatch(resetTasks())
  }
}
