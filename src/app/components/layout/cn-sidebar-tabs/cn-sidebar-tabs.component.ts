import {Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { App } from '../cn-layout/cn-layout.component';
import {ConfigService} from '../../../services/config.service';
declare let $: any;
export let Layout = function () {

  const layoutImgPath = 'layouts/layout/img/';

  const layoutCssPath = 'layouts/layout/css/';

  const resBreakpointMd = App.getResponsiveBreakpoint('md');


  // * BEGIN:CORE HANDLERS *//
  // this function handles responsive layout on screen size resize or mobile device rotate.

  // Set proper height for sidebar and content. The content and sidebar height must be synced always.
  const handleSidebarAndContentHeight = function () {
    const content = $('.page-content');
    const sidebar = $('.page-sidebar');
    const body = $('body');
    let height;
    if (body.hasClass('page-footer-fixed') === true && body.hasClass('page-sidebar-fixed') === false) {
      const available_height = App.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
      if (content.height() < available_height) {
        content.attr('style', 'min-height:' + available_height + 'px');
      }
    } else {
      if (body.hasClass('page-sidebar-fixed')) {
        height = _calculateFixedSidebarViewportHeight();
        if (body.hasClass('page-footer-fixed') === false) {
          height = height - $('.page-footer').outerHeight();
        }
      } else {
        const headerHeight = $('.page-header').outerHeight();
        const footerHeight = $('.page-footer').outerHeight();

        if (App.getViewPort().width < resBreakpointMd) {
          height = App.getViewPort().height - headerHeight - footerHeight;
        } else {
          height = sidebar.height() + 20;
        }

        if ((height + headerHeight + footerHeight) <= App.getViewPort().height) {
          height = App.getViewPort().height - headerHeight - footerHeight;
        }
      }
      content.attr('style', 'min-height:' + height + 'px');
    }
  };

  // Handle sidebar menu links
  const handleSidebarMenuActiveLink = function (mode, el) {
    const url = location.hash.toLowerCase();

    const menu = $('.page-sidebar-menu');

    if (mode === 'click' || mode === 'set') {
      el = $(el);
    } else if (mode === 'match') {
      menu.find('li > a').each(function () {
        const path = $(this).attr('href').toLowerCase();
        // url match condition
        if (path.length > 1 && url.substr(1, path.length - 1) === path.substr(1)) {
          el = $(this);
          return;
        }
      });
    }

    if (!el || el.size() == 0) {
      return;
    }

    if (el.attr('href').toLowerCase() === 'javascript:;' || el.attr('href').toLowerCase() === '#') {
      return;
    }

    const slideSpeed = parseInt(menu.data('slide-speed'));
    const keepExpand = menu.data('keep-expanded');

    // begin: handle active state
    if (menu.hasClass('page-sidebar-menu-hover-submenu') === false) {
      menu.find('li.nav-item.open').each(function () {
        let match = false;
        $(this).find('li').each(function () {
          if ($(this).find(' > a').attr('href') === el.attr('href')) {
            match = true;
            return;
          }
        });

        if (match) {
          return;
        }

        $(this).removeClass('open');
        $(this).find('> a > .arrow.open').removeClass('open');
        $(this).find('> .sub-menu').slideUp();
      });
    } else {
      menu.find('li.open').removeClass('open');
    }

    menu.find('li.active').removeClass('active');
    menu.find('li > a > .selected').remove();
    // end: handle active state

    el.parents('li').each(function () {
      $(this).addClass('active');
      $(this).find('> a > span.arrow').addClass('open');

      if ($(this).parent('ul.page-sidebar-menu').size() === 1) {
        $(this).find('> a').append('<span class="selected"></span>');
      }

      if ($(this).children('ul.sub-menu').size() === 1) {
        $(this).addClass('open');
      }
    });

    if (mode === 'click') {
      if (App.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass('in')) { // close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click();
      }
    }
  };

  // Handle sidebar menu
  const handleSidebarMenu = function () {
    // handle sidebar link click
    $('.page-sidebar-menu').on('click', 'li > a.nav-toggle, li > a > span.nav-toggle', function (e) {
      const that = $(this).closest('.nav-item').children('.nav-link');

      if (App.getViewPort().width >= resBreakpointMd && !$('.page-sidebar-menu').attr('data-initialized') && $('body').hasClass('page-sidebar-closed') && that.parent('li').parent('.page-sidebar-menu').size() === 1) {
        return;
      }

      const hasSubMenu = that.next().hasClass('sub-menu');

      if (App.getViewPort().width >= resBreakpointMd && that.parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
        return;
      }

      if (hasSubMenu === false) {
        if (App.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass('in')) { // close the menu on mobile view while laoding a page
          $('.page-header .responsive-toggler').click();
        }
        return;
      }

      const parent = that.parent().parent();
      const the = that;
      const menu = $('.page-sidebar-menu');
      const sub = that.next();

      const autoScroll = menu.data('auto-scroll');
      const slideSpeed = parseInt(menu.data('slide-speed'));
      const keepExpand = menu.data('keep-expanded');

      if (!keepExpand) {
        parent.children('li.open').children('a').children('.arrow').removeClass('open');
        parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(slideSpeed);
        parent.children('li.open').removeClass('open');
      }

      const slideOffeset = -200;

      if (sub.is(':visible')) {
        $('.arrow', the).removeClass('open');
        the.parent().removeClass('open');
        sub.slideUp(slideSpeed, function () {
          if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
            if ($('body').hasClass('page-sidebar-fixed')) {
              menu.slimScroll({
                'scrollTo': (the.position()).top
              });
            } else {
              App.scrollTo(the, slideOffeset);
            }
          }
          handleSidebarAndContentHeight();
        });
      } else if (hasSubMenu) {
        $('.arrow', the).addClass('open');
        the.parent().addClass('open');
        sub.slideDown(slideSpeed, function () {
          if (autoScroll === true && $('body').hasClass('page-sidebar-closed') === false) {
            if ($('body').hasClass('page-sidebar-fixed')) {
              menu.slimScroll({
                'scrollTo': (the.position()).top
              });
            } else {
              App.scrollTo(the, slideOffeset);
            }
          }
          handleSidebarAndContentHeight();
        });
      }

      e.preventDefault();
    });

    // handle menu close for angularjs version
    // if (App.isAngularJsApp()) {
    //   $(".page-sidebar-menu li > a").on("click", function (e) {
    //     if (App.getViewPort().width < resBreakpointMd && $(this).next().hasClass('sub-menu') === false) {
    //       $('.page-header .responsive-toggler').click();
    //     }
    //   });
    // }

    // handle ajax links within sidebar menu
    $('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
      e.preventDefault();
      App.scrollTop();

      const url = $(this).attr('href');
      const menuContainer = $('.page-sidebar ul');
      const pageContent = $('.page-content');
      const pageContentBody = $('.page-content .page-content-body');

      menuContainer.children('li.active').removeClass('active');
      menuContainer.children('arrow.open').removeClass('open');

      $(this).parents('li').each(function () {
        $(this).addClass('active');
        $(this).children('a > span.arrow').addClass('open');
      });
      $(this).parents('li').addClass('active');

      if (App.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass('in')) { // close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click();
      }

      App.startPageLoading(false);

      const the = $(this);

      $.ajax({
        type: 'GET',
        cache: false,
        url: url,
        dataType: 'html',
        success: function (res) {
          if (the.parents('li.open').size() === 0) {
            $('.page-sidebar-menu > li.open > a').click();
          }

          App.stopPageLoading();
          pageContentBody.html(res);
          this.Layout.fixContentHeight(); // fix content height
          App.initAjax(); // initialize core stuff
        },
        error: function (xhr, ajaxOptions, thrownError) {
          App.stopPageLoading();
          pageContentBody.html('<h4>Could not load the requested content.</h4>');
        }
      });
    });

    // handle ajax link within main content
    $('.page-content').on('click', '.ajaxify', function (e) {
      e.preventDefault();
      App.scrollTop();

      const url = $(this).attr('href');
      const pageContent = $('.page-content');
      const pageContentBody = $('.page-content .page-content-body');

      App.startPageLoading(false);

      if (App.getViewPort().width < resBreakpointMd && $('.page-sidebar').hasClass('in')) { // close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click();
      }

      $.ajax({
        type: 'GET',
        cache: false,
        url: url,
        dataType: 'html',
        success: function (res) {
          App.stopPageLoading();
          pageContentBody.html(res);
          this.Layout.fixContentHeight(); // fix content height
          App.initAjax(); // initialize core stuff
        },
        error: function (xhr, ajaxOptions, thrownError) {
          pageContentBody.html('<h4>Could not load the requested content.</h4>');
          App.stopPageLoading();
        }
      });
    });

    // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
    $(document).on('click', '.page-header-fixed-mobile .page-header .responsive-toggler', function () {
      App.scrollTop();
    });

    // handle sidebar hover effect
    handleFixedSidebarHoverEffect();

    // handle the search bar close
    $('.page-sidebar').on('click', '.sidebar-search .remove', function (e) {
      e.preventDefault();
      $('.sidebar-search').removeClass('open');
    });

    // handle the search query submit on enter press
    $('.page-sidebar .sidebar-search').on('keypress', 'input.form-control', function (e) {
      if (e.which == 13) {
        $('.sidebar-search').submit();
        return false; //<---- Add this line
      }
    });

    // handle the search submit(for sidebar search and responsive mode of the header search)
    $('.sidebar-search .submit').on('click', function (e) {
      e.preventDefault();
      if ($('body').hasClass('page-sidebar-closed')) {
        if ($('.sidebar-search').hasClass('open') === false) {
          if ($('.page-sidebar-fixed').size() === 1) {
            $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
          }
          $('.sidebar-search').addClass('open');
        } else {
          $('.sidebar-search').submit();
        }
      } else {
        $('.sidebar-search').submit();
      }
    });

    // handle close on body click
    if ($('.sidebar-search').size() !== 0) {
      $('.sidebar-search .input-group').on('click', function (e) {
        e.stopPropagation();
      });

      $('body').on('click', function () {
        if ($('.sidebar-search').hasClass('open')) {
          $('.sidebar-search').removeClass('open');
        }
      });
    }
  };

  // Helper function to calculate sidebar height for fixed sidebar layout.
  const _calculateFixedSidebarViewportHeight = function () {
    let sidebarHeight = App.getViewPort().height - $('.page-header').outerHeight(true);
    if ($('body').hasClass('page-footer-fixed')) {
      sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
    }

    return sidebarHeight;
  };

  // Handles fixed sidebar
  const handleFixedSidebar = function () {
    const menu = $('.page-sidebar-menu');

    App.destroySlimScroll(menu);

    if ($('.page-sidebar-fixed').size() === 0) {
      handleSidebarAndContentHeight();
      return;
    }

    if (App.getViewPort().width >= resBreakpointMd) {
      menu.attr('data-height', _calculateFixedSidebarViewportHeight());
      App.initSlimScroll(menu);
      handleSidebarAndContentHeight();
    }
  };

  // Handles sidebar toggler to close/hide the sidebar.
  const handleFixedSidebarHoverEffect = function () {
    const body = $('body');
    if (body.hasClass('page-sidebar-fixed')) {
      $('.page-sidebar').on('mouseenter', function () {
        if (body.hasClass('page-sidebar-closed')) {
          $(this).find('.page-sidebar-menu').removeClass('page-sidebar-menu-closed');
        }
      }).on('mouseleave', function () {
        if (body.hasClass('page-sidebar-closed')) {
          $(this).find('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
        }
      });
    }
  };

  // Hanles sidebar toggler
  const handleSidebarToggler = function () {
    const body = $('body');
    if ($.cookie && $.cookie('sidebar_closed') === '1' && App.getViewPort().width >= resBreakpointMd) {
      $('body').addClass('page-sidebar-closed');
      $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
    }

    // handle sidebar show/hide
    $('body').on('click', '.sidebar-toggler', function (e) {
      const sidebar = $('.page-sidebar');
      const sidebarMenu = $('.page-sidebar-menu');
      $('.sidebar-search', sidebar).removeClass('open');

      if (body.hasClass('page-sidebar-closed')) {
        body.removeClass('page-sidebar-closed');
        sidebarMenu.removeClass('page-sidebar-menu-closed');
        if ($.cookie) {
          $.cookie('sidebar_closed', '0');
        }
      } else {
        body.addClass('page-sidebar-closed');
        sidebarMenu.addClass('page-sidebar-menu-closed');
        if (body.hasClass('page-sidebar-fixed')) {
          sidebarMenu.trigger('mouseleave');
        }
        if ($.cookie) {
          $.cookie('sidebar_closed', '1');
        }
      }

      $(window).trigger('resize');
    });
  };

  // Handles the horizontal menu
  const handleHorizontalMenu = function () {
    //handle tab click
    $('.page-header').on('click', '.hor-menu a[data-toggle="tab"]', function (e) {
      e.preventDefault();
      const nav = $('.hor-menu .nav');
      const active_link = nav.find('li.current');
      $('li.active', active_link).removeClass('active');
      $('.selected', active_link).remove();
      const new_link = $(this).parents('li').last();
      new_link.addClass('current');
      new_link.find('a:first').append('<span class="selected"></span>');
    });

    // handle search box expand/collapse
    $('.page-header').on('click', '.search-form', function (e) {
      $(this).addClass('open');
      $(this).find('.form-control').focus();

      $('.page-header .search-form .form-control').on('blur', function (e) {
        $(this).closest('.search-form').removeClass('open');
        $(this).unbind('blur');
      });
    });

    // handle hor menu search form on enter press
    $('.page-header').on('keypress', '.hor-menu .search-form .form-control', function (e) {
      if (e.which == 13) {
        $(this).closest('.search-form').submit();
        return false;
      }
    });

    // handle header search button click
    $('.page-header').on('mousedown', '.search-form.open .submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).closest('.search-form').submit();
    });

    // handle hover dropdown menu for desktop devices only
    $('[data-hover="megamenu-dropdown"]').not('.hover-initialized').each(function () {
      $(this).dropdownHover();
      $(this).addClass('hover-initialized');
    });

    $(document).on('click', '.mega-menu-dropdown .dropdown-menu', function (e) {
      e.stopPropagation();
    });
  };

  // Handles Bootstrap Tabs.
  const handleTabs = function () {
    // fix content height on tab click
    $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
      handleSidebarAndContentHeight();
    });
  };

  // Handles the go to top button at the footer
  const handleGoTop = function () {
    const offset = 300;
    const duration = 500;

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
      $(window).bind('touchend touchcancel touchleave', function (e) {
        if ($(this).scrollTop() > offset) {
          $('.scroll-to-top').fadeIn(duration);
        } else {
          $('.scroll-to-top').fadeOut(duration);
        }
      });
    } else {  // general
      $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
          $('.scroll-to-top').fadeIn(duration);
        } else {
          $('.scroll-to-top').fadeOut(duration);
        }
      });
    }

    $('.scroll-to-top').click(function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      return false;
    });
  };

  // Hanlde 100% height elements(block, portlet, etc)
  const handle100HeightContent = function () {

    $('.full-height-content').each(function () {
      const target = $(this);
      let height;
      height = App.getViewPort().height -
        $('.page-header').outerHeight(true) -
        $('.page-footer').outerHeight(true) -
        $('.page-title').outerHeight(true) -
        $('.page-bar').outerHeight(true);

      if (target.hasClass('portlet')) {
        const portletBody = target.find('.portlet-body');

        App.destroySlimScroll(portletBody.find('.full-height-content-body')); // destroy slimscroll

        height = height -
          target.find('.portlet-title').outerHeight(true) -
          parseInt(target.find('.portlet-body').css('padding-top')) -
          parseInt(target.find('.portlet-body').css('padding-bottom')) - 5;

        if (App.getViewPort().width >= resBreakpointMd && target.hasClass('full-height-content-scrollable')) {
          height = height - 35;
          portletBody.find('.full-height-content-body').css('height', height);
          App.initSlimScroll(portletBody.find('.full-height-content-body'));
        } else {
          portletBody.css('min-height', height);
        }
      } else {
        App.destroySlimScroll(target.find('.full-height-content-body')); // destroy slimscroll

        if (App.getViewPort().width >= resBreakpointMd && target.hasClass('full-height-content-scrollable')) {
          height = height - 35;
          target.find('.full-height-content-body').css('height', height);
          App.initSlimScroll(target.find('.full-height-content-body'));
        } else {
          target.css('min-height', height);
        }
      }
    });
  };
  // * END:CORE HANDLERS *//

  return {
    // Main init methods to initialize the layout
    // IMPORTANT!!!: Do not modify the core handlers call order.

    initHeader: function () {
      handleHorizontalMenu(); // handles horizontal menu
    },

    setSidebarMenuActiveLink: function (mode, el) {
      handleSidebarMenuActiveLink(mode, el);
    },

    initSidebar: function () {
      //layout handlers
      handleFixedSidebar(); // handles fixed sidebar menu
      handleSidebarMenu(); // handles main menu
      handleSidebarToggler(); // handles sidebar hide/show

      if (App.isAngularJsApp()) {
        handleSidebarMenuActiveLink('match', undefined); // init sidebar active links
      }

      App.addResizeHandler(handleFixedSidebar); // reinitialize fixed sidebar on window resize
    },

    initContent: function () {
      handle100HeightContent(); // handles 100% height elements(block, portlet, etc)
      handleTabs(); // handle bootstrah tabs
      App.addResizeHandler(handleSidebarAndContentHeight); // recalculate sidebar & content height on window resize
      App.addResizeHandler(handle100HeightContent); // reinitialize content height on window resize
    },

    initFooter: function () {
      handleGoTop(); //handles scroll to top functionality in the footer
    },

    init: function () {
      this.initHeader();
      this.initSidebar();
      this.initContent();
      this.initFooter();
    },

    //public function to fix the sidebar and content height accordingly
    fixContentHeight: function () {
      handleSidebarAndContentHeight();
    },

    initFixedSidebarHoverEffect: function () {
      handleFixedSidebarHoverEffect();
    },

    initFixedSidebar: function () {
      handleFixedSidebar();
    },

    getLayoutImgPath: function () {
      return App.getAssetsPath() + layoutImgPath;
    },

    getLayoutCssPath: function () {
      return App.getAssetsPath() + layoutCssPath;
    }
  };

}();

@Component({
  selector: 'cn-sidebar-tabs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cn-sidebar-tabs.component.html'
})
export class CnSidebarTabsComponent implements OnInit, OnChanges {
  @HostBinding('class.component') hasComponent = true;
  @HostBinding('class.page-sidebar') hasPageSidebar = true;
  @HostBinding('class.navbar-collapse') hasnavbar = true;
  @HostBinding('class.collapse') hascollapse= true;

  @Input() isShowSearch: boolean;
  @Input() menu: any[];
  @Output() eventCallback: EventEmitter<any> = new EventEmitter<any>();
  ngOnChanges() {
  }
  constructor(private configService: ConfigService) {

    // this.menu = this.configService.getProjectConfig();
   /* this.configService.getConfig().then(response =>{
      this.menu = new SideBarResolver(response).config;
    });*/

  }
  ngOnInit() {
    Layout.init();
  }

  addTab(menuItem){
   this.eventCallback.emit(menuItem);
  }
}


