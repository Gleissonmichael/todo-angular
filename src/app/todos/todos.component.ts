import { Component } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TODOS } from '../mock-todos';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  constructor(private todoService: TodoService) {}

  todos: Todo[] = [];
  selectedTodo?: Todo;

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }
}
