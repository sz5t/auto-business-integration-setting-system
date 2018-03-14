import {Injectable} from '@angular/core';
import {CookiesStorageService, LocalStorageService, SessionStorageService} from 'ngx-store';
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';


@Injectable()
export class ClientStorageService {

  constructor(private cookiesStorage: CookiesStorageService,
              private localStorage: LocalStorageService,
              private localSession: SessionStorageService,
              private router: Router
  ) {
  }


  public setCookies(key, data) {
    this.cookiesStorage.set(environment.getKey(this.router.url, key), data, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  }

  public getCookies(key) {
    const cookies = this.cookiesStorage.get(environment.getKey(this.router.url, key));
    return cookies;
  }

  public clearCookies() {
    this.cookiesStorage.clear();
  }

  public setLocalStorage(key, data) {
    this.localStorage.set(environment.getKey(this.router.url, key), data);
  }

  public getLocalStorage(key) {
    return this.localStorage.get(environment.getKey(this.router.url, key));
  }

  public clearLocalStorage() {
    this.localStorage.clear();
  }
  public setSessionStorage(key, data) {
    this.localSession.set(environment.getKey(this.router.url, key), data);
  }

  public getSessionStorage(key) {
    return this.localSession.get(environment.getKey(this.router.url, key));
  }

  public clearSessionStorage() {
    return this.localSession.clear();
  }

}
