Template.registerHelper('getDoc', function(_id, collectionRef) {
  var collection = window[collectionRef];

  if (collection) {
    return collection.findOne(_id);
  }
});

Template.registerHelper('notIndexAction', function(action) {
  return (action !== 'index');
});

Template.registerHelper('getThumb', function(_id, collectionRef, thumbStore) {
  var collection = window[collectionRef],
    picture;

  if (collection) {
    picture = collection.findOne(_id);
    return picture.url({store: thumbStore});
  }
});

// this will render background specified by user in damin panel
// fallback defined in css file
Template.registerHelper('getPageAttrs', function(pageData) {
  if (!pageData) {
    return '';
  }
  if (pageData.videoBackground) {
    return {
      'data-url': pageData.videoUrl
    }
  } else {
    var image =  Attachments.findOne({_id: pageData.attachment }),
      imageUrl = image ? image.url() : '';
    return {
      'style': 'background: radial-gradient(transparent 0%, transparent 15%, rgba(0,0,0, 0.85)), url(\'' + imageUrl + '\') center center no-repeat;'
    }
  }
});
