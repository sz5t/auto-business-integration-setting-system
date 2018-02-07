export interface IDynamicBlockModel {
  title;
  titleColor;
  titleIcon;
  isFullScreen;
  isCollapse;
  actions;
  note: any;
}

export interface IDynamicBlock {
  dynamicBlockField: IDynamicBlockModel;
  templateConfig: any;
}
