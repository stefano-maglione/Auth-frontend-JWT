import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt-service.service';

console.log('Interceptor File Loaded');

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {
    console.log('JwtInterceptor initialized');
  }

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    const token = this.jwtService.getToken();
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
