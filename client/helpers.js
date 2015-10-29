Meteor.botanikaSwipngHelper = function (node, downRoute, upRoute) {
  // create a simple instance
  // by default, it only adds horizontal recognizers

  var distance = 50;

  var hammertime = new Hammer.Manager(node, {
    recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_ALL,
          threshold: 10,
          velocity:	0.65
        }],
    ]
  });

  if (downRoute) {
    hammertime.on('swipeup', function() {
      Router.go(downRoute);
    });

    $(node).on('mousewheel', function(event) {
      // distance = 80px wheeldown
      if (event.deltaY < -distance) {
        Router.go(downRoute);
      }
    });
  }

  if (upRoute) {
    hammertime.on('swipedown', function() {
      Router.go(upRoute);
    });

    $(node).on('mousewheel', function(event) {
      // distance = 100px wheeldown
      if (event.deltaY > distance) {
        Router.go(upRoute);
      }
    });
  }

}

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
