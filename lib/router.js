Router.configure({
  layoutTemplate: 'botanikaBody',
  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'appNotFound',
  loadingTemplate: 'appLoading',
  waitOn: function() {
    return [
      Meteor.subscribe('pages'),
      Meteor.subscribe('attachments'),
    ];
  }
});

dataReadyHold = null;
baseAppUrl = '/prototype';

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Router.route('/register');
Router.route('/login');

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  // this.route('listsShow', {
  //   path: '/lists/:_id',
  //   onBeforeAction: function () {
  //     this.todosHandle = Meteor.subscribe('todos', this.params._id);
  //
  //     if (this.ready()) {
  //       dataReadyHold.release();
  //     }
  //   },
  //   data: function () {
  //     return Lists.findOne(this.params._id);
  //   },
  //   action: function () {
  //     this.render();
  //   }
  // });

  this.route('main', {
    path: baseAppUrl,
    data: function() {
      return {
        action: 'index',
        pageData: Pages.findOne({slug: 'index'})
      };
    },
    action: function() {
      this.render('indexSlide');
    }
  });

  this.route('contacts', {
    path: baseAppUrl + '/contacts',
    data: function() {
      return {
        action: 'contacts',
        pageData: Pages.findOne({slug: 'contacts'})
      };
    },
    action: function() {
      this.render('contactsSlide');
    }
  });

  this.route('houses', {
    path: baseAppUrl + '/houses',
    waitOn: function() {
      return [
        Meteor.subscribe('houses'),
      ];
    },
    data: function() {
      return {
        action: 'houses',
        pageData: Pages.findOne({slug: 'houses'}),
        houses: Houses.find({published: true})
      };
    },
    action: function() {
      this.render('evolutionSlide');
    }
  });

  this.route('evolution', {
    path: baseAppUrl + '/evolution',
    waitOn: function() {
      return [
        Meteor.subscribe('news'),
        Meteor.subscribe('newsPictures'),
      ];
    },
    data: function() {
      return {
        action: 'evolution',
        pageData: Pages.findOne({slug: 'evolution'}),
        news: News.find()
      };
    },
    action: function() {
      this.render('evolutionSlide');
    }
  });

  this.route('pages', {
    path: baseAppUrl + '/pages/:page',
    data: function() {
      return {
        action: 'pages-' + this.params.page,
        pageData: Pages.findOne({
          slug: this.params.page
        })
      };
    },
    action: function() {
      this.render('botanikaPage');
    }
  });

  this.route('home', {
    path: '/',
    layoutTemplate: null,
    action: function() {
      this.render('appBody');
    }
  });
});
