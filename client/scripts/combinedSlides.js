Template.evolutionSlide.onRendered(function () {
  // var swiperH = new Swiper('.swiper-container-h', {
  //     pagination: '.swiper-pagination-h',
  //     paginationClickable: true,
  //     spaceBetween: 0
  // });
  Meteor.swiperV = new Swiper('.swiper-container-v', {
    // pagination: '.swiper-pagination-v',
    paginationClickable: true,
    direction: 'vertical',
    slidesPerView: 1,
    mousewheelControl: true,
    spaceBetween: 0,
    hashnav: true,
    parallax: true,
    speed: 1000,
    grabCursor: false,
    // threshold: 50,
    shortSwipes: false,
    mousewheelForceToAxis: true
  });
});
