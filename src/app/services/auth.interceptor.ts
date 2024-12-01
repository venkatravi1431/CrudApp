import { HttpRequest, HttpEvent, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let token:string|null;
  try {
    token = localStorage.getItem('token');
  } catch(err) {
    console.log(err);
    token = null;
  } 

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
}
