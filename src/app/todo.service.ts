import { Injectable } from '@angular/core';
import { Todo, TodoResult, TodosResult } from './interfaces/todo';
import { MessageService } from './message.service';
import { TODOS } from './mock-todos';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // private todoUrl = 'https://todo-api-snowy.vercel.app/todo';
  private todoUrl = 'http://localhost:3000/todo';

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getTodos(): Observable<TodosResult> {
    this.messageService.add('Lista atualizada!');
    return this.http.get<TodosResult>(this.todoUrl).pipe(
      tap((_) => this.log('TODOS atualizados')),
      catchError(this.handleError<TodosResult>('getTodos'))
    );
  }

  getTodo(id: number): Observable<TodoResult> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.get<TodoResult>(url).pipe(
      tap((_) => this.log(`TODO ${id} carregado`)),
      catchError(this.handleError<TodoResult>(`getTodo id=${id}`))
    );
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.todoUrl}/${todo.id}`;
    console.log(todo);
    return this.http.put(url, todo, this.httpOptions).pipe(
      tap((_) => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  addTodo(todo: Todo): Observable<TodoResult> {
    return this.http
      .post<TodoResult>(this.todoUrl, todo, this.httpOptions)
      .pipe(
        tap((newTodo: TodoResult) =>
          this.log(`added todo w/ id=${newTodo.data.id}`)
        ),
        catchError(this.handleError<TodoResult>('addTodo'))
      );
  }

  deleteTodo(id: number): Observable<TodoResult> {
    const url = `${this.todoUrl}/${id}`;

    return this.http.delete<TodoResult>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<TodoResult>('deleteTodo'))
    );
  }

  toggleTodo(id: number): Observable<TodosResult> {
    const url = `${this.todoUrl}/${id}`;

    return this.http.patch<TodosResult>(url, this.httpOptions).pipe(
      tap((_) => this.log(`complete todo id=${id}`)),
      catchError(this.handleError<TodosResult>('completeTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
