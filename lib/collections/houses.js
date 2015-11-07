/*global FS, gm, Mongo, SimpleSchema*/
/*jslint node: true, indent: 2*/

'use strict';

this.Houses = new Mongo.Collection('houses');

let formatState = function (state) {
  if (!state.id) { return state.text; }
  var $state = $(
    `<div>
      <div class="admin-img-holder"><img src="/img/flowers/${state.id}.png" class="admin-img-flower" /></div>
      ${state.text}
    </div>`
  );
  return $state;
};

let houseTypesData = [
  {
    value: 'azalia',
    label: 'Азалия'
  },
  {
    value: 'astra',
    label: 'Астра'
  },
  {
    value: 'hiacint',
    label: 'Гиацинт'
  },
  {
    value: 'gladiolus',
    label: 'Гладиолус'
  },
  {
    value: 'gasmine',
    label: 'Жасмин'
  },
  {
    value: 'iris',
    label: 'Ирис'
  },
  {
    value: 'camalia',
    label: 'Камалия'
  },
  {
    value: 'kolokolchik',
    label: 'Колокольчик'
  },
  {
    value: 'clover',
    label: 'Клевер'
  },
  {
    value: 'lavanda',
    label: 'Лаванда'
  },
  {
    value: 'landish',
    label: 'Ландыш'
  },
  {
    value: 'lotos',
    label: 'Лотос'
  },
  {
    value: 'lilia',
    label: 'Лилия'
  },
  {
    value: 'magnolia',
    label: 'Магнолия'
  },
  {
    value: 'margaritka',
    label: 'Маргаритка'
  },
  {
    value: 'narcis',
    label: 'Нарцис'
  },
  {
    value: 'orchid',
    label: 'Орхидея'
  },
  {
    value: 'pion',
    label: 'Пион'
  },
  {
    value: 'podsneznik',
    label: 'Подснежник'
  },
  {
    value: 'sunflover',
    label: 'Подсолнух'
  },
  {
    value: 'rose',
    label: 'Роза'
  },
  {
    value: 'camomile',
    label: 'Ромашка'
  },
  {
    value: 'tulip',
    label: 'Тюльпан'
  },
  {
    value: 'chrizantema',
    label: 'Хризантема'
  },
  {
    value: 'edelveise',
    label: 'Эдельвейс'
  }
];


var houseSchema = new SimpleSchema({
  title: {
    type: String,
    max: 255,
    label: 'Название'
  },
  houseType: {
    type: String,
    label: 'Тип',
    max: 225,
    autoform: {
      type: 'select2',
      afFieldInput: {
        options: houseTypesData,
        select2Options: {
          templateResult: formatState,
          templateSelection: formatState,
        }
      }
    }
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
  coordinates: {
    type: [Number],
    label: 'Расположение',
    decimal: true,
    autoform: {
      type: 'mapInput'
    }
  },

  'mainImage': {
    type: String,
    optional: true,
    label: 'Основное изображение',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },

  'planImage': {
    type: String,
    optional: true,
    label: 'Изображение плана',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },

  label: {
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

  'slides': {
    type: [Object],
    label: 'Слайды',
    optional: true,
  },
  'slides.$': {
    type: Object,
    label: 'Слайд',
    optional: true,
  },
  'slides.$.image': {
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
  'slides.$.description' :{
    type: String,
    label: 'Подпись',
    optional: true,
    autoform: {
      rows: 5,
      type: 'summernote',
      class: 'editor',
      settings: {
        height: 200
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
