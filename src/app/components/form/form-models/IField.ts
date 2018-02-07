import {IFieldConfig} from './IFieldConfig';
import {FormGroup} from '@angular/forms';
/**
 * Created by zhaoxinlei on 2017/10/12.
 */
export interface IField{
  config: IFieldConfig;
  group: FormGroup;
  submitValid: boolean;
}
