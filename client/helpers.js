Template.registerHelper('getDoc', function(_id, collectionRef) {
  var collection = window[collectionRef];

  if (collection) {
    return collection.findOne(_id);
  }
});

Template.registerHelper('getThumb', function(_id, collectionRef, thumbStore) {
  var collection = window[collectionRef],
    picture;

  if (collection) {
    picture = collection.findOne(_id);
    return picture.url({store: thumbStore});
  }
});
