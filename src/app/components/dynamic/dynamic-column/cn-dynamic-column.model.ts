export interface IValueOffset {
  value: string;
  offset: any;
}
export interface ICnDynamicColumnField {
  mdCol?: IValueOffset;
  smCol?: IValueOffset;
  lgCol?: IValueOffset;
  xsCol?: IValueOffset;
}

export interface ICnDynamicColumn {
  dynamicColumnField: ICnDynamicColumnField;
  templateConfig: any;
}
