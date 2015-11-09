Template.allCombined.onRendered(function () {
  Meteor.swiperV = new Swiper('.swiper-container-v', {
    paginationClickable: true,
    direction: 'vertical',
    slidesPerView: 1,
    mousewheelControl: true,
    spaceBetween: 0,
    hashnav: true,
    parallax: true,
    speed: 1000,
    grabCursor: false,
    keyboardControl: true,
    mousewheelForceToAxis: true,

    onSlideChangeEnd: Meteor.SwiperCallbackFunction
  });
});
