Template.botanikaLogo.events({
  'click .botanika-logo' (evt) {
    evt.preventDefault();
    Meteor.swiperV.slideTo(0);
  }
});
