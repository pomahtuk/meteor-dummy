Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('houses', function() {
  return Houses.find();
});

Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('newsPictures', function() {
  return NewsPictures.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});
