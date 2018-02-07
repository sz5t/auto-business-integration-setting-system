import {Observer} from "rxjs/Observer";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
/**
 * Created by zhaoxinlei on 2017/10/18.
 */
export class CommonUtility{
  static uuID(w){
    let s="";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < w; i++) {
      s += str.charAt(Math.round(Math.random() * (str.length - 1)));
    }
    return s;
  }
}

export class SafeObserver {
  destination;
  isUnsubscribed:boolean;
  unsub;
  constructor(destination) {
    this.destination = destination;
  }

  next(value) {
    // 尚未取消订阅，且包含next方法
    if (!this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(value);
      } catch (err) {
        // 出现异常时，取消订阅释放资源，再抛出异常
        this.unsubscribe();
        throw err;
      }
    }
  }

  error(err) {
    // 尚未取消订阅，且包含error方法
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err);
      } catch (e2) {
        // 出现异常时，取消订阅释放资源，再抛出异常
        this.unsubscribe();
        throw e2;
      }
      this.unsubscribe();
    }
  }

  complete() {
    // 尚未取消订阅，且包含complete方法
    if (!this.isUnsubscribed && this.destination.complete) {
      try {
        this.destination.complete();
      } catch (err) {
        // 出现异常时，取消订阅释放资源，再抛出异常
        this.unsubscribe();
        throw err;
      }
      this.unsubscribe();
    }
  }

  unsubscribe() { // 用于取消订阅
    this.isUnsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}

export class NewSafeObservable {
  _subscribe;
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer);
    safeObserver.unsub = this._subscribe(safeObserver);
    return safeObserver.unsubscribe.bind(safeObserver);
  }
}
