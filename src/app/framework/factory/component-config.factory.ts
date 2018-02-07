import {Type} from '@angular/core';
import {MasterGridViewResolver} from '../resolver/gridview.resolver';
import {Validators} from '@angular/forms';
declare let $: any;

interface IConfigResolver {
  resolve(config: any, credential?: string, customerId?: string, filterItem?): any;
}

class GridViewConfigResolver implements IConfigResolver {
  _gridConfig;
  resolve(config: any, credential, customerId, filterItem = null): any {
    if (config) {
      const resolver = new MasterGridViewResolver(config, credential, customerId);
      const buttons = resolver.buttonConfig;
      resolver.filterItem = filterItem;
      this._gridConfig = resolver.gridConfig;
      this._gridConfig.language = {
        'processing': '处理中...',
        'lengthMenu': '显示 _MENU_ 项结果',
        'zeroRecords': '没有匹配结果',
        'info': '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
        'infoEmpty': '显示第 0 至 0 项结果，共 0 项',
        'infoFiltered': '(由 _MAX_ 项结果过滤)',
        'infoPostFix': '',
        'search': '搜索:',
        'url': '',
        'emptyTable': '表中数据为空',
        'loadingRecords': '载入中...',
        'thousands': ',',
        'paginate': {
          'first': '首页',
          'previous': '上一页',
          'next': '下一页',
          'last': '末页'
        },
        'aria': {
          'sortAscending': ': 以升序排列此列',
          'sortDescending': ': 以降序排列此列'
        }
      };
      // this._gridConfig.buttons = this.initButton(buttons);
    }
    return this._gridConfig;
  }
}

class TreeViewConfigResolver implements IConfigResolver {
  resolve(config: any): any {
    return config;
  }
}

class FormViewConfigResolver implements IConfigResolver {
  resolve(config: any): any {
    if (config.formConfig && Array.isArray(config.formConfig)) {
      config.formConfig.forEach(tag => {
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
    return config.formConfig;
  }
}

class ChartCounterResolver implements IConfigResolver {
  resolve(config: any): any {
    return config;
  }
}

class TimelineResolver implements IConfigResolver {
  resolve(config: any, credential?: string, filterItem?): any {
    return config;
  }
}

class ChartBarResolver implements IConfigResolver {
  resolve(config: any): any {
    return config;
  }
}

class DetailViewResolver implements IConfigResolver {
  resolve(config: any): any {
    return config;
  }
}

class TextInfoResolver implements IConfigResolver {
  resolve(config: any) {
    return config;
  }
}
const components: { [type: string]: Type<IConfigResolver> } = {
  grid_view: GridViewConfigResolver,
  grid_multi_view: GridViewConfigResolver,
  tree_view: TreeViewConfigResolver,
  form_view: FormViewConfigResolver,
  chart_counter: ChartCounterResolver,
  chart_bar: ChartBarResolver,
  timeline_horizontal: TimelineResolver,
  detail_view: DetailViewResolver,
  text_info: TextInfoResolver
};

export class ComponentConfigFactory {
  static createComponentConfig(config, credential?, customerId?, filterItem?) {
    return new components[config.component]().resolve(config, credential, customerId, filterItem);
  }
}

