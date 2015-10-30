Template.mainMenu.onRendered(function () {
  $('.menu-item .menu-item-link, .menu-to-home').click(function (evt) {
    let $elem = $(this),
      index = $elem.data('index');
    if(index || index === 0) {
      evt.preventDefault();
    }

    Meteor.swiperV.slideTo(index);

  });
});
