import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification/notification.service';

@Injectable()
export class OptionsInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('.')) {
      return next.handle(request);
    }

    return next
      .handle(
        request.clone({
          headers: new HttpHeaders({
            accept: 'application/json'
          })
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.notificationService.showNotification({
              message: 'Your IP is blocked!! Notify someone!!'
            });
          }

          return throwError(error);
        })
      );
  }
}
