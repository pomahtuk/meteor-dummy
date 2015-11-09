Template.registerHelper('getDoc', (_id, collectionRef) => {
  var collection = window[collectionRef];

  if (collection) {
    return collection.findOne(_id);
  }
});

Template.registerHelper('prettifyDate', (timestamp) => moment(timestamp).format('DD.MM.YYYY'));

Template.registerHelper('getPageData', (slug) => Pages.findOne({slug: slug}));

Template.registerHelper('notIndexAction', (action) => action !== 'index');

Template.registerHelper('cunstructSlideAttrs', (data, type) => {
  var field;
  switch (type) {
    case 'index':
      field = 'mainImage';
      break;
    case 'plan':
      field = 'planImage';
      break;
    default:
      field = 'image';
  }

  if (Meteor.Device.isDesktop() && data.videoUrl) {
    // we are able to play vide only on desktop
    return {
      'data-url': data.videoUrl
    }
  } else {
    let image =  Attachments.findOne({_id: data[field] }),
      imageUrl = image ? image.url() : '';
    return {
      'style': `background-image: radial-gradient(transparent 0%, transparent 15%, rgba(0,0,0, 0.85)), url("${imageUrl}"); 
                background-repeat no-repeat, no-repeat; 
                background-position: center center, center center;
                background-size: auto, cover;`
    }
  }
});

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

Template.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);
 
  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

Template.registerHelper('isEqual', (first, second) => first == second);

// this will render background specified by user in damin panel
// fallback defined in css file
Template.registerHelper('getPageAttrs', (pageData) => {
  if (!pageData) {
    return '';
  }

  if (Meteor.Device.isDesktop() && pageData.videoUrl) {
    return {
      'data-url': pageData.videoUrl
    }
  } else {
    let image =  Attachments.findOne({_id: pageData.attachment }),
      imageUrl = image ? image.url() : '';
    return {
      'style': `background-image: radial-gradient(transparent 0%, transparent 15%, rgba(0,0,0, 0.85)), url("${imageUrl}"); 
                background-repeat no-repeat, no-repeat; 
                background-position: center center, center center;
                background-size: auto, cover;`
    }
  }
});
