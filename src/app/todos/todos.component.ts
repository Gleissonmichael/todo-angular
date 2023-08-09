import { Component } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';
import { MessageService } from '../message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  todos: Todo[] = [];

  public todoForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
  });

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos.data));
  }

  ngOnInit() {
    this.getTodos();
  }

  add(): void {
    if (this.todoForm.valid) {
      this.todoService
        .addTodo(this.todoForm.value as Todo)
        .subscribe((todo) => {
          this.todos.push(todo.data);
        });
    }
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}
