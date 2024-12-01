import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<any> {
    return this.http
      .get(`${constants.API_BASE_URL}/users?page=${page}`)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: string): Observable<any> {
    return this.http
      .get(`${constants.API_BASE_URL}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string): Observable<any> {  
    return this.http
      .post(`${constants.API_BASE_URL}/login`, { email: username, password })
      .pipe(map((response: any) => {
        return response;
      }), catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    throw error;
  }
  
}
