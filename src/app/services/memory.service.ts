import { Injectable } from '@angular/core';

import {Headers, Http } from '@angular/http';


@Injectable()
export class MemoryService
{
  private heroesUrl = 'api/';
  constructor(private http: Http){ }

  getData(url: string): Promise<any[]> {
    return this.http.get(this.heroesUrl + url)
      .toPromise()
      .then(response => response.json().data as any[])
      .catch(this.handleError);
  }

  getDataById(id: number): Promise<any> {
    const url = `${this.heroesUrl}/${ id }`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as any)
    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: any): Promise<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<any> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
