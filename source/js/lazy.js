
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const winHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];

if (lazyImages.length > 0) {

  lazyImages.forEach(image => {

    if (image.dataset.src || image.dataset.srcset) {

      lazyImagesPositions.push(image.getBoundingClientRect().top + scrollY);
      checkLazyScroll();
    }
  });
}

// console.log(lazyImagesPositions);
window.addEventListener('scroll', lazyScroll);

function lazyScroll() {

  if(document.querySelectorAll('img[data-src]', 'img[data-srcset]') > 0) {

    checkLazyScroll();
  }
}

function checkLazyScroll() {

  let imageIndex = lazyImagesPositions.findIndex(
    item => scrollY > item - winHeight
  )

  if(imageIndex >= 0) {

    if(lazyImages[imageIndex].dataset.src) {

      lazyImages[imageIndex].src = lazyImages[imageIndex].dataset.src;
      lazyImages[imageIndex].removeAttribute('data-src');

    } else if(lazyImages[imageIndex].dataset.srcset) {

      lazyImages[imageIndex].srcset = lazyImages[imageIndex].dataset.srcset;
      lazyImages[imageIndex].removeAttribute('data-srcset');
    }

      delete lazyImagesPositions[imageIndex];
  }
}
