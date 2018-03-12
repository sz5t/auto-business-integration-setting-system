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

  private getKey(url: string, key: string): string  {
    url = (url.startsWith('/app') ? url : '/app' +  url ) + key + $('#sysFlag').val()
    console.log('clientStorageService', url.substring(5));
    return url.substring(5);
  }

  public setCookies(key, data) {
    this.cookiesStorage.set(this.getKey(this.router.url, key), data, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  }

  public getCookies(key) {
    const cookies = this.cookiesStorage.get(this.getKey(this.router.url, key));
    return cookies;
  }

  public clearCookies() {
    this.cookiesStorage.clear();
  }

  public setLocalStorage(key, data) {
    this.localStorage.set(this.getKey(this.router.url, key), data);
  }

  public getLocalStorage(key) {
    return this.localStorage.get(this.getKey(this.router.url, key));
  }

  public clearLocalStorage() {
    this.localStorage.clear();
  }
  public setSessionStorage(key, data) {
    this.localSession.set(this.getKey(this.router.url, key), data);
  }

  public getSessionStorage(key) {
    return this.localSession.get(this.getKey(this.router.url, key));
  }

  public clearSessionStorage() {
    return this.localSession.clear();
  }

}
