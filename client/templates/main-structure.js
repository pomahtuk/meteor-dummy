Template.mainStructure.onRendered(function () {
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
    hashnav: true,
    threshold: 100,
    mousewheelForceToAxis: true
  });
});
