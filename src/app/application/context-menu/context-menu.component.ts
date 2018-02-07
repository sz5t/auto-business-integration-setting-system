import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ClientStorageService } from '../../services/client-storage.service';
declare let $: any;

@Component({
  selector: 'cn-context-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit, AfterViewInit {
  ComponentConfig;
  constructor(private clientjson: ClientStorageService) {
    //this.ComponentConfig = this.clientjson.getLocalStorage('ComponentConfig');

    this.ComponentConfig = {
      modulename: "功能模块一",
      rows: [
        {
          row:
            [//布局
              {
                portletkey: 'portletkey01',
                cliclass: "col-md-6",
                portlet: {
                  portletclass: "portlet light bordered",
                  portlettitle: {//标题
                    iconclass: "icon-speech",//小图标
                    captiontitle: "标题一"//,//标题文字
                    //captionhelper: "" //小标题
                  },
                  portletbody: {//布局里的组件内容
                    appendcomponent: ""
                  }

                }
              },
              {
                portletkey: 'portletkey02',
                cliclass: "col-md-6",
                portlet: {
                  portletclass: "portlet light bordered",
                  portlettitle: {//标题
                    iconclass: "icon-speech",//小图标
                    captiontitle: "标题二"//,//标题文字
                    //captionhelper: "" //小标题
                  },
                  portletbody: {//布局里的组件内容
                    appendcomponent: ""
                  }

                }
              }

            ]
        }


      ]
    };

  }

  //操作弹出菜单后修改
  chagejson(context, itemname) {
    let contextclass = context.attr("class");//这里获取class值
    let classarray = contextclass.split(" ");
    let portletkey;
    classarray.forEach((element: any) => {

      if (element.substr(0, 10) === "portletkey") {
        portletkey = element;
      }
    });
    this.ComponentConfig.rows[0].row.forEach((r: any) => {
      if (r.portletkey == portletkey) {
        if (itemname == 'Clear') {
          r.portlet.portletbody.appendtabs={};
          r.portlet.portletbody.appendcomponent = "";
        }
        if (itemname == 'AddTabs') {
          r.portlet.portletbody.appendcomponent =itemname;
          context.append(
            ' <ul class="nav nav-tabs"> ' +
            ' <li class="tabs.active active">' +
            '    <a href="#'+portletkey+'tab01" data-toggle="tab">Tab页1 </a> ' +
            '  </li> ' +
            ' <li class="tabs.active">' +
            '    <a href="#'+portletkey+'tab02" data-toggle="tab">Tab页2 </a> ' +
            '  </li> ' +
            '</ul> ' +
            '<div class="tab-content"> ' +
            '   <div  class="tab-pane fade active in" id="'+portletkey+'tab01"> ' +
            '        <p> 内容1 </p> ' +
            '   </div> ' +
            '   <div  class="tab-pane fade " id="'+portletkey+'tab02"> ' +
            '        <p> 内容2 </p> ' +
            '   </div> ' +
            ' </div> ');
            r.portlet.portletbody.appendtabs={};
            r.portlet.portletbody.appendtabs= {
              titel: 'tab标题页',
              tabs: [
                {
                  id: portletkey+'tab01',
                  titel: 'tab页1',
                  appendcomponent: 'addtree',
                  active: 'active',
                  contentactive: 'active in'
                },
                {
                  id: portletkey+'tab02',
                  titel: 'tab页2',
                  appendcomponent: 'adtable',
                  active: '',
                  contentactive: ''
                }
              ]
            }
        }
        else {
          r.portlet.portletbody.appendtabs={};
          r.portlet.portletbody.appendcomponent = itemname;
        }
      }
    });

    this.clientjson.setLocalStorage('ComponentConfig', this.ComponentConfig);
  };

  menuClick(context, itemname) {

    if (itemname == 'AddTree') {
      /*  if (context.find("[appendclass=\"append-demo\"]").length > 0) {
         context.empty();
       } */
      context.empty();

      context.append(" <div  appendclass=\"append-demo\" class=\"tree-demo\"> </div>");

      context.children().each(function () {
        $(this).jstree({
          "core": {
            "themes": {
              "responsive": false
            },
            // so that create works
            "check_callback": true,
            'data': [{
              "text": "树节点01",
              "children": [{
                "text": "树节点0101",
                "state": {
                  "selected": true
                }
              }, {
                "text": "树节点0102",
                "icon": "fa fa-folder icon-state-danger",
                "children": [
                  { "text": "树节点010201", "icon": "fa fa-file icon-state-warning" },
                  { "text": "树节点010202", "icon": "fa fa-file icon-state-success" },
                  { "text": "树节点010203", "icon": "fa fa-file icon-state-default" },
                  { "text": "树节点010204", "icon": "fa fa-file icon-state-danger" },
                  { "text": "树节点010205", "icon": "fa fa-file icon-state-info" }
                ]
              }]
            },
              "其他节点"
            ]
          },
          "types": {
            "default": {
              "icon": "fa fa-folder icon-state-warning icon-lg"
            },
            "file": {
              "icon": "fa fa-file icon-state-warning icon-lg"
            }
          },
          "state": { "key": "demo2" },
          "plugins": ["dnd", "state", "types"]
        });
      });

      this.chagejson(context, itemname);
    }
    else if (itemname == 'AddTable') {

      /*  if (context.find("[appendclass=\"append-demo\"]").length > 0) {
         context.empty();
       } */
      context.empty();
      context.append(" <table  appendclass=\"append-demo\" > </table>");

      context.children().each(function () {
        $(this).bootstrapTable({
          height: 300,
          sortOrder: 'asc',
          striped: false,
          locale: 'zh-CN',
          columns: [{
            field: 'ZD1',
            sortable: true,
            sortOrder: "asc",
            title: '字段1',
            width: 120,
            align: 'center',
          },
          {
            field: 'ZD2',
            sortable: true,
            sortOrder: "asc",
            title: '字段2',
            width: 120,
            align: 'center',
          },
          {
            field: 'ZD3',
            sortable: true,
            sortOrder: "asc",
            title: '字段3',
            width: 120,
            align: 'center',
          }]

        });
      });
      this.chagejson(context, itemname);
    }
    else if (itemname == 'AddTabs') {
      context.empty();

      this.chagejson(context, itemname);
    }
    else if (itemname == 'Clear') {
      context.empty();
      this.chagejson(context, itemname);
    }



  };

  ngOnInit() {
    $(".portlet_context").bind('contextmenu', function () {
      return false;
    });
  };

  ngAfterViewInit() {
    let menu = new ContextMenu('.portlet_context', {
      target: '#context-menu', before: function (e) {
        e.preventDefault();
        return true;
      },
      onItem: (context, e) => {
        this.menuClick(context, $(e.target).attr('item-name'));
      }
    });
    $(".portlet_context").bind('contextmenu', function () {
      return false;
    });
    $('.portlet_context').mousedown(function (e) {
      if (3 == e.which) {
        e.preventDefault();
        menu.show(e);
      }

    });
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
  };

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
  };

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
  };
  keydown(e) {
    if (e.which == 27)
      this.closemenu(e);
  };
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
  };
  destroy() {
    this.$element.off('.context.data-api').removeData('context');
    $('html').off('.context.data-api');
  };
  isDisabled() {
    return this.$element.hasClass('disabled') ||
      this.$element.attr('disabled');
  };
  getMenu() {
    let selector = this.$element.data('target');
    let $menu;

    if (!selector) {
      selector = this.$element.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    $menu = $(selector);

    return $menu && $menu.length ? $menu : this.$element.find(selector);
  };
  getPosition(e, $menu) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let boundsX = $(window).width();
    let boundsY = $(window).height();
    let menuWidth = $menu.find('.dropdown-menu').outerWidth();
    let menuHeight = $menu.find('.dropdown-menu').outerHeight();
    let tp = { "position": "absolute", "z-index": 9999 };
    let Y, X, parentOffset;

    if (mouseY + menuHeight > boundsY) {
      Y = { "top": mouseY - menuHeight + $(window).scrollTop() };
    } else {
      Y = { "top": mouseY + $(window).scrollTop() };
    }

    if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
      X = { "left": mouseX - menuWidth + $(window).scrollLeft() };
    } else {
      X = { "left": mouseX + $(window).scrollLeft() };
    }

    // If context-menu's parent is positioned using absolute or relative positioning,
    // the calculated mouse position will be incorrect.
    // Adjust the position of the menu by its offset parent position.
    parentOffset = $menu.offsetParent().offset();
    X.left = X.left - parentOffset.left;
    Y.top = Y.top - parentOffset.top;

    return $.extend(tp, Y, X);
  };
}




