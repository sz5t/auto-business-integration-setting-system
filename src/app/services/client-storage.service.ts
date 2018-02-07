import {Injectable} from '@angular/core';
import {CookiesStorageService, LocalStorageService, SessionStorageService} from 'ngx-store';
import {Router} from "@angular/router";

@Injectable()
export class ClientStorageService {

  constructor(private cookiesStorage: CookiesStorageService,
              private localStorage: LocalStorageService,
              private localSession: SessionStorageService,
              private router: Router
  ) {
  }

  public setCookies(key, data) {
    this.cookiesStorage.set(key, data, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  }

  public getCookies(key) {
    const cookies = this.cookiesStorage.get(key);
    return cookies;
  }

  public clearCookies() {
    this.cookiesStorage.clear();
  }

  public setLocalStorage(key, data) {
    this.localStorage.set(key, data);
  }

  public getLocalStorage(key) {
    return this.localStorage.get(key);
  }

  public clearLocalStorage() {
    this.localStorage.clear();
  }
  public setSessionStorage(key, data) {
    this.localSession.set(key, data);
  }

  public getSessionStorage(key) {
    return this.localSession.get(key);
  }

  public clearSessionStorage() {
    return this.localSession.clear();
  }

}
