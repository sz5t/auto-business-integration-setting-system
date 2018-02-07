import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ClientStorageService} from './client-storage.service';
import {OnlineUser} from '../login/cn-login/online-user.model';

@Injectable()
export class LoginAuthService implements CanActivate {
  constructor(private clientStorage: ClientStorageService,
              private router: Router) {
  }

  canActivate() {
    let result = false;
    const onlineUser = (this.clientStorage.getCookies('onlineUser') as OnlineUser);
    if (onlineUser) {
      (onlineUser.UserId && onlineUser.Token) && (result = true);
    } else {
      this.router.navigate(['/login']);
    }
    return result;
  }
}
