Router.configure({
  layoutTemplate: 'botanikaBody',
  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'appNotFound',
  loadingTemplate: 'appLoading',
  waitOn () {
    return [
      Meteor.subscribe('pages'),
      Meteor.subscribe('houses'),
      Meteor.subscribe('news'),
      Meteor.subscribe('attachments'),
      Meteor.subscribe('newsPictures'),
    ];
  }
});

let dataReadyHold = null;
const baseAppUrl = '/prototype';

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/register',
    redirect: baseAppUrl,
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    redirect: '/admin',
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('main', {
    path: baseAppUrl,
    data () {
      return {
        action: 'index',
        pageData: Pages.findOne({slug: 'index'})
      };
    },
    action () {
      this.render('allCombined');
    }
  });

  this.route('news', {
    path: baseAppUrl + '/news/:id',
    data () {
      return {
        action: 'news-detail',
        pageData: News.findOne({
          _id: this.params.id
        })
      };
    },
    action () {
      this.render('botanikaPage');
    }
  });

  this.route('pages', {
    path: baseAppUrl + '/pages/:page',
    data () {
      return {
        action: 'pages-' + this.params.page,
        pageData: Pages.findOne({
          slug: this.params.page
        })
      };
    },
    action () {
      this.render('botanikaPage');
    }
  });

  this.route('home', {
    path: '/',
    layoutTemplate: null,
    action () {
      this.render('appBody');
    }
  });
});
