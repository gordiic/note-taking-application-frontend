import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = ['/api/login'];
    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    } else {
      const credentials = this.authService.getCredentials();
      console.log(credentials)
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password))
      });
      return next.handle(authReq);
    }
  }
}
