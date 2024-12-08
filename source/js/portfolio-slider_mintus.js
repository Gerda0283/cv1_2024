if (window.location.toString().indexOf('designer_portfolio_inner_mintus') > 0) {

  $(function() {

    $('.portfolio-main-slider').slick({

      arrows: true,
      infinite: false,
      initialSlide: 2,
      draggable: true,
      swipe: true,
      touchThreshold: 10,
      touchMove: true,
      dots: true,
      appendDots: $('.controls'),
      // mobileFirst: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      fade: false,
      // autoplay:true,
      // autoplaySpeed: 3000,
      // pouseOnFocus: true,
      // pouseOnHover: true,
      // pouseOnDotsHover: true,
      responsive: [
        {
          breakpoint: 993,
            settings: {
              autoplay: false,
              slidesToShow: 2,
            }
        },
        {
          breakpoint: 520,
            settings: {
              autoplay: false,
              slidesToShow: 1,
            }
        }
      ]
    })

    // Next slide button
  $('.control--next').click(function() {
    $('.portfolio-main-slider').slick('slickNext');
  });

  // Prev slide button
  $('.control--prev').click(function() {
    $('.portfolio-main-slider').slick('slickPrev');
  });

  $('.control--prev').addClass('slick-disabled');
    $('.portfolio-main-slider').on('afterChange', function () {
      if ($('.slick-prev').hasClass('slick-disabled')) {
        $('.control--prev').addClass('slick-disabled');
      } else {
        $('.control--prev').removeClass('slick-disabled');
      }
      if ($('.slick-next').hasClass('slick-disabled')) {
        $('.control--next').addClass('slick-disabled');
      } else {
        $('.control--next').removeClass('slick-disabled');
      }
    });
  });

  $('.portfolio-main-slider').on('init', function(slick){
    $('.portfolio-main-slider').show();
  });

  }
