
//if (window.location.toString().indexOf('designer_portfolio.html') > 0) {

function imagesInit() {

  const images = document.querySelectorAll('.figure__image');

  if (images.length) {

    images.forEach(image => {

      const imageItem = image.querySelector('img');
      const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
      image.style.paddingBottom = `${padding}%`;
      imageItem.classList.add('init');
    });
  }
}

function gridInit() {

  const items = document.querySelector('.figure__items');
  const itemsGrid = new Isotope(items, {

    itemSelector: '.figure',
    masonry: {

      fitWidth: true,
      gutter: 20,
    }
  });


  document.addEventListener('click', documentActions);

  function documentActions(evt) {

    const targetElement = evt.target;

    if(targetElement.closest('.filter__item')) {

      const filterItem = targetElement.closest('.filter__item');
      const filterValue = filterItem.dataset.filter;
      const filterActiveItem = document.querySelector('.is-checked');
      filterActiveItem.click();

      filterValue === '*' ? itemsGrid.arrange({filter:``}) : itemsGrid.arrange({ filter:`[data-filter="${filterValue}"]` });

      filterActiveItem.classList.remove('is-checked');
      filterItem.classList.add('is-checked');
      evt.preventDefault();
    }
  }
}

gridInit();

window.addEventListener('load', windowLoad);

function windowLoad() {
  document.querySelector('[data-filter="*"]').classList.add('is-checked');
  imagesInit();
}
//}
