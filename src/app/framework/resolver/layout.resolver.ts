/**
 * Created by zhaoxinlei on 2017/10/26.
 */
export class LayoutResolver {
  _pageConfig;

  constructor(pageConfig) {
    this._pageConfig = pageConfig;
  }

  get config() {
    this._pageConfig.layoutClass = this.setLayout();
    return this._pageConfig;
  }

  setLayout() {
    const layoutClassString = [];
    if (this._pageConfig) {
      for (const m in this._pageConfig.size) {
        if (this._pageConfig.size.hasOwnProperty(m)) {
          if (this._pageConfig.size[m]['value']) {
            layoutClassString.push(' col-' + m + '-' + this._pageConfig.size[m]['value']);
          }
          if (this._pageConfig.size[m]['offset'] && this._pageConfig.size[m]['offset'].length > 0) {
            layoutClassString.push(' col-' + m + '-offset-' + this._pageConfig.size[m]['value']);
          }
        }
      }
    }
    return layoutClassString.join(' ');
  }
}
