import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Task } from './list.reducer'

export const selectTodoState = createFeatureSelector<Task[]>('todos')

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: Task[]) => state,
)

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos: Task[]) => todos.filter(todo => todo.complete),
)

export const selectIncompleteTodos = createSelector(
  selectAllTodos,
  (todos: Task[]) => todos.filter(todo => !todo.complete),
)
