import {Directive, ElementRef, Input, OnInit, Renderer2, AfterViewInit} from '@angular/core';
import {CommonUtility} from "../../../framework/utility/common-utility";
declare let $: any;
@Directive({
  selector: '[cnFormSpin]'
})
export class CnFormSpinDirective implements AfterViewInit {
  @Input() options;
  _elm;
  _currentSpinnerId = 0;
  defaults = {
    min: 0,
    max: 100,
    initval: '',
    step: 1,
    decimals: 0,
    stepinterval: 100,
    forcestepdivisibility: 'round', // none | floor | round | ceil
    stepintervaldelay: 500,
    verticalbuttons: false,
    verticalupclass: 'glyphicon glyphicon-chevron-up',
    verticaldownclass: 'glyphicon glyphicon-chevron-down',
    prefix: '',
    postfix: '',
    prefix_extraclass: '',
    postfix_extraclass: '',
    booster: true,
    boostat: 10,
    maxboostedstep: false,
    mousewheel: true,
    buttondown_class: 'btn btn-default',
    buttonup_class: 'btn btn-default',
    buttondown_txt: '-',
    buttonup_txt: '+'
  };

  attributeMap = {
    min: 'min',
    max: 'max',
    initval: 'init-val',
    step: 'step',
    decimals: 'decimals',
    stepinterval: 'step-interval',
    verticalbuttons: 'vertical-buttons',
    verticalupclass: 'vertical-up-class',
    verticaldownclass: 'vertical-down-class',
    forcestepdivisibility: 'force-step-divisibility',
    stepintervaldelay: 'step-interval-delay',
    prefix: 'prefix',
    postfix: 'postfix',
    prefix_extraclass: 'prefix-extra-class',
    postfix_extraclass: 'postfix-extra-class',
    booster: 'booster',
    boostat: 'boostat',
    maxboostedstep: 'max-boosted-step',
    mousewheel: 'mouse-wheel',
    buttondown_class: 'button-down-class',
    buttonup_class: 'button-up-class',
    buttondown_txt: 'button-down-txt',
    buttonup_txt: 'button-up-txt'
  };

  settings;
  originalinput;
  originalinput_data;
  container;
  elements;
  value;
  downSpinTimer;
  upSpinTimer;
  downDelayTimeout;
  upDelayTimeout;
  spincount = 0;
  spinning = '';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  ngAfterViewInit() {
    this._init();
  }

  _scopedEventName(name, id) {
    return name + '.touchspin_' + id;
  }

  _scopeEventNames(names, id) {
    return $.map(names, (name) => {
      return this._scopedEventName(name, id);
    });
  }

  _clearTouchSpinEvent() {
    const originalinput = $(this._elm);
    const originalinput_data = originalinput.data();
    $(document).off(this._scopeEventNames([
      'mouseup',
      'touchend',
      'touchcancel',
      'mousemove',
      'touchmove',
      'scroll',
      'scrollstart'], originalinput_data.spinnerid).join(' '));
  }

  _init() {
    this._elm = this.elementRef.nativeElement;
    this.originalinput = $('#' + this.elementRef.nativeElement.getAttribute('id'));

    this.originalinput_data = this.originalinput.data();
    if (this.originalinput.data('alreadyinitialized')) {
      return;
    }

    this.originalinput.data('alreadyinitialized', true);
    this._currentSpinnerId += 1;
    this.originalinput.data('spinnerid', this._currentSpinnerId);


    if (!this.originalinput.is('input')) {
      console.log('Must be an input.');
      return;
    }

    this._initSettings();
    this._setInitval();
    this._checkValue();
    this._buildHtml();
    this._initElements();
    this._hideEmptyPrefixPostfix();
    this._bindEvents();
    this._bindEventsInterface();
    this.elements.input.css('display', 'block');
  }

  _setInitval() {
    if (this.settings.initval !== '' && this.originalinput.val() === '') {
      this.originalinput.val(this.settings.initval);
    }
  }

  changeSettings(newsettings) {
    this._updateSettings(newsettings);
    this._checkValue();

    let value = this.elements.input.val();

    if (value !== '') {
      value = Number(this.elements.input.val());
      this.elements.input.val(value.toFixed(this.settings.decimals));
    }
  }

  _initSettings() {
    this.settings = $.extend({}, this.defaults, this.originalinput_data, this._parseAttributes(), this.options);
  }

  _parseAttributes() {
    const data = {};
    $.each(this.attributeMap, (key, value) => {
      const attrName = 'bts-' + value + '';
      if (this.originalinput.is('[data-' + attrName + ']')) {
        data[key] = this.originalinput.data(attrName);
      }
    });
    return data;
  }

  _updateSettings(newsettings) {
    this.settings = $.extend({}, this.settings, newsettings);
  }

  _buildHtml() {
    let initval = this.originalinput.val();
    const parentelement = this.originalinput.parent();

    if (initval !== '') {
      initval = Number(initval).toFixed(this.settings.decimals);
    }

    this.originalinput.data('initvalue', initval).val(initval);
    this.originalinput.addClass('form-control');

    if (parentelement.hasClass('input-group')) {
      this._advanceInputGroup(parentelement);
    } else {
      this._buildInputGroup();
    }
  }

  _advanceInputGroup(parentelement) {
    parentelement.addClass('bootstrap-touchspin');

    const prev = this.originalinput.prev();
    const next = this.originalinput.next();

    let downhtml;
    let uphtml;
    const prefixhtml = '<span class="input-group-addon bootstrap-touchspin-prefix">' + this.settings.prefix + '</span>';
    const postfixhtml = '<span class="input-group-addon bootstrap-touchspin-postfix">' + this.settings.postfix + '</span>';

    if (prev.hasClass('input-group-btn')) {
      downhtml = '<button class="' + this.settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + this.settings.buttondown_txt + '</button>';
      prev.append(downhtml);
    } else {
      downhtml = '<span class="input-group-btn"><button class="' + this.settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + this.settings.buttondown_txt + '</button></span>';
      $(downhtml).insertBefore(this.originalinput);
    }

    if (next.hasClass('input-group-btn')) {
      uphtml = '<button class="' + this.settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + this.settings.buttonup_txt + '</button>';
      next.prepend(uphtml);
    } else {
      uphtml = '<span class="input-group-btn"><button class="' + this.settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + this.settings.buttonup_txt + '</button></span>';
      $(uphtml).insertAfter(this.originalinput);
    }

    $(prefixhtml).insertBefore(this.originalinput);
    $(postfixhtml).insertAfter(this.originalinput);

    this.container = parentelement;
  }

  _buildInputGroup() {
    let html;

    if (this.settings.verticalbuttons) {
      html = '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + this.settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + this.settings.postfix + '</span><span class="input-group-btn-vertical"><button class="' + this.settings.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + this.settings.verticalupclass + '"></i></button><button class="' + this.settings.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + this.settings.verticaldownclass + '"></i></button></span></div>';
    }
    else {
      html = '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + this.settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + this.settings.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + this.settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + this.settings.postfix + '</span><span class="input-group-btn"><button class="' + this.settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + this.settings.buttonup_txt + '</button></span></div>';
    }

    this.container = $(html).insertBefore(this.originalinput);

    $('.bootstrap-touchspin-prefix', this.container).after(this.originalinput);

    if (this.originalinput.hasClass('input-sm')) {
      this.container.addClass('input-group-sm');
    }
    else if (this.originalinput.hasClass('input-lg')) {
      this.container.addClass('input-group-lg');
    }
  }

  _initElements() {
    this.elements = {
      down: $('.bootstrap-touchspin-down', this.container),
      up: $('.bootstrap-touchspin-up', this.container),
      input: $('input', this.container),
      prefix: $('.bootstrap-touchspin-prefix', this.container).addClass(this.settings.prefix_extraclass),
      postfix: $('.bootstrap-touchspin-postfix', this.container).addClass(this.settings.postfix_extraclass)
    };
  }

  _hideEmptyPrefixPostfix() {
    if (this.settings.prefix === '') {
      this.elements.prefix.hide();
    }

    if (this.settings.postfix === '') {
      this.elements.postfix.hide();
    }
  }

  _bindEvents() {
    this.originalinput.on('keydown', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 38) {
        if (this.spinning !== 'up') {
          this.upOnce();
          this.startUpSpin();
        }
        ev.preventDefault();
      } else if (code === 40) {
        if (this.spinning !== 'down') {
          this.downOnce();
          this.startDownSpin();
        }
        ev.preventDefault();
      }
    });

    this.originalinput.on('keyup', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 38) {
        this.stopSpin();
      } else if (code === 40) {
        this.stopSpin();
      }
    });

    this.originalinput.on('blur', () => {
      this._checkValue();
    });

    this.elements.down.on('keydown', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 32 || code === 13) {
        if (this.spinning !== 'down') {
          this.downOnce();
          this.startDownSpin();
        }
        ev.preventDefault();
      }
    });

    this.elements.down.on('keyup', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 32 || code === 13) {
        this.stopSpin();
      }
    });

    this.elements.up.on('keydown', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 32 || code === 13) {
        if (this.spinning !== 'up') {
          this.upOnce();
          this.startUpSpin();
        }
        ev.preventDefault();
      }
    });

    this.elements.up.on('keyup', (ev) => {
      const code = ev.keyCode || ev.which;

      if (code === 32 || code === 13) {
        this.stopSpin();
      }
    });

    this.elements.down.on('mousedown.touchspin', (ev) => {
      this.elements.down.off('touchstart.touchspin');  // android 4 workaround

      if (this.originalinput.is(':disabled')) {
        return;
      }

      this.downOnce();
      this.startDownSpin();

      ev.preventDefault();
      ev.stopPropagation();
    });

    this.elements.down.on('touchstart.touchspin', (ev) => {
      this.elements.down.off('mousedown.touchspin');  // android 4 workaround

      if (this.originalinput.is(':disabled')) {
        return;
      }

      this.downOnce();
      this.startDownSpin();

      ev.preventDefault();
      ev.stopPropagation();
    });

    this.elements.up.on('mousedown.touchspin', (ev) => {
      this.elements.up.off('touchstart.touchspin');  // android 4 workaround

      if (this.originalinput.is(':disabled')) {
        return;
      }

      this.upOnce();
      this.startUpSpin();

      ev.preventDefault();
      ev.stopPropagation();
    });

    this.elements.up.on('touchstart.touchspin', (ev) => {
      this.elements.up.off('mousedown.touchspin');  // android 4 workaround

      if (this.originalinput.is(':disabled')) {
        return;
      }

      this.upOnce();
      this.startUpSpin();

      ev.preventDefault();
      ev.stopPropagation();
    });

    this.elements.up.on('mouseout touchleave touchend touchcancel', (ev) => {
      if (!this.spinning) {
        return;
      }

      ev.stopPropagation();
      this.stopSpin();
    });

    this.elements.down.on('mouseout touchleave touchend touchcancel', (ev) => {
      if (!this.spinning) {
        return;
      }

      ev.stopPropagation();
      this.stopSpin();
    });

    this.elements.down.on('mousemove touchmove', (ev) => {
      if (!this.spinning) {
        return;
      }

      ev.stopPropagation();
      ev.preventDefault();
    });

    this.elements.up.on('mousemove touchmove', (ev) => {
      if (!this.spinning) {
        return;
      }

      ev.stopPropagation();
      ev.preventDefault();
    });

    $(document).on(this._scopeEventNames(['mouseup', 'touchend', 'touchcancel'], this._currentSpinnerId).join(' '), (ev) => {
      if (!this.spinning) {
        return;
      }

      ev.preventDefault();
      this.stopSpin();
    });

    $(document).on(this._scopeEventNames(['mousemove', 'touchmove', 'scroll', 'scrollstart'], this._currentSpinnerId).join(' '), (ev) => {
      if (!this.spinning) {
        return;
      }
      ev.preventDefault();
      this.stopSpin();
    });

    this.originalinput.on('mousewheel DOMMouseScroll', (ev) => {
      if (!this.settings.mousewheel || !this.originalinput.is(':focus')) {
        return;
      }

      const delta = ev.originalEvent.wheelDelta || -ev.originalEvent.deltaY || -ev.originalEvent.detail;

      ev.stopPropagation();
      ev.preventDefault();

      if (delta < 0) {
        this.downOnce();
      } else {
        this.upOnce();
      }
    });
  }

  _bindEventsInterface() {
    this.originalinput.on('touchspin.uponce', () => {
      this.stopSpin();
      this.upOnce();
    });

    this.originalinput.on('touchspin.downonce', () => {
      this.stopSpin();
      this.downOnce();
    });

    this.originalinput.on('touchspin.startupspin', () => {
      this.startUpSpin();
    });

    this.originalinput.on('touchspin.startdownspin', () => {
      this.startDownSpin();
    });

    this.originalinput.on('touchspin.stopspin', () => {
      this.stopSpin();
    });

    this.originalinput.on('touchspin.updatesettings', (e, newsettings) => {
      this.changeSettings(newsettings);
    });
  }

  _forcestepdivisibility(value) {
    switch (this.settings.forcestepdivisibility) {
      case 'round':
        return (Math.round(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals);
      case 'floor':
        return (Math.floor(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals);
      case 'ceil':
        return (Math.ceil(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals);
      default:
        return value;
    }
  }

  _checkValue() {
    let val, parsedval, returnval;

    val = this.originalinput.val();

    if (val === '') {
      return;
    }

    if (this.settings.decimals > 0 && val === '.') {
      return;
    }

    parsedval = parseFloat(val);

    if (isNaN(parsedval)) {
      parsedval = 0;
    }

    returnval = parsedval;

    if (parsedval.toString() !== val) {
      returnval = parsedval;
    }

    if (parsedval < this.settings.min) {
      returnval = this.settings.min;
    }

    if (parsedval > this.settings.max) {
      returnval = this.settings.max;
    }

    returnval = this._forcestepdivisibility(returnval);

    if (Number(val).toString() !== returnval.toString()) {
      this.originalinput.val(returnval);
      this.originalinput.trigger('change');
    }
  }

  _getBoostedStep() {
    if (!this.settings.booster) {
      return this.settings.step;
    } else {
      let boosted = Math.pow(2, Math.floor(this.spincount / this.settings.boostat)) * this.settings.step;

      if (this.settings.maxboostedstep) {
        if (boosted > this.settings.maxboostedstep) {
          boosted = this.settings.maxboostedstep;
          this.value = Math.round((this.value / boosted)) * boosted;
        }
      }

      return Math.max(this.settings.step, boosted);
    }
  }

  upOnce() {
    this._checkValue();

    this.value = parseFloat(this.elements.input.val());
    if (isNaN(this.value)) {
      this.value = 0;
    }

    const initvalue = this.value;
    const boostedstep = this._getBoostedStep();

    this.value = this.value + boostedstep;

    if (this.value > this.settings.max) {
      this.value = this.settings.max;
      this.originalinput.trigger('touchspin.on.max');
      this.stopSpin();
    }

    this.elements.input.val(Number(this.value).toFixed(this.settings.decimals));

    if (initvalue !== this.value) {
      this.originalinput.trigger('change');
    }
  }

  downOnce() {
    this._checkValue();

    this.value = parseFloat(this.elements.input.val());
    if (isNaN(this.value)) {
      this.value = 0;
    }

    const initvalue = this.value;
    const boostedstep = this._getBoostedStep();

    this.value = this.value - boostedstep;

    if (this.value < this.settings.min) {
      this.value = this.settings.min;
      this.originalinput.trigger('touchspin.on.min');
      this.stopSpin();
    }

    this.elements.input.val(this.value.toFixed(this.settings.decimals));

    if (initvalue !== this.value) {
      this.originalinput.trigger('change');
    }
  }

  startDownSpin() {
    this.stopSpin();

    this.spincount = 0;
    this.spinning = 'down';

    this.originalinput.trigger('touchspin.on.startspin');
    this.originalinput.trigger('touchspin.on.startdownspin');

    this.downDelayTimeout = setTimeout(() => {
      this.downSpinTimer = setInterval(() => {
        this.spincount++;
        this.downOnce();
      }, this.settings.stepinterval);
    }, this.settings.stepintervaldelay);
  }

  startUpSpin() {
    this.stopSpin();

    this.spincount = 0;
    this.spinning = 'up';

    this.originalinput.trigger('touchspin.on.startspin');
    this.originalinput.trigger('touchspin.on.startupspin');

    this.upDelayTimeout = setTimeout(() => {
      this.upSpinTimer = setInterval(() => {
        this.spincount++;
        this.upOnce();
      }, this.settings.stepinterval);
    }, this.settings.stepintervaldelay);
  }

  stopSpin() {
    clearTimeout(this.downDelayTimeout);
    clearTimeout(this.upDelayTimeout);
    clearInterval(this.downSpinTimer);
    clearInterval(this.upSpinTimer);

    switch (this.spinning) {
      case 'up':
        this.originalinput.trigger('touchspin.on.stopupspin');
        this.originalinput.trigger('touchspin.on.stopspin');
        break;
      case 'down':
        this.originalinput.trigger('touchspin.on.stopdownspin');
        this.originalinput.trigger('touchspin.on.stopspin');
        break;
    }

    this.spincount = 0;
    this.spinning = '';
  }
}
