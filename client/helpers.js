Meteor.botanikaSwipngHelper = function (node, downRoute, upRoute) {
  // create a simple instance
  // by default, it only adds horizontal recognizers

  const distance = 50;

  let hammertime = new Hammer.Manager(node, {
    recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_ALL,
          threshold: 10,
          velocity:	0.65
        }],
    ]
  });

  if (downRoute) {
    hammertime.on('swipeup', (evt) => {
      evt.preventDefault();
      Router.go(downRoute);
    });

    $(node).on('mousewheel', (event) => {
      // distance = 80px wheeldown
      if (event.deltaY < -distance) {
        Router.go(downRoute);
      }
    });
  }

  if (upRoute) {
    hammertime.on('swipedown', (evt) => {
      evt.preventDefault();
      Router.go(upRoute);
    });

    $(node).on('mousewheel', (event) => {
      // distance = 100px wheeldown
      if (event.deltaY > distance) {
        Router.go(upRoute);
      }
    });
  }

}

Template.registerHelper('getDoc', (_id, collectionRef) => {
  var collection = window[collectionRef];

  if (collection) {
    return collection.findOne(_id);
  }
});

Template.registerHelper('notIndexAction', (action) => action !== 'index');

Template.registerHelper('getThumb', (_id, collectionRef, thumbStore) => {
  let collection = window[collectionRef],
    picture;

  if (collection) {
    picture = collection.findOne(_id);
    return picture.url({store: thumbStore});
  }
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
