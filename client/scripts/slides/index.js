Template.indexSlide.events({
  'click': function(e) {
    console.log("You scrolled something");
  }
});

Template.indexSlide.onRendered(function () {
  Waves.attach('.index-next-button', ['waves-circle', 'waves-float']);
  Waves.init();
});
