import {AfterViewInit, Component, OnInit} from '@angular/core';
declare let $: any;
@Component({
  selector: 'cn-dynamic-timeline-horizontal',
  templateUrl: './dynamic-timeline-horizontal.component.html',
  styleUrls: ['./dynamic-timeline-horizontal.component.css']
})

export class CnDynamicTimelineHorizontalComponent implements OnInit, AfterViewInit {
  timelines;
  eventsMinDistance = 60;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.timelines = $('.cd-horizontal-timeline');
    this.timelines && this.initTimeline(this.timelines);
  }

  initTimeline(timelines) {
    const self = this;
    timelines.each((index) => {
      const $timeline = $(timelines.get(index));
      const timelineComponents = {};
      //cache timeline components
      timelineComponents['timelineWrapper'] = $timeline.find('.events-wrapper');
      timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
      timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
      timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
      timelineComponents['timelineDates'] = this.parseDate(timelineComponents['timelineEvents']);
      timelineComponents['eventsMinLapse'] = this.minLapse(timelineComponents['timelineDates']);
      timelineComponents['timelineNavigation'] = $timeline.find('.cd-timeline-navigation');
      timelineComponents['eventsContent'] = $timeline.children('.events-content');

      // assign a left postion to the single events along the timeline
      this.setDatePosition(timelineComponents, this.eventsMinDistance);
      // assign a width to the timeline
      const timelineTotWidth = this.setTimelineWidth(timelineComponents, this.eventsMinDistance);
      // the timeline has been initialize - show it
      $timeline.addClass('loaded');

      // detect click on the next arrow
      timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
        event.preventDefault();
        self.updateSlide(timelineComponents, timelineTotWidth, 'next');
      });
      // detect click on the prev arrow
      timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
        event.preventDefault();
        self.updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });
      // detect click on the a single event - show new event content
      timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
        event.preventDefault();
        timelineComponents['timelineEvents'].removeClass('selected');
        $(this).addClass('selected');
        self.updateOlderEvents($(this));
        self.updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
        self.updateVisibleContent($(this), timelineComponents['eventsContent']);
      });

      // on swipe, show next/prev event content
      timelineComponents['eventsContent'].on('swipeleft', function () {
        const mq = this.checkMQ();
        ( mq === 'mobile' ) && self.showNewContent(timelineComponents, timelineTotWidth, 'next');
      });
      timelineComponents['eventsContent'].on('swiperight', function () {
        const mq = this.checkMQ();
        ( mq === 'mobile' ) && self.showNewContent(timelineComponents, timelineTotWidth, 'prev');
      });

      // keyboard navigation
      $(document).keyup(function (event) {
        if (event.which === '37' && self.elementInViewport($(this))) {
          self.showNewContent(timelineComponents, timelineTotWidth, 'prev');
        } else if (event.which === '39' && self.elementInViewport($timeline)) {
          self.showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });
    });
  }

  updateSlide(timelineComponents, timelineTotWidth, string) {
    // retrieve translateX value of timelineComponents['eventsWrapper']
    const translateValue = this.getTranslateValue(timelineComponents['eventsWrapper']);
    const wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    // translate the timeline to the left('next')/right('prev')
    (string == 'next')
      ? this.translateTimeline(timelineComponents, translateValue - wrapperWidth + this.eventsMinDistance, wrapperWidth - timelineTotWidth)
      : this.translateTimeline(timelineComponents, translateValue + wrapperWidth - this.eventsMinDistance);
  }

  showNewContent(timelineComponents, timelineTotWidth, string) {
    // go from one event to the next/previous one
    const visibleContent = timelineComponents['eventsContent'].find('.selected'),
      newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) { // if there's a next/prev event - show it
      const selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
        newEvent = ( string === 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

      this.updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
      this.updateVisibleContent(newEvent, timelineComponents['eventsContent']);
      newEvent.addClass('selected');
      selectedDate.removeClass('selected');
      this.updateOlderEvents(newEvent);
      this.updateTimelinePosition(string, newEvent, timelineComponents);
    }
  }

  updateTimelinePosition(string, event, timelineComponents) {
    // translate timeline to the left/right according to the position of the selected event
    const eventStyle = window.getComputedStyle(event.get(0), null);
    const eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', ''));
    const timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    const timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
    const timelineTranslate = this.getTranslateValue(timelineComponents['eventsWrapper']);

    if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
      this.translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
    }
  }

  translateTimeline(timelineComponents, value, totWidth?) {
    const eventsWrapper = timelineComponents['eventsWrapper'].get(0);
    value = (value > 0) ? 0 : value; //only negative translate value
    value = ( !(typeof totWidth === 'undefined') && value < totWidth ) ? totWidth : value; //do not translate more than timeline width
    this.setTransformValue(eventsWrapper, 'translateX', value + 'px');
    // update navigation arrows visibility
    (value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
    (value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
  }

  updateFilling(selectedEvent, filling, totWidth) {
    // change .filling-line length according to the selected event
    const eventStyle = window.getComputedStyle(selectedEvent.get(0), null);
    let eventLeft: any = eventStyle.getPropertyValue('left');
    const eventWidth = eventStyle.getPropertyValue('width');
    eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    const scaleValue = eventLeft / totWidth;
    this.setTransformValue(filling.get(0), 'scaleX', scaleValue);
  }

  setDatePosition(timelineComponents, min) {
    for (let i = 0; i < timelineComponents['timelineDates'].length; i++) {
      const distance = this.daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]);
      const distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
      timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
    }
  }

  setTimelineWidth(timelineComponents, width) {
    const timeSpan = this.daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]);
    let timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'];
    timeSpanNorm = Math.round(timeSpanNorm) + 4;
    const totalWidth = timeSpanNorm * width;
    timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
    this.updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
    this.updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

    return totalWidth;
  }

  updateVisibleContent(event, eventsContent) {
    const eventDate = event.data('date');
    const visibleContent = eventsContent.find('.selected');
    const selectedContent = eventsContent.find('[data-date="' + eventDate + '"]');
    const selectedContentHeight = selectedContent.height();
    let classEnetering;
    let classLeaving;

    if (selectedContent.index() > visibleContent.index()) {
      classEnetering = 'selected enter-right',
        classLeaving = 'leave-left';
    } else {
      classEnetering = 'selected enter-left',
        classLeaving = 'leave-right';
    }

    selectedContent.attr('class', classEnetering);
    visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
      visibleContent.removeClass('leave-right leave-left');
      selectedContent.removeClass('enter-left enter-right');
    });
    eventsContent.css('height', selectedContentHeight + 'px');
  }

  updateOlderEvents(event) {
    event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
  }

  getTranslateValue(timeline) {
    let translateValue;
    let timelineTranslate;
    const timelineStyle = window.getComputedStyle(timeline.get(0), null);
    timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
      timelineStyle.getPropertyValue('-moz-transform') ||
      timelineStyle.getPropertyValue('-ms-transform') ||
      timelineStyle.getPropertyValue('-o-transform') ||
      timelineStyle.getPropertyValue('transform');

    if (timelineTranslate.indexOf('(') >= 0) {
      timelineTranslate = timelineTranslate.split('(')[1];
      timelineTranslate = timelineTranslate.split(')')[0];
      timelineTranslate = timelineTranslate.split(',');
      translateValue = timelineTranslate[4];
    } else {
      translateValue = 0;
    }

    return Number(translateValue);
  }

  setTransformValue(element, property, value) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  // based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  parseDate(events) {
    const dateArrays = [];

    events.each(function (index) {
      const singleDate = $(events.get(index));
      let dayComp;
      let timeComp;
      let dateComp;
      dateComp = singleDate.data('date').split('T');
      if (dateComp.length > 1) { // both DD/MM/YEAR and time are provided
        dayComp = dateComp[0].split('/');
        timeComp = dateComp[1].split(':');
      } else if (dateComp[0].indexOf(':') >= 0) { // only time is provide
        dayComp = ['2000', '0', '0'];
        timeComp = dateComp[0].split(':');
      } else { // only DD/MM/YEAR
        dayComp = dateComp[0].split('/');
        timeComp = ['0', '0'];
      }
      const newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  daydiff(first, second) {
    return Math.round((second - first));
  }

  minLapse(dates) {
    //determine the minimum distance among events
    const dateDistances = [];
    for (let i = 1; i < dates.length; i++) {
      const distance = this.daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

  /*
   How to tell if a DOM element is visible in the current viewport?
   http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   */
  elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  checkMQ() {
    //check if mobile or desktop device
    return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '');
  }

}
