Template.indexSlide.onRendered(function () {
  Waves.attach('.index-next-button', ['waves-circle', 'waves-float']);
  Waves.init();

  let node = this.firstNode;
  Meteor.botanikaSwipngHelper(node, 'houses');
});
