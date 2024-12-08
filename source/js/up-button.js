/*import {

  PAGE_HALVE,
} from './variables.js';*/

const PAGE_HALVE = 270;

const buttonScrollToTop = document.querySelector('.button--back-to-top')

const isHalfPage = () => Math.round(window.scrollY) >= PAGE_HALVE;

const scrollToTop = () => {

  window.scrollTo({

    top: 0,
    behavior: 'smooth'
  })
};

const toggleVisibilityOfButton = () => {

  if (isHalfPage()) {
    buttonScrollToTop.addEventListener('click', scrollToTop);
    buttonScrollToTop.style.opacity = 0.75;
  } else {
    buttonScrollToTop.removeEventListener('click', scrollToTop);
    buttonScrollToTop.style.opacity = 0;
  }
}

window.addEventListener('scroll', toggleVisibilityOfButton);
