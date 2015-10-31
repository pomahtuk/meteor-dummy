Template.registerHelper('getDoc', (_id, collectionRef) => {
  var collection = window[collectionRef];

  if (collection) {
    return collection.findOne(_id);
  }
});

Template.registerHelper('prettifyDate', (timestamp) => moment(timestamp).format('DD.MM.YYYY'));

Template.registerHelper('getPageData', (slug) => Pages.findOne({slug: slug}));

Template.registerHelper('getAllNews', () => News.find({}));

Template.registerHelper('notIndexAction', (action) => action !== 'index');

Template.registerHelper('getThumb', (_id, collectionRef, thumbStore) => {
  let collection = window[collectionRef],
    picture;

  if (collection) {
    picture = collection.findOne(_id);
    if (picture) {
      return picture.url({store: thumbStore});
    }
  }

  return null;
});



// this will render background specified by user in damin panel
// fallback defined in css file
Template.registerHelper('getPageAttrs', (pageData) => {
  if (!pageData) {
    return '';
  }
  if (pageData.videoBackground) {
    return {
      'data-url': pageData.videoUrl
    }
  } else {
    let image =  Attachments.findOne({_id: pageData.attachment }),
      imageUrl = image ? image.url() : '';
    return {
      'style': `background: radial-gradient(transparent 0%, transparent 15%, rgba(0,0,0, 0.85)), url(\'${imageUrl} + '\') center center no-repeat;`
    }
  }
});
