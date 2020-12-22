import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:57434/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Usuario
  AddUsuario(data: Usuario): Observable<any> {
    let API_URL = `${this.endpoint}/usuario`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Usuarios
  GetUsuarios() {
    return this.http.get(`${this.endpoint}/usuario`);
  }

  // Get Usuario
  GetUsuario(id): Observable<any> {
    let API_URL = `${this.endpoint}/usuario/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Usuario
  UpdateUsuario(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/usuario/${id}`;
    return this.http.put(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Usuario
  DeleteUsuario(id): Observable<any> {
    var API_URL = `${this.endpoint}/usuario/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}