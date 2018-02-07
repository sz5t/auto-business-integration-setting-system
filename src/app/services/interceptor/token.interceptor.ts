/**
 * Created by zhaoxinlei on 2017/11/15.
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ClientStorageService} from '../client-storage.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private clientStorage: ClientStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const onlineUser = this.clientStorage.getCookies('onlineUser');
    request = request.clone({
      setHeaders: {
        Credential: onlineUser ? onlineUser['Token'] : ''
      }
    });
    return next.handle(request);
  }
}
