import {Configuration, RenderColumnType} from '../configuration';
import ColumnSettings = DataTables.ColumnSettings;
import {Validators} from '@angular/forms';
import {CommonUtility} from "../utility/common-utility";
import {environment} from '../../../environments/environment';
/**
 * Created by zhaoxinlei on 2017/10/26.
 */
export class MasterGridViewResolver {
  protected _viewCfg;
  private _credential;
  private _filterItem;
  private _customerId;

  constructor(viewCfg, credential, customerId) {
    this._viewCfg = viewCfg;
    this._credential = credential;
    this._customerId = customerId;
  }

  set filterItem(item) {
    this._filterItem = item;
  }

  get buttonConfig() {
    this._viewCfg && this._viewCfg.toolbarsConfig.forEach(btn => {
      if (btn.formConfig) {
        btn.formConfig.forEach(tag => {
          const validation = [];
          if (tag.validations) {
            tag.validations.forEach(valid => {
              if (valid.validator === 'required' || valid.validator === 'email') {
                validation.push(Validators[valid.validator]);
              } else if (valid.validator === 'minLength' || valid.validator === 'maxLength') {
                validation.push(Validators[valid.validator](valid.length));
              } else if (valid.validator === 'pattern') {
                validation.push(Validators[valid.validator](valid.value));
              }
            });
            tag.validation = validation;
          }
        });
      }
    });
    return this._viewCfg.toolbarsConfig;
  }

  get filterConfig() {
    return this._viewCfg.filterConfig;
  }

  get gridConfig() {

    let config: any;
    this._viewCfg && (() => {
      config = {...this._viewCfg};
      this._filterItem
        ? this._viewCfg.columnConfigClass && ( config.ajax = this._buildAjaxWithFilter())
        : this._viewCfg.columnConfigClass && ( config.ajax = this._buildAjax());

      this._viewCfg.columnConfigs && (config.columns = this._buildColumns());
      config.buttons = [];
    })();
    return config;
  }

  private _buildAjax() {
    return {
      url: (() => {
        return (environment.web_api + this._viewCfg.columnConfigClass).replace('{customerId}', this._customerId);
      })(),
      dataSrc: this._viewCfg.columnFilter,
      headers: {
        Credential: this._credential
      }
    };
  }

  private _buildAjaxWithFilter() {
    let condition = '';
    if (this._viewCfg.filterConfig) {
      this._viewCfg.filterConfig.forEach(filter => {
        if (filter) {
          for (const propLink of filter.propLinks) {
            if (this._filterItem) {
              condition += propLink['slaveProp'] + '=' + this._filterItem[propLink.masterProp] + '&';
            }
          }
        }
      });
    }

    return {
      url: (() => {
        return (environment.web_api + this._viewCfg.columnConfigClass + '?' + condition.substring(0, condition.length - 1)).replace('{customerId}', this._customerId);
      })(),
      dataSrc: this._viewCfg.columnFilter,
      headers: {
        Credential: this._credential
      }
    };
  }

  private _buildColumns(): ColumnSettings[] {
    const columns: ColumnSettings[] = [];
    let column: ColumnSettings = {};
    this._viewCfg.columnConfigs.forEach(col => {
      column = {...col};
      if (col.renderName) {
        column.render = this._buildRenderFunction(col.renderName);
      }
      columns.push(column);

    });
    return columns;
  }

  private _buildRenderFunction(renderName) {
    switch (renderName.type) {
      case RenderColumnType.RENDER_COLUMN_TYPE.NOT_NULL:
        return (data, type, row, meta) => {
          return data == null ? `<span class="font-grey Italic">无</span>` : data;
        };
      case RenderColumnType.RENDER_COLUMN_TYPE.CHECK_ALL:
        return (data, type, row, meta) => {
          return `<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
          <input type="checkbox" class="checkboxes" value="${data}" />
          <span></span> </label>`;
        };
      case RenderColumnType.RENDER_COLUMN_TYPE.BUTTONS:
        return (data, type, row, meta) => {
          const btns = renderName.data;
          const result = [];
          if (data && data.length > 0) {
            btns.forEach((btn, index) => {
              let btnSet = '';
              if (btn.type === RenderColumnType.RENDER_COLUMN_TYPE.BUTTON_COMMON) {
                btnSet = `<button data-name="dtAction"
                          data-id=${data}
                          data-toggle="detail"
                          data-opt=${JSON.stringify(btn.events)}
                          class="bs-confirmation btn btn-small ${btn.color}">
                          <i class="${btn.img}"></i>
                          ${btn.text}
                        </button>`;
              } else if (btn.type === RenderColumnType.RENDER_COLUMN_TYPE.BUTTON_CONFIRM) {
                btnSet = `<button data-name="dtAction"
                         data-id=${data}
                         data-opt=${JSON.stringify(btn.events)}
                         class="bs-confirmation btn ${btn.color}"
                         data-toggle="confirmation">
                          <i class="${btn.img}"></i>
                          ${btn.text}
                        </button>`;
              }
              result.push(btnSet);
            });
          }
          return result.join('');
        };
      case RenderColumnType.RENDER_COLUMN_TYPE.BUTTON_COMMON:
        return ((data, type, row, meta) => {
          return '';
        });
      case RenderColumnType.RENDER_COLUMN_TYPE.BUTTON_CONFIRM:
        return (data, type, row, meta) => {
          return '<button class="btn green-sharp btn-circle" data-toggle="confirmation" data-popout="true"></button>';
        };
      case RenderColumnType.RENDER_COLUMN_TYPE.CELL_STYLE:
        return (data, type, row, meta) => {
          if (data && data.length > 0) {
            const conf = renderName.data;
            let text = '';
            let className = '';
            let icon = '';
            conf.forEach(c => {
              if (c.value === data) {
                text = c.valueas ? c.valueas : data;
                className = c.className ? c.className : '';
                icon = c.icon ? c.icon : '';
              }
            });
            return `<span class="${className}"><i class="${icon}"></i> ${text}</span>`;
          } else {
            return '';
          }
        };
      case RenderColumnType.RENDER_COLUMN_TYPE.CELL_DATE:
        return ((data, type, row, meta) => {
          if (data && data.length > 0) {
            const conf = renderName.data[0];
            const date = data.substring(0, 10);
            return `<span class="${conf.className}"><i class="fa fa-calendar"></i> ${date}</span>`;
          } else {
            return '';
          }
        });
      case RenderColumnType.RENDER_COLUMN_TYPE.CELL_NUMBER:
        return ((data, type, row, meta) => {
          if (data) {
            const conf = renderName.data[0];
            return `<span class="${conf.className}"> ${data}</span>`;
          } else {
            return '';
          }
        });
    }
  }
}
export class SlaverGridViewResolver extends MasterGridViewResolver {
  constructor(viewCfg, credential, customerId) {
    super(viewCfg, credential, customerId);
    this._viewCfg = viewCfg;
  }

  get filterConfig() {
    return this._viewCfg.filterConfig;
  }
}


