import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoListComponent } from './todo-list/todo-list.component'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'reactive-forms-ngrx-w4d1'
}
