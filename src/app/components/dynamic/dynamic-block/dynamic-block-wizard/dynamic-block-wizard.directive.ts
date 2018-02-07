import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
declare let $: any;
@Directive({
  selector: '[cnDynamicBlockWizard]'
})
export class DynamicBlockWizardDirective implements AfterViewInit {
  @Input() options;
  _elm;

  constructor(private elementRef: ElementRef) {
    this._elm = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    const element = $(this._elm);
    if (typeof this.options === 'string') {
      const args = Array.prototype.slice.call(arguments, 1);
      if (args.length === 1) {
        args.toString();
      }
      return element.data('bootstrapWizard')[this.options](args);
    }
    if (element.data('bootstrapWizard')) return;
    const wizard = new BootstrapWizardCreate(element, this.options);
    element.data('bootstrapWizard', wizard);
    wizard.fixNavigationButtons();
  }
}

class BootstrapWizardCreate {
  _element;
  _options;
  _defaults = {
    withVisible: true,
    tabClass: 'nav nav-pills',
    nextSelector: '.wizard li.next',
    previousSelector: '.wizard li.previous',
    firstSelector: '.wizard li.first',
    lastSelector: '.wizard li.last',
    finishSelector: '.wizard li.finish',
    backSelector: '.wizard li.back',
    onShow: null,
    onInit: null,
    onNext: null,
    onPrevious: null,
    onLast: null,
    onFirst: null,
    onFinish: null,
    onBack: null,
    onTabChange: null,
    onTabClick: null,
    onTabShow: null
  };
  $settings;
  // selector skips any 'li' elements that do not contain a child with a tab data-toggle
  baseItemSelector = 'li:has([data-toggle="tab"])';
  historyStack = [];
  $activeTab = null;
  $navigation = null;

  constructor(element, options) {
    this._element = element;
    this._options = options;
    // Merge options with defaults
    this.$settings = $.extend({}, this._defaults, this._options);
    this.init();
  }

  rebindClick(selector, fn) {
    selector.unbind('click', fn).bind('click', fn);
  }

  fixNavigationButtons() {
    // Get the current active tab
    if (!this.$activeTab.length) {
      // Select first one
      this.$navigation.find('a:first').tab('show');
      this.$activeTab = this.$navigation.find(this.baseItemSelector + ':first');
    }

    // See if we're currently in the first/last then disable the previous and last buttons
    $(this.$settings.previousSelector, this._element).toggleClass('disabled', (this.firstIndex() >= this.currentIndex()));
    $(this.$settings.nextSelector, this._element).toggleClass('disabled', (this.currentIndex() >= this.navigationLength()));
    $(this.$settings.nextSelector, this._element).toggleClass('hidden', (this.currentIndex() >= this.navigationLength() && $(this.$settings.finishSelector, this._element).length > 0));
    $(this.$settings.lastSelector, this._element).toggleClass('hidden', (this.currentIndex() >= this.navigationLength() && $(this.$settings.finishSelector, this._element).length > 0));
    $(this.$settings.finishSelector, this._element).toggleClass('hidden', (this.currentIndex() < this.navigationLength()));
    $(this.$settings.backSelector, this._element).toggleClass('disabled', (this.historyStack.length === 0));
    $(this.$settings.backSelector, this._element).toggleClass('hidden', (this.currentIndex() >= this.navigationLength() && $(this.$settings.finishSelector, this._element).length > 0));

    // We are unbinding and rebinding to ensure single firing and no double-click errors
    this.rebindClick($(this.$settings.nextSelector, this._element), this.next);
    this.rebindClick($(this.$settings.previousSelector, this._element), this.previous);
    this.rebindClick($(this.$settings.lastSelector, this._element), this.last);
    this.rebindClick($(this.$settings.firstSelector, this._element), this.first);
    this.rebindClick($(this.$settings.finishSelector, this._element), this.finish);
    this.rebindClick($(this.$settings.backSelector, this._element), this.back);

    if (this.$settings.onTabShow
      && typeof this.$settings.onTabShow === 'function'
      && this.$settings.onTabShow(this.$activeTab, this.$navigation, this.currentIndex()) === false) {
      return false;
    }
  }

  next = (e) => {
    // If we clicked the last then dont activate this
    if ($(e.currentTarget).hasClass('last')) {
      return false;
    }

    if (this.$settings.onNext
      && typeof this.$settings.onNext === 'function'
      && this.$settings.onNext(this.$activeTab, this.$navigation, this.nextIndex()) === false) {
      return false;
    }

    const formerIndex = this.currentIndex();
    const $index = this.nextIndex();

    // Did we click the last button
    if ($index > this.navigationLength()) {
    } else {
      this.historyStack.push(formerIndex);
      this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '') + ':eq(' + $index + ') a').tab('show');
    }
  };

  previous = (e) => {
    // If we clicked the first then dont activate this
    if ($(e.currentTarget).hasClass('first')) {
      return false;
    }


    if (this.$settings.onPrevious
      && typeof this.$settings.onPrevious === 'function'
      && this.$settings.onPrevious(this.$activeTab, this.$navigation, this.previousIndex()) === false) {
      return false;
    }

    const formerIndex = this.currentIndex();
    const $index = this.previousIndex();

    if ($index < 0) {
    } else {
      this.historyStack.push(formerIndex);
      this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '') + ':eq(' + $index + ') a').tab('show');
    }
  }

  first = (e) => {
    if (this.$settings.onFirst
      && typeof this.$settings.onFirst === 'function'
      && this.$settings.onFirst(this.$activeTab, this.$navigation, this.firstIndex()) === false) {
      return false;
    }

    // If the element is disabled then we won't do anything
    if (this._element.hasClass('disabled')) {
      return false;
    }


    this.historyStack.push(this.currentIndex());
    this.$navigation.find(this.baseItemSelector + ':eq(0) a').tab('show');
  }

  last = (e) => {
    if (this.$settings.onLast && typeof this.$settings.onLast === 'function' && this.$settings.onLast(this.$activeTab, this.$navigation, this.lastIndex()) === false) {
      return false;
    }

    // If the element is disabled then we won't do anything
    if (this._element.hasClass('disabled')) {
      return false;
    }

    this.historyStack.push(this.currentIndex());
    this.$navigation.find(this.baseItemSelector + ':eq(' + this.navigationLength() + ') a').tab('show');
  }

  finish = (e) => {
    if (this.$settings.onFinish && typeof this.$settings.onFinish === 'function') {
      this.$settings.onFinish(this.$activeTab, this.$navigation, this.lastIndex());
    }
  }

  back() {
    if (this.historyStack.length === 0) {
      return null;
    }

    const formerIndex = this.historyStack.pop();
    if (this.$settings.onBack && typeof this.$settings.onBack === 'function' && this.$settings.onBack(this.$activeTab, this.$navigation, formerIndex) === false) {
      this.historyStack.push(formerIndex);
      return false;
    }

    this._element.find(this.baseItemSelector + ':eq(' + formerIndex + ') a').tab('show');
  };

  currentIndex() {
    return this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '')).index(this.$activeTab);
  };

  firstIndex() {
    return 0;
  };

  lastIndex() {
    return this.navigationLength();
  };

  getIndex(e) {
    return this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '')).index(e);
  };

  nextIndex() {
    let nextIndexCandidate = this.currentIndex();
    let nextTabCandidate = null;
    do {
      nextIndexCandidate++;
      nextTabCandidate = this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '') + ':eq(' + nextIndexCandidate + ')');
    } while ((nextTabCandidate) && (nextTabCandidate.hasClass('disabled')));
    return nextIndexCandidate;
  };

  previousIndex() {
    let prevIndexCandidate = this.currentIndex();
    let prevTabCandidate = null;
    do {
      prevIndexCandidate--;
      prevTabCandidate = this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '') + ':eq(' + prevIndexCandidate + ')');
    } while ((prevTabCandidate) && (prevTabCandidate.hasClass('disabled')));
    return prevIndexCandidate;
  };

  navigationLength() {
    return this.$navigation.find(this.baseItemSelector + (this.$settings.withVisible ? ':visible' : '')).length - 1;
  };

  activeTab() {
    return this.$activeTab;
  }

  nextTab() {
    return this.$navigation.find(this.baseItemSelector + ':eq(' + (this.currentIndex() + 1) + ')').length ? this.$navigation.find(this.baseItemSelector + ':eq(' + (this.currentIndex() + 1) + ')') : null;
  }

  previousTab() {
    if (this.currentIndex() <= 0) {
      return null;
    }
    return this.$navigation.find(this.baseItemSelector + ':eq(' + parseInt((this.currentIndex() - 1) + '') + ')');
  }

  show(index) {
    const tabToShow = isNaN(index) ?
      this._element.find(this.baseItemSelector + ' a[href="#' + index + '"]') :
      this._element.find(this.baseItemSelector + ':eq(' + index + ') a');
    if (tabToShow.length > 0) {
      this.historyStack.push(this.currentIndex());
      tabToShow.tab('show');
    }
  };

  disable(index) {
    this.$navigation.find(this.baseItemSelector + ':eq(' + index + ')').addClass('disabled');
  };

  enable(index) {
    this.$navigation.find(this.baseItemSelector + ':eq(' + index + ')').removeClass('disabled');
  };

  hide(index) {
    this.$navigation.find(this.baseItemSelector + ':eq(' + index + ')').hide();
  };

  display(index) {
    this.$navigation.find(this.baseItemSelector + ':eq(' + index + ')').show();
  };

  remove(args) {
    const $index = args[0];
    const $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
    const $item = this.$navigation.find(this.baseItemSelector + ':eq(' + $index + ')');

    // Remove the tab pane first if needed
    if ($removeTabPane) {
      const $href = $item.find('a').attr('href');
      $($href).remove();
    }

    // Remove menu item
    $item.remove();
  };

  innerTabClick = (e) => {
    // Get the index of the clicked tab
    const $ul = this.$navigation.find(this.baseItemSelector);
    const clickedIndex = $ul.index($(e.currentTarget).parent(this.baseItemSelector));
    const $clickedTab = $($ul[clickedIndex]);
    if (this.$settings.onTabClick
      && typeof this.$settings.onTabClick === 'function'
      && this.$settings.onTabClick(this.$activeTab, this.$navigation, this.currentIndex(), clickedIndex, $clickedTab) === false) {
      return false;
    }
  }

  innerTabShown = (e) => {
    const $element = $(e.target).parent();
    const nextTab = this.$navigation.find(this.baseItemSelector).index($element);

    // If it's disabled then do not change
    if ($element.hasClass('disabled')) {
      return false;
    }

    if (this.$settings.onTabChange
      && typeof this.$settings.onTabChange === 'function'
      && this.$settings.onTabChange(this.$activeTab, this.$navigation, this.currentIndex(), nextTab) === false) {
      return false;
    }

    this.$activeTab = $element; // activated tab
    this.fixNavigationButtons();
  }

  resetWizard() {

    // remove the existing handlers
    $('a[data-toggle="tab"]', this.$navigation).off('click', this.innerTabClick);
    $('a[data-toggle="tab"]', this.$navigation).off('show show.bs.tab', this.innerTabShown);

    // reset elements based on current state of the DOM
    this.$navigation = this._element.find('ul:first', this._element);
    this.$activeTab = this.$navigation.find(this.baseItemSelector + '.active', this._element);

    // re-add handlers
    $('a[data-toggle="tab"]', this.$navigation).on('click', this.innerTabClick);
    $('a[data-toggle="tab"]', this.$navigation).on('show show.bs.tab', this.innerTabShown);

    this.fixNavigationButtons();
  }

  init() {
    this.$navigation = this._element.find('ul:first', this._element);
    this.$activeTab = this.$navigation.find(this.baseItemSelector + '.active', this._element);

    if (!this.$navigation.hasClass(this.$settings.tabClass)) {
      this.$navigation.addClass(this.$settings.tabClass);
    }

    // Load onInit
    if (this.$settings.onInit && typeof this.$settings.onInit === 'function') {
      this.$settings.onInit(this.$activeTab, this.$navigation, 0);
    }

    // Load onShow
    if (this.$settings.onShow && typeof this.$settings.onShow === 'function') {
      this.$settings.onShow(this.$activeTab, this.$navigation, this.nextIndex());
    }

    $('a[data-toggle="tab"]', this.$navigation).on('click', this.innerTabClick);

    // attach to both show and show.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
    $('a[data-toggle="tab"]', this.$navigation).on('show show.bs.tab', this.innerTabShown);
  }
}
