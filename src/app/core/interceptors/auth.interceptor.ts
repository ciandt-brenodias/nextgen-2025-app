import { Observable } from 'rxjs';
import { NgModule, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { SessionService } from '../services/session.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.session.getAccessToken();
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(dupReq);
  }
}
