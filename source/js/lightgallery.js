

if (window.location.toString().indexOf('designer_portfolio_inner') > 0) {

  function customizeGallery() {

    $(gallery).lightGallery({
      thumbnail: false,
      pager: $(window).width() >= 768 ? true : false,
      controls: true,
      download: false,
      speed: 500,
      appendSubHtmlTo: '.lg-item',
      slideDelay: 400,
    })
  }

  customizeGallery();
};

