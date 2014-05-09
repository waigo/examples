"use strict";


var fs = require('fs'),
  parse = require('co-busboy');


exports.index = function*(next) {
  yield* this.render('index');
};



exports.upload = function*(next) {
  /*
  Code taken from https://github.com/koajs/examples/blob/master/upload/index.js
  */
  
  let parts = parse(this);
  let part;

  let fileNames = {};

  while (part = yield parts) {
    let stream = fs.createWriteStream('/tmp/' + Math.random());

    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);

    fileNames[part.filename] = stream.path;
  }

  yield* this.render('index', {
    fileNames: fileNames
  });
};  
