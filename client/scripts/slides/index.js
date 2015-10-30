Template.indexSlide.onRendered(function () {
  Waves.attach('.index-next-button', ['waves-circle', 'waves-float']);
  Waves.init();

  $('.index-next-button').click(function(evt) {
    evt.preventDefault();
    Meteor.swiperV.slideTo(1);
  });
});
