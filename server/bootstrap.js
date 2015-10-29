// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  // if (Accounts.find().count() === 0) {
  //   var users = [
  //         {name:'Admin User',email:'pman89@ya.ru',roles:['admin']}
  //       ];
  //
  //   _.each(users, function (user) {
  //     var id;
  //
  //     id = Accounts.createUser({
  //       email: user.email,
  //       password: '177591',
  //       profile: { name: user.name }
  //     });
  //
  //     if (user.roles.length > 0) {
  //       // Need _id of existing user record so this call must come
  //       // after `Accounts.createUser` or `Accounts.onCreate`
  //       Roles.addUsersToRoles(id, user.roles, 'default-group');
  //     }
  //
  //   });
  // }

  if (Pages.find().count() === 0) {
    var data = [
      {
        title: 'Экосистема',
        slug: 'infrastructure',
        body: 'инфраструктура',
      },
      {
        title: 'Лаборатория',
        slug: 'lab',
        body: 'тут что-то будет',
      }
    ];

    _.each(data, function(page) {
      Pages.insert({
        title: page.title,
        slug: page.slug,
        body: page.body,
      });
    });
  }
});
