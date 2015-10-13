Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'botanikaBody',

  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('publicLists'),
  //     Meteor.subscribe('privateLists')
  //   ];
  // }
});

dataReadyHold = null;

baseAppUrl = '/prototype';

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('/items/:_id', {name: 'items.show'});

Router.map(function() {
  this.route('join');
  this.route('signin');

  // this.route('listsShow', {
  //   path: '/lists/:_id',
  //   // subscribe to todos before the page is rendered but don't wait on the
  //   // subscription, we'll just render the items as they arrive
  //   onBeforeAction: function () {
  //     this.todosHandle = Meteor.subscribe('todos', this.params._id);
  //
  //     if (this.ready()) {
  //       // Handle for launch screen defined in app-body.js
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
        action: 'index'
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
        action: 'contacts'
      };
    },
    action: function() {
      this.render('contactsSlide');
    }
  });

  // this.route('pages', {
  //   path: baseAppUrl + '/:page',
  //   data: function() {
  //     return {
  //       page: this.params.page
  //     };
  //   },
  //   action: function() {
  //     this.render('botanikaBody');
  //   }
  // });

  this.route('home', {
    path: '/',
    layoutTemplate: null,
    action: function() {
      this.render('appBody');
    }
  });
});
