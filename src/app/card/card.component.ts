import { Component, Input } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() todos: Todo[] = [];
  constructor(private todoService: TodoService) {}
  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos.data));
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  complete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService
      .toggleTodo(todo.id)
      .subscribe((todos) => (this.todos = todos.data));
  }
}
