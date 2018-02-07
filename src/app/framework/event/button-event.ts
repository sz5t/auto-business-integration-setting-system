/**
 * Created by zhaoxinlei on 2017/9/30.
 */
export enum CONFIRM_TYPE {
  ALERT,
  ALERTWITH_CALLBACK,
  CONFIRM,
  PROMT,
  ADVANCE_DIALOG
}
export enum EXECUTION_METHOD {
  GET,
  POST,
  PUT,
  DELETE,
  PROC
}
export interface IEventExecution{
  api: string;
  method: EXECUTION_METHOD;
  keyId?: string;
  callback?: string;
  paramMapping?: {};
}
export interface IButtonEventSetting {
  title?: string;
  text?: string;
  type?: CONFIRM_TYPE;
  execution: IEventExecution;
}

export const EVENT_TYPE = {
  common: 'common',
  confirm: 'confirm',
  dialog: 'dialog',
  confirm_dialog: 'confirm_dialog',
  form_dialog: 'form_dialog'
};

export class ButtonEventSetting implements IButtonEventSetting{
  execution: IEventExecution;
  eventType: string;
}


export class ButtonEvent {
  execute(apiService, url, method, params?, handleData?) {
    const funcName = this.createFunctionName(method);
    return apiService[funcName](url, params, handleData);
  }

  createFunctionName(method: string) {
    return 'do' + this.ucFirst(method);
  }

  ucFirst(method: string) {
    let str = method.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
  }
}
