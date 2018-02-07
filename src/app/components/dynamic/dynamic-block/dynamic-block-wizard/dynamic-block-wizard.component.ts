import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {IDynamicBlock, IDynamicBlockModel} from '../dynamic-block.model';
declare let $: any;
@Component({
  selector: 'cn-dynamic-block-wizard',
  templateUrl: './dynamic-block-wizard.component.html',
  styleUrls: ['./dynamic-block-wizard.component.css']
})
export class CnDynamicBlockWizardComponent implements OnInit, IDynamicBlock, AfterViewInit {
  dynamicBlockField: IDynamicBlockModel;
  @Input() templateConfig: any;
  options: any;
  steps: any[] = [];
  viewCfgs: any[] = [];
  _elm: any;

  constructor(private elementRef: ElementRef) {
    this.options = {
      'nextSelector': '.button-next',
      'previousSelector': '.button-previous',
      onTabClick: (tab, navigation, index, clickedIndex) => {
        this.options.handleTitle(tab, navigation, clickedIndex);
      },
      onNext: function (tab, navigation, index) {
        this.handleTitle(tab, navigation, index);
      },
      onPrevious: function (tab, navigation, index) {
        this.handleTitle(tab, navigation, index);
      },
      onTabShow: (tab, navigation, index) => {
        const total = navigation.find('li').length;
        const current = index + 1;
        const $percent = (current / total) * 100;
        this._elm.find('.progress-bar').css({
          width: $percent + '%'
        });
      },
      handleTitle: (tab, navigation, index) => {
        const total = navigation.find('li').length;
        const current = index + 1;
        // set wizard title
        $('.step-title', this._elm).text('Step ' + (index + 1) + ' of ' + total);
        // set done steps
        jQuery('li', this._elm).removeClass('done');
        const li_list = navigation.find('li');
        for (let i = 0; i < index; i++) {
          jQuery(li_list[i]).addClass('done');
        }
        if (current === 1) {
          this._elm.find('.button-previous').hide();
        } else {
          this._elm.find('.button-previous').show();
        }
        if (current >= total) {
          this._elm.find('.button-next').hide();
          this._elm.find('.button-submit').show();
        } else {
          this._elm.find('.button-next').show();
          this._elm.find('.button-submit').hide();
        }
      }
    };
  }

  ngOnInit() {
    this._elm = $(this.elementRef.nativeElement)
    this.initBlockField();
    this.initWizard();
  }

  ngAfterViewInit() {

  }

  initBlockField() {
    this.dynamicBlockField = {
      title: this.templateConfig.title ? this.templateConfig.title : '',
      titleColor: this.templateConfig.titleColor ? this.templateConfig.titleColor : '',
      titleIcon: this.templateConfig.titleIcon ? this.templateConfig.titleIcon : '',
      isCollapse: this.templateConfig.isCollapse ? this.templateConfig.isCollapse : '',
      isFullScreen: this.templateConfig.isFullScreen ? this.templateConfig.isFullScreen : '',
      actions: this.templateConfig.actions ? this.templateConfig.actions : [],
      note: this.templateConfig.note
    };
  }

  initWizard() {
    if (this.templateConfig
      && this.templateConfig.steps
      && Array.isArray(this.templateConfig.steps)
    ) {
      this.templateConfig.steps.forEach(config => {
        this.steps.push({
          id: config.id,
          order: config.order,
          title: config.title
        });
        if (config.viewCfg) {
          const cfgObj = {
            id: config.id,
            active: config.active,
            viewCfg: config.viewCfg
          };
          this.viewCfgs.push(cfgObj);
        }
      });
    }
  }
}
