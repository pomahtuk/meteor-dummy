Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('news', function() {
  return News.find();
});
