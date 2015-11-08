Template.singleHouseSlide.onRendered(function () {
  let template = this;

  let swiperElement = template.$('.swiper-container-h').get(0),
    swiperPagination = template.$('.swiper-pagination-h').get(0);

  var swiper = new Swiper(swiperElement, {
    pagination: swiperPagination,
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    grabCursor: false,
    parallax: true,
    speed: 750,
    grabCursor: false,
    keyboardControl: true,
    // threshold: 50,
    // shortSwipes: false
  });
});