import { Component, Input } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  @Input() todo?: Todo;

  public todoForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe((todo) => (this.todo = todo.data));
  }

  save(): void {
    if (this.todoForm.valid) {
      this.todoService
        .updateTodo(this.todoForm.value)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
