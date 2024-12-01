import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, take, catchError } from 'rxjs/operators';

export function emailAsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) return of(null);

    return of(email).pipe(
      debounceTime(500),
      switchMap(() => {
        const users = getUsers();
        const emailExists = users.some(user => user.emailId === email);
        return emailExists ? of({ emailTaken: true }) : of(null);
      }),
      take(1),
      catchError(() => of(null))
    );
  };
}

function getUsers() {
    let users:Array<any> = [];
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    return users;
}

