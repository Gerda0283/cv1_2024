
/*import {

  slideUp,
  slideToggle,
} from './util.js';*/

// Sliding Animation

const slideUp = (target, duration = 500) => {

  if (!target.classList.contains('content--slide')) {
    target.classList.add('content--slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('content--slide');
    }, duration);
  }
}

const slideDown = (target, duration = 500) => {

  if (!target.classList.contains('content--slide')) {
    target.classList.add('content--slide');

    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('content--slide');
    }, duration);
  }
}

const slideToggle = (target, duration = 500) => {

  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {

  // Geting regular spollers
  const spollersRegular = Array.from(spollersArray).filter((item, index, self) => {
    return !item.dataset.spollers.split(',')[0];
  });

   // Initialization or regular spollers
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Geting media spollers
  const spollersMedia = Array.from(spollersArray).filter((item, index, self) => {
    return item.dataset.spollers.split(',')[0];
  });

  // Initialization or media spollers
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Getting unique breakpoints
    let mediaQueries = breakpointsArray.map(item => {
      return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
    });

    mediaQueries = mediaQueries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    // Operating each breakpoint
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchPoint = window.matchMedia(paramsArray[0]);

      // Finding objects with necessary conditions
      const spollerArr = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });

      // Listening to media changing in order to start event
      matchPoint.addEventListener('change', () => {
        initSpollers(spollerArr, matchPoint);
      });

      initSpollers(spollerArr, matchPoint);

    });
  }

  // Spollers Initialization Function
  function initSpollers(array, mediaPoint = false) {
    array.forEach(spollerBlock => {

      spollerBlock = mediaPoint ? spollerBlock.item : spollerBlock;

        if (mediaPoint.matches || !mediaPoint) {
          spollerBlock.classList.add('spoller--init');
          initSpollerBody(spollerBlock);
          spollerBlock.addEventListener('click', setSpollerAction);
        } else {
          spollerBlock.classList.remove('spoller--init');
          initSpollerBody(spollerBlock, false);
          spollerBlock.removeEventListener('click', setSpollerAction);
        }
    });
  }

  // Spoller's content Functions

  function initSpollerBody(spollerBlock, hideSpollersBody = true) {

    const spollerTitles = spollerBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollersBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('current')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
      });
    }
  }

  function setSpollerAction(evt) {
    const el = evt.target;
    if (el.matches('[data-spoller]') || el.closest('[data-spoller]')) {
      const spollerTitle = el.matches('[data-spoller]') ? el : el.closest('[data-spoller]');
      const spollerBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollerBlock.hasAttribute('data-one-spoller') ? true : false;
      if (!spollerBlock.querySelectorAll('.content--slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('current')) {
          hideSpollersBody(spollerBlock);
        }
        spollerTitle.classList.toggle('current');
        slideToggle(spollerTitle.nextElementSibling, 500);
      };
      evt.preventDefault();

    };
  }

  function hideSpollersBody(spollerBlock) {
    const spollerActiveTitle = spollerBlock.querySelector('[data-spoller].current');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('current');
      slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}


