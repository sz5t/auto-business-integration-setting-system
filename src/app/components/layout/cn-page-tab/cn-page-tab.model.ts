import {Type} from "@angular/core";
/**
 * Created by zhaoxinlei on 2/2/18.
 */
export class TabItem {
  name: string;
  active?: string;
  color?: string;
  title?: string;
  component: Type<any>;
  unremovable?: boolean;
  icon?: string;
  data?: any;
}
