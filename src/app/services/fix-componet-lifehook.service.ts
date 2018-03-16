import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class FixComponetLifehookService {
  private countChanged: BehaviorSubject<number> = new BehaviorSubject(0);
  public emitter: Observable<number> = this.countChanged.asObservable();
  private counter = 0;
  public increment(){
    this.countChanged.next(this.counter++);
  }

}
