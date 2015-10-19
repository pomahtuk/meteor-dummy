Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('profilePictures', function() {
  return ProfilePictures.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});
