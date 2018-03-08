import {Component, HostBinding, OnInit, Type, ViewEncapsulation} from '@angular/core';
import {TabItem} from './cn-page-tab.model';
import {ClientStorageService} from '../../../services/client-storage.service';
import {Router} from '@angular/router';
import {App} from '../cn-layout/cn-layout.component';
import {Layout} from '../cn-sidebar/cn-sidebar.component';
declare let $: any;
@Component({
  selector: 'cn-page-tab',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-page-tab.component.html',
  styleUrls: ['./cn-page-tab.component.css']
})
export class CnPageTabComponent implements OnInit {

  currentIndex: number = -1;
  tabList: TabItem[] = [];
  @HostBinding('class.component') _component = true;

  constructor(private clientStorage: ClientStorageService, private router: Router) {

  }

  ngOnInit() {
    this.handleTheme();
    const $panelOption = $('.theme-panel .layout-style-option');
    $panelOption.change(() => {
      this.setThemeStyle($panelOption.val());
    });
  }

  getCurrentIndex(tab) {
    return this.tabList.findIndex(item => item.name === tab.name);
  }

  selectChange($event) {
    this.currentIndex = $event.index;
  }

  onTabClose(tab?: any) {
    if (!this.tabList[this.currentIndex].unremovable){
      this.tabList.splice(this.currentIndex, 1);
    }
  }

  closeTab(event?, tab?: any) {
    event.preventDefault();
    event.stopPropagation();

    const tabIndex = this.tabList.findIndex(item => {
      return item === tab;
    });
    if(tabIndex){
      tabIndex[0].component.destroy();
    }
    this.tabList.splice(tabIndex, 1);
    if(tabIndex === this.currentIndex) {
      this.currentIndex = tabIndex - 1;
      if(this.currentIndex < 0)
      {
        this.currentIndex = 0;
      }
      this.setActiveTab();
    }
  }

  setActiveTab() {
    if(this.tabList.length >0) {
      this.tabList.forEach(tabItem => {
        tabItem.active = '';
      });
      this.tabList[this.currentIndex].active = 'active in';
    }

  }

  setActiveTabByName(name) {
    if(this.tabList.length >0) {
      const index = this.tabList.findIndex(elem => {
        return elem.name === name;
      });
      if(index > -1){
        this.currentIndex = index;
      }
    }

  }

  closeOtherTabs() {
    const name = this.tabList[this.currentIndex].name;
    this.tabList = this.tabList.filter(item => item.name === name || item.unremovable);
  }

  addTab(newTab) {
    const index = this.tabList.findIndex(elem => {
      return elem.name === newTab.name;
    });
    const active = (index > -1) ? '' : 'active in';
    let tab: TabItem = new TabItem();
    tab = this.createComponentInTab(newTab.name, active, newTab.title, newTab.component, newTab.unremovable, newTab.icon);
    if (index === -1) {
      this.tabList.forEach(tabItem => {
        tabItem.active = '';
      });
      this.tabList.push(tab);
    }
    this.currentIndex = this.getCurrentIndex(tab);
  }

  createComponentInTab(
    name: string,
    active?: string,
    title?: string,
    component?: Type<any>,
    unremovable?: boolean,
    icon?: string
  ): TabItem {
    return {
      name: name,
      active: active,
      title: title,
      component: component,
      unremovable: unremovable ? unremovable : true,
      icon: icon ? icon : '' };
  }

  logout() {
    const customerId = this.clientStorage.getCookies('customerId');
    $('#dialog_logout').modal('hide');
    this.router.navigate([`/login/${customerId}`]).then(() => {
      this.clientStorage.clearCookies();
      this.clientStorage.clearSessionStorage();
      this.clientStorage.clearLocalStorage();
    });
  }

  handleTheme() {
    const panel = $('.theme-panel');

    if ($('body').hasClass('page-boxed') === false) {
      $('.layout-option', panel).val('fluid');
    }

    $('.sidebar-option', panel).val('default');
    $('.page-header-option', panel).val('fixed');
    $('.page-footer-option', panel).val('default');
    if ($('.sidebar-pos-option').attr('disabled') === false) {
      $('.sidebar-pos-option', panel).val(App.isRTL() ? 'right' : 'left');
    }

    //handle theme layout
    const resetLayout = function () {
      $('body').removeClass('page-boxed').removeClass('page-footer-fixed').removeClass('page-sidebar-fixed').removeClass('page-header-fixed').removeClass('page-sidebar-reversed');

      $('.page-header > .page-header-inner').removeClass('container');

      if ($('.page-container').parent('.container').size() === 1) {
        $('.page-container').insertAfter('body > .clearfix');
      }

      if ($('.page-footer > .container').size() === 1) {
        $('.page-footer').html($('.page-footer > .container').html());
      } else if ($('.page-footer').parent('.container').size() === 1) {
        $('.page-footer').insertAfter('.page-container');
        $('.scroll-to-top').insertAfter('.page-footer');
      }

      $('.top-menu > .navbar-nav > li.dropdown').removeClass('dropdown-dark');

      $('body > .container').remove();
    };

    let lastSelectedLayout = '';

    const setLayout = function () {

      const layoutOption = $('.layout-option', panel).val();
      let sidebarOption = $('.sidebar-option', panel).val();
      let headerOption = $('.page-header-option', panel).val();
      const footerOption = $('.page-footer-option', panel).val();
      const sidebarPosOption = $('.sidebar-pos-option', panel).val();
      const sidebarStyleOption = $('.sidebar-style-option', panel).val();
      const sidebarMenuOption = $('.sidebar-menu-option', panel).val();
      const headerTopDropdownStyle = $('.page-header-top-dropdown-style-option', panel).val();

      if (sidebarOption == 'fixed' && headerOption == 'default') {
        alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
        $('.page-header-option', panel).val('fixed');
        $('.sidebar-option', panel).val('fixed');
        sidebarOption = 'fixed';
        headerOption = 'fixed';
      }

      resetLayout(); // reset layout to default state

      if (layoutOption === 'boxed') {
        $('body').addClass('page-boxed');

        // set header
        $('.page-header > .page-header-inner').addClass('container');
        const cont = $('body > .clearfix').after('<div class="container"></div>');

        // set content
        $('.page-container').appendTo('body > .container');

        // set footer
        if (footerOption === 'fixed') {
          $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
        } else {
          $('.page-footer').appendTo('body > .container');
        }
      }

      if (lastSelectedLayout != layoutOption) {
        //layout changed, run responsive handler:
        App.runResizeHandlers();
      }
      lastSelectedLayout = layoutOption;

      //header
      if (headerOption === 'fixed') {
        $('body').addClass('page-header-fixed');
        $('.page-header').removeClass('navbar-static-top').addClass('navbar-fixed-top');
      } else {
        $('body').removeClass('page-header-fixed');
        $('.page-header').removeClass('navbar-fixed-top').addClass('navbar-static-top');
      }

      //sidebar
      if ($('body').hasClass('page-full-width') === false) {
        if (sidebarOption === 'fixed') {
          $('body').addClass('page-sidebar-fixed');
          $('page-sidebar-menu').addClass('page-sidebar-menu-fixed');
          $('page-sidebar-menu').removeClass('page-sidebar-menu-default');
          Layout.initFixedSidebarHoverEffect();
        } else {
          $('body').removeClass('page-sidebar-fixed');
          $('page-sidebar-menu').addClass('page-sidebar-menu-default');
          $('page-sidebar-menu').removeClass('page-sidebar-menu-fixed');
          $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
        }
      }

      // top dropdown style
      if (headerTopDropdownStyle === 'dark') {
        $('.top-menu > .navbar-nav > li.dropdown').addClass('dropdown-dark');
      } else {
        $('.top-menu > .navbar-nav > li.dropdown').removeClass('dropdown-dark');
      }

      //footer
      if (footerOption === 'fixed') {
        $('body').addClass('page-footer-fixed');
      } else {
        $('body').removeClass('page-footer-fixed');
      }

      //sidebar style
      if (sidebarStyleOption === 'light') {
        $('.page-sidebar-menu').addClass('page-sidebar-menu-light');
      } else {
        $('.page-sidebar-menu').removeClass('page-sidebar-menu-light');
      }

      //sidebar menu
      if (sidebarMenuOption === 'hover') {
        if (sidebarOption == 'fixed') {
          $('.sidebar-menu-option', panel).val('accordion');
          alert('Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.');
        } else {
          $('.page-sidebar-menu').addClass('page-sidebar-menu-hover-submenu');
        }
      } else {
        $('.page-sidebar-menu').removeClass('page-sidebar-menu-hover-submenu');
      }

      //sidebar position
      if (App.isRTL()) {
        if (sidebarPosOption === 'left') {
          $('body').addClass('page-sidebar-reversed');
          $('#frontend-link').tooltip('destroy').tooltip({
            placement: 'right'
          });
        } else {
          $('body').removeClass('page-sidebar-reversed');
          $('#frontend-link').tooltip('destroy').tooltip({
            placement: 'left'
          });
        }
      } else {
        if (sidebarPosOption === 'right') {
          $('body').addClass('page-sidebar-reversed');
          $('#frontend-link').tooltip('destroy').tooltip({
            placement: 'left'
          });
        } else {
          $('body').removeClass('page-sidebar-reversed');
          $('#frontend-link').tooltip('destroy').tooltip({
            placement: 'right'
          });
        }
      }

      Layout.fixContentHeight(); // fix content height
      Layout.initFixedSidebar(); // reinitialize fixed sidebar
    };

    // handle theme colors
    const setColor = function (color) {
      const color_ = (App.isRTL() ? color + '-rtl' : color);
      $('#style_color').attr('href', Layout.getLayoutCssPath() + 'themes/' + color_ + '.min.css');
      if (color == 'light2') {
        $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo-invert.png');
      } else {
        $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo.png');
      }
    };

    $('.toggler', panel).click(function () {
      $('.toggler').hide();
      $('.toggler-close').show();
      $('.theme-panel > .theme-options').show();
    });

    $('.toggler-close', panel).click(function () {
      $('.toggler').show();
      $('.toggler-close').hide();
      $('.theme-panel > .theme-options').hide();
    });

    $('.theme-colors > ul > li', panel).click(function () {
      const color = $(this).attr('data-style');
      setColor(color);
      $('ul > li', panel).removeClass('current');
      $(this).addClass('current');
    });

    // set default theme options:

    if ($('body').hasClass('page-boxed')) {
      $('.layout-option', panel).val('boxed');
    }

    if ($('body').hasClass('page-sidebar-fixed')) {
      $('.sidebar-option', panel).val('fixed');
    }

    if ($('body').hasClass('page-header-fixed')) {
      $('.page-header-option', panel).val('fixed');
    }

    if ($('body').hasClass('page-footer-fixed')) {
      $('.page-footer-option', panel).val('fixed');
    }

    if ($('body').hasClass('page-sidebar-reversed')) {
      $('.sidebar-pos-option', panel).val('right');
    }

    if ($('.page-sidebar-menu').hasClass('page-sidebar-menu-light')) {
      $('.sidebar-style-option', panel).val('light');
    }

    if ($('.page-sidebar-menu').hasClass('page-sidebar-menu-hover-submenu')) {
      $('.sidebar-menu-option', panel).val('hover');
    }

    const sidebarOption = $('.sidebar-option', panel).val();
    const headerOption = $('.page-header-option', panel).val();
    const footerOption = $('.page-footer-option', panel).val();
    const sidebarPosOption = $('.sidebar-pos-option', panel).val();
    const sidebarStyleOption = $('.sidebar-style-option', panel).val();
    const sidebarMenuOption = $('.sidebar-menu-option', panel).val();

    $('.layout-option, .page-header-option, .page-header-top-dropdown-style-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option', panel).change(setLayout);
  }

  setThemeStyle(style) {
    let file = (style === 'rounded' ? 'components-rounded' : 'components');
    file = (App.isRTL() ? file + '-rtl' : file);

    $('#style_components').attr('href', App.getGlobalCssPath() + file + '.min.css');

    /*if (typeof Cookies !== 'undefined') {
     Cookies.set('layout-style-option', style);
     }*/
  }

}
