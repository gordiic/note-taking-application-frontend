import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType} from '@angular/common/http';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = ['/api/login'];
    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req).pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            this.notificationService.showNotification('Successfully logged in!', true);
          }
        }),
        catchError(error => {
          if (error.status === 401) {
            this.notificationService.showNotification('Unauthorized!', false);
          } else {
            this.notificationService.showNotification('Error happened.', false);
          }
          return throwError(error);
        })
      );
    } else {
      const credentials = this.authService.getCredentials();
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
      });
      return next.handle(authReq).pipe(
        tap(event => {
          if (authReq.method!=="GET" && event.type === HttpEventType.Response) {
            this.notificationService.showNotification('Request completed successfully!', true);
          }
        }),
        catchError(error => {
          if (error.status === 401) {
            this.notificationService.showNotification('Unauthorized.', false);
          } else {
            this.notificationService.showNotification('Error happened.', false);
          }
          return throwError(error);
        })
      );
    }
  }
}
