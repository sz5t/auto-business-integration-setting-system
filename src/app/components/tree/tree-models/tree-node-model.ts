/**
 * Created by zhaoxinlei on 2017/10/31.
 */
export interface ITreeNode {
  id: string;
  parent?: string;
  text: string;
  icon?: string;
  li_attr?: any;
  a_attr?: any;
  readonly?: boolean;
  value?: any;
  data?:any;
  children?:any,
  state?: {
    opened: boolean;
    disabled: boolean;
    selected: boolean;
  };
}
