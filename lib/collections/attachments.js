/*global FS, gm*/
/*jslint node: true, indent: 2*/

'use strict';

this.Attachments = new FS.Collection('Attachments', {
  stores: [
    new FS.Store.FileSystem('attachments', {
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          if (fileObj.original.type.substr(0, 5) === 'image') {
            return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
          }
          return readStream.pipe(writeStream);
        }
        return readStream.pipe(writeStream);
      }
    })
  ]
});

this.Attachments.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function (userId) {
    return true;
  }
});
