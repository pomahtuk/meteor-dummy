Meteor.publish('pages', () => Pages.find());

Meteor.publish('houses', () => Houses.find());

Meteor.publish('news', () => News.find());

Meteor.publish('newsPictures', () => NewsPictures.find());

Meteor.publish('attachments', () => Attachments.find());
