/*global FS, gm, Mongo, SimpleSchema*/
/*jslint node: true, indent: 2*/

'use strict';

this.Houses = new Mongo.Collection('houses');

var houseSchema = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  published: {
    type: Boolean,
    optional: true,
    label: 'Отображать на карте?',
    autoform: {
      afFieldInput: {
        type: 'boolean-checkbox'
      }
    }
  },
  text: {
    type: String,
    autoform: {
      rows: 5,
      label: 'Описание',
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
    label: 'Изображение',
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

this.Houses.attachSchema(houseSchema);
