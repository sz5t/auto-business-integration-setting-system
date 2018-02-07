import {
  OnChanges, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {CnDynamicFieldsDirective} from '../../components/dynamic/dynamic-component/cn-dynamic-form/cn-dynamic-fields.directive';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IFieldConfig} from '../../components/form/form-models/IFieldConfig';
import {ClientStorageService} from "../../services/client-storage.service";

declare let $: any;
@Component({
  selector: 'cn-layout-setting',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.css']
})
export class LayoutSettingComponent implements OnInit , AfterViewInit, OnChanges{
  @ViewChild('selectFunc') selectFunc: ElementRef;
  @ViewChild('selectArea') selectArea: ElementRef;
  @ViewChild('preview') preview: ElementRef;
  @ViewChild('editor') editor: ElementRef;

  index = 0;
  _showMore = false;
  _form: FormGroup;
  _config;
  _formConfigs: any[] = [];
  _configs = {
    'single': [
      [
        {
          'title': '区域（1）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '12',
              'offset': ''
            },
            'lg': {
              'value': '12',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area1',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area1_title',
                'label': '区域标题：',
                'inputClass': 'input-group',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area1_icon',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area1_color',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ]
    ],
    'left_right': [[
      {
        'title': '区域（1）',
        'titleColor': '',
        'titleIcon': '',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xs': {
            'value': '12',
            'offset': ''
          },
          'sm': {
            'value': '12',
            'offset': ''
          },
          'md': {
            'value': '3',
            'offset': ''
          },
          'lg': {
            'value': '3',
            'offset': ''
          }
        },
        'editForm': {
          'name': 'area1',
          'data': [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_title',
              'label': '区域标题：',
              'inputClass': 'input-group',
              'helpClass': 'help-inline',
              'icon': 'fa fa-navicon',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_icon',
              'label': ' 标题图标：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-image',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_color',
              'label': ' 标题颜色：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-cube',
              'iconPstn': 'left'
            }
          ]
        }
      },
      {
        'title': '区域（2）',
        'titleColor': '',
        'titleIcon': '',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xs': {
            'value': '12',
            'offset': ''
          },
          'sm': {
            'value': '12',
            'offset': ''
          },
          'md': {
            'value': '9',
            'offset': ''
          },
          'lg': {
            'value': '9',
            'offset': ''
          }
        },
        'editForm': {
          'name': 'area2',
          'data': [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area2_title',
              'label': '区域标题：',
              'inputClass': 'input-group',
              'helpClass': 'help-inline',
              'icon': 'fa fa-navicon',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area2_icon',
              'label': ' 标题图标：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-image',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area2_color',
              'label': ' 标题颜色：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-cube',
              'iconPstn': 'left'
            }
          ]
        }
      }
    ]],
    'up_down': [
      [{
        'title': '区域（1）',
        'titleColor': '',
        'titleIcon': '',
        'isFullScreen': true,
        'isCollapse': true,
        'blockType': 'portlet',
        'size': {
          'xs': {
            'value': '12',
            'offset': ''
          },
          'sm': {
            'value': '12',
            'offset': ''
          },
          'md': {
            'value': '12',
            'offset': ''
          },
          'lg': {
            'value': '12',
            'offset': ''
          }
        },
        'editForm': {
          'name': 'area1',
          'data': [
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_title',
              'label': '区域标题：',
              'inputClass': 'input-group ',
              'helpClass': 'help-inline',
              'icon': 'fa fa-navicon',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_icon',
              'label': ' 标题图标：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-image',
              'iconPstn': 'left'
            },
            {
              'type': 'input',
              'inputType': 'text',
              'name': 'area1_color',
              'label': ' 标题颜色：',
              'inputClass': 'input-group ',
              'icon': 'fa fa-cube',
              'iconPstn': 'left'
            }
          ]
        }
      }
      ],
      [
        {
          'title': '区域（2）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '12',
              'offset': ''
            },
            'lg': {
              'value': '12',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area2',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ]
    ],
    't_block1': [
      [
        {
          'title': '区域（1）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
        'xs': {
          'value': '12',
          'offset': ''
        },
        'sm': {
          'value': '12',
          'offset': ''
        },
        'md': {
          'value': '12',
          'offset': ''
        },
        'lg': {
          'value': '12',
          'offset': ''
        }
      },
          'editForm': {
            'name': 'area1',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area2_title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area2_icon',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'area2_color',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ],
      [
        {
          'title': '区域（2）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '4',
              'offset': ''
            },
            'lg': {
              'value': '4',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area2',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        },
        {
          'title': '区域（3）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '8',
              'offset': ''
            },
            'lg': {
              'value': '8',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area3',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ]
    ],
    't_block2': [
      [
        {
          'title': '区域（1）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '4',
              'offset': ''
            },
            'lg': {
              'value': '4',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area1',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        },
        {
          'title': '区域（2）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '8',
              'offset': ''
            },
            'lg': {
              'value': '8',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area2',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ],
      [
        {
          'title': '区域（3）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '12',
              'offset': ''
            },
            'lg': {
              'value': '12',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area3',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ]
    ],
    't_block3': [
      [
        {
          'title': '区域（1）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '6',
              'offset': ''
            },
            'lg': {
              'value': '6',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area1',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        },
        {
          'title': '区域（2）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '6',
              'offset': ''
            },
            'lg': {
              'value': '6',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area2',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ],
      [
        {
          'title': '区域（3）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '6',
              'offset': ''
            },
            'lg': {
              'value': '6',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area3',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        },
        {
          'title': '区域（4）',
          'titleColor': '',
          'titleIcon': '',
          'isFullScreen': true,
          'isCollapse': true,
          'blockType': 'portlet',
          'size': {
            'xs': {
              'value': '12',
              'offset': ''
            },
            'sm': {
              'value': '12',
              'offset': ''
            },
            'md': {
              'value': '6',
              'offset': ''
            },
            'lg': {
              'value': '6',
              'offset': ''
            }
          },
          'editForm': {
            'name': 'area4',
            'data': [
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'title',
                'label': '区域标题：',
                'inputClass': 'input-group ',
                'helpClass': 'help-inline',
                'icon': 'fa fa-navicon',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'MobileNumber',
                'label': ' 标题图标：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-image',
                'iconPstn': 'left'
              },
              {
                'type': 'input',
                'inputType': 'text',
                'name': 'RealName',
                'label': ' 标题颜色：',
                'inputClass': 'input-group ',
                'icon': 'fa fa-cube',
                'iconPstn': 'left'
              }
            ]
          }
        }
      ]
    ]
  };

  get controlsData() {
    return this._formConfigs.filter(({type}) => {
      return type !== 'button';
    });
  }

  get controls() {
    return this._formConfigs.filter(({type}) => {
      return type !== 'button';
    });
  }

  get changes() {
    return this._form.valueChanges;
  }

  get valid() {
    return this._form.valid;
  }

  get value() {
    return this._form.value;
  }

  constructor(private formBuilder: FormBuilder,private clientStorage: ClientStorageService) {
  }

  ngOnInit() {
    this._form = this.formBuilder.group({});
  }

  ngOnChanges(){

  }

  ngAfterViewInit() {
    this.preview.nativeElement.style.height = window.screen.availHeight + 'px';
    this.editor.nativeElement.style.height = window.screen.availHeight + 'px';
    $(this.selectFunc.nativeElement).selectpicker();
    $(this.selectArea.nativeElement).selectpicker();
    $(this.selectArea.nativeElement).on('changed.bs.select', (e, index, newValue, oldValue) => {
      if (newValue){
        let blockCount = 0;
        const layoutName = $(this.selectArea.nativeElement).selectpicker('val');
        this.index = 1;
        this._formConfigs.length = 0;
        this._config = this._configs[layoutName];
        this._config.forEach(subConfig => {
          subConfig.forEach(subEditor => {
            blockCount++;
            subEditor.editForm.title = `区域（${blockCount}）`;
            this._formConfigs.push(subEditor.editForm);
          });
        });
        this._form = this.createGroup();
      }
    });
  }

  clickMore(){
   this._showMore = !this._showMore;
  }

  save($event?){
    // 构建布局展示对象
    this._config.forEach((config) => {
      config.forEach(areaConfig => {
        const name = areaConfig.editForm.name;
        areaConfig.title = this._form.value[`${name}_title`];
         areaConfig.titleColor = this._form.value[`${name}_color`];
         areaConfig.titleIcon = this._form.value[`${name}_icon`];
      });
    });

    // 构建功能结构树对象

    this._config = $.extend(true,[], this._config);
    const moduleName = $(this.selectFunc.nativeElement).selectpicker('val');
    this.clientStorage.setLocalStorage(moduleName, this._config);
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.controlsData.forEach(controlData => {
      controlData.data.forEach(control => {
        group.addControl(control.name, this.createControl(control));
      });
    });
    return group;
  }

  createControl(config: IFieldConfig) {
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
  }

}
