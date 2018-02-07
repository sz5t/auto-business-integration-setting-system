import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
interface BroadcasterEvent {
  key: any;
  value: any;
}

@Injectable()
export class Broadcaster {
  private _event: Subject<BroadcasterEvent>;
  constructor() {
    this._event = new Subject<BroadcasterEvent>();
  }
  broadcast(key: any, value?: any) {
    this._event.next({key, value});
  }
  on<T>(key: any): Observable<T> {
    return this._event.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.value);
  }
}
