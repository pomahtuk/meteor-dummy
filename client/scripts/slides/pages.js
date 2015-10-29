Template.botanikaPage.onRendered(function () {
  var node = this.firstNode;
  var action = this.data.action;
  switch (action) {
    case 'lab':
      Meteor.botanikaSwipngHelper(node, 'contacts', 'evolution');
      break;
    case 'infrastructure':
      Meteor.botanikaSwipngHelper(node, 'evolution', 'houses');
      break;
  }
});
