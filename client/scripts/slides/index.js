Template.indexSlide.onRendered(function () {
  Waves.attach('.index-next-button', ['waves-circle', 'waves-float']);
  Waves.init();

  var node = this.firstNode;
  Meteor.botanikaSwipngHelper(node, 'houses');
});
