import { Component } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  constructor(
    private todoService: TodoService,
    private messageService: MessageService
  ) {}

  todos: Todo[] = [];

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos.data));
  }

  ngOnInit() {
    this.getTodos();
  }

  add(name: string, category: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.todoService.addTodo({ name, category } as Todo).subscribe((todo) => {
      console.log(todo)
      this.todos.push(todo.data);
    });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}
