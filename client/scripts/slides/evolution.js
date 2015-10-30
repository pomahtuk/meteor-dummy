Template.evolutionSlide.onRendered(function () {

  let slickInterval = setInterval(function () {
    if ($('.botanika-news-item').length > 0) {
      clearInterval(slickInterval);
      $('.botanika-news-container').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        arrows: false,
        // centerMode: true,
        variableWidth: true,
        // mobileFirst: true,
        // width: 300,
        swipeToSlide: true,
        // variableWidth: true,
        responsive: [
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 750,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  }, 50);

});
