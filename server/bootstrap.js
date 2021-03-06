// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  Kadira.connect('Bvx4TbYapGTPkaome', 'd4ca54a9-149b-421a-88f7-090873fb4267');

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
