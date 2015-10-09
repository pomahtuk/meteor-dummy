Template.mainStructure.onRendered(function () {
  var activeSlideKey = document.querySelector('.swiper-container-v').dataset.activePage || '';

  var slidesDict = {
    '': 0,
    'contact': 1
  }

  var activeSlideIndex = slidesDict[activeSlideKey];

  var swiperH = new Swiper('.swiper-container-h', {
    pagination: '.swiper-pagination-h',
    paginationClickable: true,
    spaceBetween: 10,
    keyboardControl: true,
    grabCursor: true,
    threshold: 35,
    mousewheelControl: true,
    mousewheelForceToAxis: true,
    speed: 500
  });

  var swiperV = new Swiper('.swiper-container-v', {
    speed: 500,
    pagination: '.swiper-pagination-v',
    paginationClickable: true,
    direction: 'vertical',
    spaceBetween: 10,
    keyboardControl: true,
    mousewheelControl: true,
    grabCursor: true,
    threshold: 100,
    mousewheelForceToAxis: true,
    preloadImages: false,
    lazyLoading: true
  });

  // reflect url changes
  if (activeSlideIndex && activeSlideIndex != 0) {
    swiperV.slideTo(activeSlideIndex, 0);
  }

  // button switchers
  document.querySelector('.index-next-button').addEventListener('click', function() {
    swiperV.slideNext();
  });

});
