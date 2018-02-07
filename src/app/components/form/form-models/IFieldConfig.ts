import {ValidatorFn} from '@angular/forms';
/**
 * Created by zhaoxinlei on 2017/10/12.
 */
export interface IFieldConfig{
  name: string;
  type: string;
  layout: string;
  inputType?: string;
  value?: any;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: any[];
  helpText?: string;
  inputClass?: string;
  helpClass?: string;
  icon?: string;
  iconPstn?: string;
  ajax?: any;
  multiple?: string;
  validation?: ValidatorFn[];
}
