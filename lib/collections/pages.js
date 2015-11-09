/*global FS, gm, Mongo, SimpleSchema*/
/*jslint node: true, indent: 2*/

'use strict';

this.Pages = new Mongo.Collection('pages');

var pageSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Название',
    max: 255
  },
  slug: {
    type: String,
    label: 'URL',
    max: 60
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
  attachment: {
    type: String,
    optional: true,
    label: 'Фон',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments',
        class: 'cover-type-photo'
      }
    }
  },
  videoUrl: {
    type: String,
    label: 'URL видео',
    optional: true,
    max: 250,
    autoform: {
      afFieldInput: {
        class: 'cover-type-video'
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

this.Pages.attachSchema(pageSchema);
