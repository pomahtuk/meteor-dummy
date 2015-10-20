/*global FS, gm, Mongo, SimpleSchema*/
/*jslint node: true, indent: 2*/

'use strict';

this.News = new Mongo.Collection('news');

var newsSchema = new SimpleSchema({
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
      label: 'Содержание',
      type: 'summernote',
      class: 'editor',
      settings: {
        height: 300
      } // optional
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

this.News.attachSchema(newsSchema);
