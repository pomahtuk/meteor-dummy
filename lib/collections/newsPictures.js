/*global FS, gm*/
/*jslint node: true, indent: 2*/

'use strict';

this.NewsPictures = new FS.Collection("newsPictures", {
  stores: [
    new FS.Store.FileSystem("pictures", {
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          return gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
        }
        return readStream.pipe(writeStream);
      }
    }), new FS.Store.FileSystem("thumbs", {
      transformWrite: function (fileObj, readStream, writeStream) {
        var size;
        if (gm.isAvailable) {
          size = {
            width: 260,
            height: 195
          };
          return gm(readStream, fileObj.name()).autoOrient().resize(size.width + "^>", size.height + "^>").gravity("Center").extent(size.width, size.height).stream().pipe(writeStream);
        }
        return readStream.pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

this.NewsPictures.allow({
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
