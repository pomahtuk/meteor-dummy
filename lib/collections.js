Schemas = {};

News = new Mongo.Collection('news');

Pages = new Mongo.Collection('pages');

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

Schemas.Pages = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  slug: {
    type: String,
    max: 60
  },
  body: {
    type: String,
    autoform: {
      rows: 5
    }
  },
  createdAt: {
    type: Date,
    label: 'Date',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Schemas.News = new SimpleSchema({
  title: {
    type: String,
    max: 60,
    autoform: {
      label: 'Название'
    }
  },
  body: {
    type: String,
    autoform: {
      rows: 5,
      label: 'Содержание'
    }
  },
  pictures: {
    type: [String],
    label: 'Изображения'
  },
  "pictures.$": {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
      }
    }
  },
  createdAt: {
    type: Date,
    label: 'Date',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Pages.attachSchema(Schemas.Pages);
News.attachSchema(Schemas.News);

Images.allow({
  insert: function(userId, doc) {
    console.log(userId);
    return true
  },
  download: function(userId, doc) {
    console.log(userId);
    return true
  }
})
