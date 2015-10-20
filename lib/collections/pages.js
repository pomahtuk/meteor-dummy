/*global FS, gm, Mongo, SimpleSchema*/
/*jslint node: true, indent: 2*/

'use strict';

this.Pages = new Mongo.Collection('pages');

var pageSchema = new SimpleSchema({
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
        collection: 'Attachments'
      }
    }
  },
  videoBackground: {
    type: Boolean,
    optional: true,
    label: 'Видео подложка?',
    autoform: {
      afFieldInput: {
        type: 'boolean-checkbox'
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
