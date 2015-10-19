Schemas = {};

News = new Mongo.Collection('news');

Pages = new Mongo.Collection('pages');

Attachments = new FS.Collection("Attachments", {
  stores: [
    new FS.Store.FileSystem("attachments", {
      transformWrite: function(fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          if (fileObj.original.type.substr(0, 5) === 'image') {
            return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
          } else {
            return readStream.pipe(writeStream);
          }
        } else {
          return readStream.pipe(writeStream);
        }
      }
    })
  ]
});

ProfilePictures = new FS.Collection("profilePictures", {
  stores: [
    new FS.Store.FileSystem("pictures", {
      transformWrite: function(fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
        } else {
          return readStream.pipe(writeStream);
        }
      }
    }), new FS.Store.FileSystem("thumbs", {
      transformWrite: function(fileObj, readStream, writeStream) {
        var size;
        if (gm.isAvailable) {
          size = {
            width: 100,
            height: 100
          };
          return gm(readStream, fileObj.name()).autoOrient().resize(size.width + "^>", size.height + "^>").gravity("Center").extent(size.width, size.height).stream().pipe(writeStream);
        } else {
          return readStream.pipe(writeStream);
        }
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
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
  attachment: {
    type: String,
    optional: true,
    label: 'Фон',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
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
  picture: {
    type: String,
    optional: true,
    label: 'Изображение',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
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

ProfilePictures.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function(userId) {
    return true;
  }
});

Attachments.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function(userId) {
    return true;
  }
});
