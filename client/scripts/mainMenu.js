Template.mainMenu.onRendered(function () {
  $('.menu-item .menu-item-link, .menu-to-home').click(function (evt) {
    let $elem = $(this),
      index = 0,
      slug = $elem.attr('href');

    // cut off a hash
    slug = slug.split('#')[1];

    if (slug) {
      evt.preventDefault();
      index = $(`[data-hash=${slug}]`).index();
    }

    Meteor.swiperV.slideTo(index);

  });
});
