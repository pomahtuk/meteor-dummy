Template.botanikaPage.onRendered(function () {
  let node = this.firstNode;
  let action = this.data.action;
  switch (action) {
    case 'lab':
      Meteor.botanikaSwipngHelper(node, 'contacts', 'evolution');
      break;
    case 'infrastructure':
      Meteor.botanikaSwipngHelper(node, 'evolution', 'houses');
      break;
  }
});
