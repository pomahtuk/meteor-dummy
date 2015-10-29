Router.configure({
  layoutTemplate: 'botanikaBody',
  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'appNotFound',
  loadingTemplate: 'appLoading',
  waitOn () {
    return [
      Meteor.subscribe('pages'),
      Meteor.subscribe('attachments'),
    ];
  }
});

let dataReadyHold = null;
const baseAppUrl = '/prototype';

// Router.route('/register');
// Router.route('/login');

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
      this.render('indexSlide');
    }
  });

  this.route('contacts', {
    path: baseAppUrl + '/contacts',
    data () {
      return {
        action: 'contacts',
        pageData: Pages.findOne({slug: 'contacts'})
      };
    },
    action () {
      this.render('contactsSlide');
    }
  });

  this.route('houses', {
    path: baseAppUrl + '/houses',
    waitOn () {
      return [
        Meteor.subscribe('houses'),
      ];
    },
    data () {
      return {
        action: 'houses',
        pageData: Pages.findOne({slug: 'houses'}),
        houses: Houses.find({published: true})
      };
    },
    action () {
      this.render('housesSlide');
    }
  });

  this.route('evolution', {
    path: baseAppUrl + '/evolution',
    waitOn () {
      return [
        Meteor.subscribe('news'),
        Meteor.subscribe('newsPictures'),
      ];
    },
    data () {
      return {
        action: 'evolution',
        pageData: Pages.findOne({slug: 'evolution'}),
        news: News.find()
      };
    },
    action () {
      this.render('evolutionSlide');
    }
  });

  this.route('infrastructure', {
    path: baseAppUrl + '/infrastructure',
    data () {
      return {
        action: 'infrastructure',
        pageData: Pages.findOne({slug: 'infrastructure'}),
      };
    },
    action () {
      this.render('botanikaPage');
    }
  });

  this.route('lab', {
    path: baseAppUrl + '/lab',
    data () {
      return {
        action: 'lab',
        pageData: Pages.findOne({slug: 'lab'}),
      };
    },
    action() {
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
