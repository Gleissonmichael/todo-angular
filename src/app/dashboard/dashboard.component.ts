import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (todos) =>
        (this.todos = todos.data.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) {
            return 1;
          }
          if (!a.isCompleted && b.isCompleted) {
            return -1;
          }
          return 0;
        }))
    );
  }
}
