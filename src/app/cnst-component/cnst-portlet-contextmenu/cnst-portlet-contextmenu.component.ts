import { Component, OnInit , Input, Output, ViewEncapsulation, EventEmitter, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'cnst-portlet-contextmenu,[cnst-portlet-contextmenu]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cnst-portlet-contextmenu.component.html',
  styleUrls: ['./cnst-portlet-contextmenu.component.css']
})
export class CnstPortletContextmenuComponent implements OnInit {
  @Input() menuItem: any[]; //菜单的数据
  @Input() parentContext; //位置
  @ViewChild('contextmenu') contextmenu: ElementRef;
  //menuItemValue: any;
  // 输出参数
  @Output() changeComponent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){

  }
  createMenu(parentContext) {
    if (parentContext){
      const menu = new ContextMenu(parentContext, {
        target: this.contextmenu.nativeElement, before: function (e) {
          e.preventDefault();
          return true;
        },
        onItem: (context, e) => {
         // 调用父级的方法
         const target = $(e.target);
         let targetObj;
         if (target.attr('id')){
           targetObj = {name: target.attr('id'), value: {}};
         }else {
           const val = target.parent().attr('id');
           targetObj = {name: val, value: {}};
         }
         this.menuItem.forEach(item => {
           if(targetObj.name === item.id){
             targetObj.value = item.data;
           }
         });
          // this.menuItemValue = targetObj;
          this.changeComponent.emit(targetObj);
        }
      });
      $(parentContext).bind('contextmenu', function () {
        return false;
      });
      $(parentContext).mousedown(function (e) {
        if (3 === e.which) {
          e.stopPropagation();
          e.preventDefault();
          menu.show(e);
        }

      });

    }
  }
}



export class ContextMenu {
  toggle = '[data-toggle="context"]';
  $element;
  before;
  onItem;
  scopes;
  constructor(element, options) {
    this.$element = $(element);
    this.before = options.before || this.before;
    this.onItem = options.onItem || this.onItem;
    this.scopes = options.scopes || null;
    if (options.target) {
      this.$element.data('target', options.target);
    }
    this.listen();
  }

  show(e) {
    let $menu;
    let evt;
    let tp;
    let items;
    const relatedTarget = { relatedTarget: this, target: e.currentTarget };
    if (this.isDisabled()) return;
    this.closemenu();
    if (!this.before.call(this, e, $(e.currentTarget))) return;
    $menu = this.getMenu();
    $menu.trigger(evt = $.Event('show.bs.context', relatedTarget));
    tp = this.getPosition(e, $menu);
    items = 'li:not(.divider)';
    $menu.attr('style', '')
      .css(tp)
      .addClass('open')
      .on('click.context.data-api', items, $.proxy(this.onItem, this, $(e.currentTarget)))
      .trigger('shown.bs.context', relatedTarget);
    // Delegating the `closemenu` only on the currently opened menu.
    // This prevents other opened menus from closing.
    $('html')
      .on('click.context.data-api', $menu.selector, $.proxy(this.closemenu, this));
    return false;
  }

  closemenu(e?) {
    let $menu
      , evt
      , items
      , relatedTarget;
    $menu = this.getMenu();
    if (!$menu.hasClass('open')) return;
    relatedTarget = { relatedTarget: this };
    $menu.trigger(evt = $.Event('hide.bs.context', relatedTarget));
    items = 'li:not(.divider)';
    $menu.removeClass('open')
      .off('click.context.data-api', items)
      .trigger('hidden.bs.context', relatedTarget);
    $('html')
      .off('click.context.data-api', $menu.selector);
    // Don't propagate click event so other currently
    // opened menus won't close.
    return false;
  }
  keydown(e) {
    if (e.which == 27)
      this.closemenu(e);
  }
  // before =(e) {
  //   return true;
  // };
  // onItem(e) {
  //   return true;
  // };
  listen() {
    this.$element.on('contextmenu.context.data-api', this.scopes, $.proxy(this.show, this));
    $('html').on('click.context.data-api', $.proxy(this.closemenu, this));
    $('html').on('keydown.context.data-api', $.proxy(this.keydown, this));
  }
  destroy() {
    this.$element.off('.context.data-api').removeData('context');
    $('html').off('.context.data-api');
  }
  isDisabled() {
    return this.$element.hasClass('disabled') ||
      this.$element.attr('disabled');
  }
  getMenu() {
    let selector = this.$element.data('target');
    let $menu;

    if (!selector) {
      selector = this.$element.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    $menu = $(selector);

    return $menu && $menu.length ? $menu : this.$element.find(selector);
  }
  getPosition(e, $menu) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const boundsX = $(window).width();
    const boundsY = $(window).height();
    const menuWidth = $menu.find('.dropdown-menu').outerWidth();
    const menuHeight = $menu.find('.dropdown-menu').outerHeight();
    const tp = { 'position': 'absolute', 'z-index': 9999 };
    let Y, X, parentOffset;

    if (mouseY + menuHeight > boundsY) {
      Y = { 'top': mouseY - menuHeight + $(window).scrollTop() };
    } else {
      Y = { 'top': mouseY + $(window).scrollTop() };
    }

    if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
      X = { 'left': mouseX - menuWidth + $(window).scrollLeft() };
    } else {
      X = { 'left': mouseX + $(window).scrollLeft() };
    }

    // If context-menu's parent is positioned using absolute or relative positioning,
    // the calculated mouse position will be incorrect.
    // Adjust the position of the menu by its offset parent position.
    parentOffset = $menu.offsetParent().offset();
    X.left = X.left - parentOffset.left;
    Y.top = Y.top - parentOffset.top;

    return $.extend(tp, Y, X);
  }
}
